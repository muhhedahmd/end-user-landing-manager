/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompositionType } from "@/types/schema";
import { CompositionPreview } from "./CompositionPreviw";

interface RenderSlidesProps {
  locale: "en" | "ar";
  id: string;
  interval?: number;
  autoPlay: boolean;
  composition: CompositionType;
}

const SLIDES_PER_PAGE = 10;
const DELAY_BETWEEN_REQUESTS = 100;
const MAX_RETRIES = 2;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface PagesPerType {
  services?: number;
  projects?: number;
  clients?: number;
  testimonials?: number;
  team?: number;
}

interface FetchResult {
  slides: any[];
  pages: any;
  success: boolean;
  page: number;
  pagesPerType: PagesPerType;
}

// Fetch a single page of slides with proper pagesPerType structure
const fetchSlidesPage = async ({
  locale,
  id,
  page,
  perPage = SLIDES_PER_PAGE,
  pagesPerType = {},
}: {
  locale: "en" | "ar";
  id: string;
  page: number;
  perPage?: number;
  pagesPerType?: PagesPerType;
}): Promise<FetchResult> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  if (!BASE_URL) {
    console.error("[fetchSlidesPage] BACKEND_URL is not defined");
    return { slides: [], pages: {}, success: false, page, pagesPerType };
  }

  try {
    const body: any = { page, perPage };
    
    if (Object.keys(pagesPerType).length > 0) {
      body.pagesPerType = pagesPerType;
    }

    const res = await fetch(
      `${BASE_URL}/api/slide-show/get-paginated-slides/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(`[fetchSlidesPage] Page ${page} failed with status:`, res.status);
      return { slides: [], pages: {}, success: false, page, pagesPerType };
    }

    const response = await res.json();

    if (!response.success) {
      console.error(`[fetchSlidesPage] Page ${page} API returned success: false`);
      return { slides: [], pages: response?.data?.pages || {}, success: false, page, pagesPerType };
    }

    if (!response?.data?.slides) {
      console.error(`[fetchSlidesPage] Page ${page} has no slides`);
      return { slides: [], pages: response?.data?.pages || {}, success: true, page, pagesPerType };
    }

    const transformedSlides = response.data.slides
      .filter((item: any) => item.isVisible)
      .map((item: any) => ({
        ...item.data,
        type: item.type,
        order: item.order,
        id: item.id,
        ...item.translation.find(
          (t: any) => t.lang.toUpperCase() === locale.toUpperCase()
        ),
        customTitle: item.customTitle,
        customDescription: item.customDesc,
      }));

    return {
      slides: transformedSlides,
      pages: response.data.pages || {},
      success: true,
      page,
      pagesPerType,
    };
  } catch (err) {
    console.error(`[fetchSlidesPage] Error fetching page ${page}:`, err);
    return { slides: [], pages: {}, success: false, page, pagesPerType };
  }
};

// Check if any content type has more pages
const hasMorePages = (pages: any): boolean => {
  if (!pages || typeof pages !== 'object') return false;
  return Object.values(pages).some((pageInfo: any) => pageInfo?.hasMore === true);
};

// Build pagesPerType for next request
const buildPagesPerType = (pages: any): PagesPerType => {
  const pagesPerType: PagesPerType = {};
  
  if (pages.services?.hasMore) pagesPerType.services = (pages.services.page || 1) + 1;
  if (pages.projects?.hasMore) pagesPerType.projects = (pages.projects.page || 1) + 1;
  if (pages.clients?.hasMore) pagesPerType.clients = (pages.clients.page || 1) + 1;
  if (pages.testimonials?.hasMore) pagesPerType.testimonials = (pages.testimonials.page || 1) + 1;
  if (pages.team?.hasMore) pagesPerType.team = (pages.team.page || 1) + 1;
  
  return pagesPerType;
};

// Retry failed requests
const retryFailedRequests = async ({
  locale,
  id,
  failedRequests,
}: {
  locale: "en" | "ar";
  id: string;
  failedRequests: FetchResult[];
}): Promise<any[]> => {
  if (failedRequests.length === 0) return [];

  console.log(`[retryFailedRequests] Retrying ${failedRequests.length} failed requests`);
  
  const retriedSlides: any[] = [];

  for (const failed of failedRequests) {
    let retryCount = 0;
    let success = false;

    while (retryCount < MAX_RETRIES && !success) {
      console.log(`[retryFailedRequests] Retry ${retryCount + 1}/${MAX_RETRIES} for page ${failed.page}`);
      
      await delay(DELAY_BETWEEN_REQUESTS * (retryCount + 1)); // Exponential backoff
      
      const result = await fetchSlidesPage({
        locale,
        id,
        page: failed.page,
        perPage: SLIDES_PER_PAGE,
        pagesPerType: failed.pagesPerType,
      });

      if (result.success) {
        console.log(`[retryFailedRequests] Retry successful for page ${failed.page}, got ${result.slides.length} slides`);
        retriedSlides.push(...result.slides);
        success = true;
      } else {
        retryCount++;
      }
    }

    if (!success) {
      console.error(`[retryFailedRequests] Failed to fetch page ${failed.page} after ${MAX_RETRIES} retries`);
    }
  }

  return retriedSlides;
};

// Fetch all slides with proper pagination handling
const fetchAllSlidesWithRetry = async ({
  locale,
  id,
}: {
  locale: "en" | "ar";
  id: string;
}): Promise<any[]> => {
  try {
    const allSlides: any[] = [];
    const failedRequests: FetchResult[] = [];
    let currentPage = 1;
    let pagesPerType: PagesPerType = {};
    let keepFetching = true;

    // First pass: fetch all pages
    while (keepFetching) {
      console.log(`[fetchAllSlidesWithRetry] Fetching page ${currentPage}`, pagesPerType);

      const result = await fetchSlidesPage({
        locale,
        id,
        page: currentPage,
        perPage: SLIDES_PER_PAGE,
        pagesPerType,
      });

      console.log(`[fetchAllSlidesWithRetry] Page ${currentPage} - Success: ${result.success}, Slides: ${result.slides.length}`);

      if (result.success) {
        if (result.slides.length > 0) {
          allSlides.push(...result.slides);
        }
        
        // Check if there are more pages to fetch
        keepFetching = hasMorePages(result.pages);
        
        if (keepFetching) {
          pagesPerType = buildPagesPerType(result.pages);
          currentPage++;
          await delay(DELAY_BETWEEN_REQUESTS);
        }
      } else {
        // Track failed request
        failedRequests.push(result);
        
        // Continue to next page despite failure
        keepFetching = hasMorePages(result.pages);
        if (keepFetching) {
          pagesPerType = buildPagesPerType(result.pages);
          currentPage++;
          await delay(DELAY_BETWEEN_REQUESTS);
        }
      }
    }

    console.log(`[fetchAllSlidesWithRetry] First pass complete. Slides: ${allSlides.length}, Failed: ${failedRequests.length}`);

    // Second pass: retry failed requests
    if (failedRequests.length > 0) {
      const retriedSlides = await retryFailedRequests({
        locale,
        id,
        failedRequests,
      });

      if (retriedSlides.length > 0) {
        allSlides.push(...retriedSlides);
      }
    }

    console.log(`[fetchAllSlidesWithRetry] Total slides fetched: ${allSlides.length}`);

    // Sort by order
    return allSlides.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("[fetchAllSlidesWithRetry] Error:", err);
    return [];
  }
};

const RenderSlidesManual = async ({
  locale,
  id,
  interval = 5000,
  autoPlay,
  composition,
}: RenderSlidesProps) => {
  const slides = await fetchAllSlidesWithRetry({ locale, id });

  console.log("RenderSlidesManual slides:", slides.length);

  if (slides.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No slides available.
      </div>
    );
  }


  return (
    <CompositionPreview
      interval={interval}
      autoPlay={autoPlay}
      composition={composition}
      slides={slides}
    />
  );
};

export default RenderSlidesManual;