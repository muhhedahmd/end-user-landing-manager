class AnalyticsClient {
  private static instance: AnalyticsClient;
  private apiUrl: string;
  private startTime: number = 0;
  private maxScroll: number = 0;
  private sentEngagement: boolean = false;
  private currentPath: string = '';
  private scrollCleanup: (() => void) | null = null;

  private constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }

  static getInstance(): AnalyticsClient {
    if (!AnalyticsClient.instance) {
      AnalyticsClient.instance = new AnalyticsClient();
    }
    return AnalyticsClient.instance;
  }

  // Reset state for new page
  private reset(path: string) {
    this.currentPath = path;
    this.startTime = Date.now();
    this.maxScroll = 0;
    this.sentEngagement = false;
    
    // Cleanup previous scroll tracking
    if (this.scrollCleanup) {
      this.scrollCleanup();
      this.scrollCleanup = null;
    }
  }

  // Track initial page view
  async trackPageView(path: string, pageTitle?: string) {
    if (typeof window === 'undefined') return;

    // Reset state for new page
    this.reset(path);

    try {
      const response = await fetch(`${this.apiUrl}/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          path,
          pageTitle: pageTitle || document.title
        })
      });

      if (!response.ok) {
        console.error('Analytics tracking failed:', response.status);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Track engagement (time + scroll)
  async trackEngagement(path: string, pageTitle?: string) {
    if (typeof window === 'undefined' || this.sentEngagement) return;

    const timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
    
    // Only track if user spent at least 3 seconds
    if (timeOnPage < 3) return;

    this.sentEngagement = true;

    const data = {
      path,
      pageTitle: pageTitle || document.title,
      timeOnPage,
      scrollDepth: this.maxScroll
    };

    try {
      // Use Beacon API for reliability (especially on unload)
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], { 
          type: 'application/json' 
        });
        const sent = navigator.sendBeacon(
          `${this.apiUrl}/api/analytics/track`, 
          blob
        );
        
        if (!sent) {
          // Fallback to fetch if beacon fails
          await this.sendWithFetch(data);
        }
      } else {
        // Fallback for browsers without Beacon API
        await this.sendWithFetch(data);
      }
    } catch (error) {
      console.error('Engagement tracking error:', error);
    }
  }

  // Fallback fetch method
  private async sendWithFetch(data: any) {
    try {
      await fetch(`${this.apiUrl}/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
        keepalive: true // Important for requests during page unload
      });
    } catch (error) {
      console.error('Fetch fallback failed:', error);
    }
  }

  // Track conversion
  async trackConversion() {
    if (typeof window === 'undefined') return;

    try {
      await fetch(`${this.apiUrl}/api/analytics/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
    } catch (error) {
      console.error('Conversion tracking error:', error);
    }
  }

  // Start scroll tracking and return cleanup function
  startScrollTracking() {
    if (typeof window === 'undefined') return () => {};

    const handleScroll = () => {
        

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Avoid division by zero
      if (documentHeight - windowHeight <= 0) {
        this.maxScroll = 100;
        return;
      }
      
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );
      
      this.maxScroll = Math.max(
        this.maxScroll, 
        Math.min(scrollPercent, 100)
      );
    };

    // Initial scroll position
    handleScroll();

    // Add listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Return cleanup function
    const cleanup = () => {
      window.removeEventListener('scroll', handleScroll);
    };

    this.scrollCleanup = cleanup;
    return cleanup;
  }

  // Get current tracking state (for debugging)
  getState() {
    return {
      currentPath: this.currentPath,
      timeOnPage: Math.floor((Date.now() - this.startTime) / 1000),
      maxScroll: this.maxScroll,
      sentEngagement: this.sentEngagement
    };
  }
}

export const analytics = AnalyticsClient.getInstance();