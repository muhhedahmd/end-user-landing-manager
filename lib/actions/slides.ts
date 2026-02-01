
// test onlu server side
"use server";


/* eslint-disable @typescript-eslint/no-explicit-any */

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

interface SlideData {
  type: string;
  order: number;
  id: string;
  customTitle?: string;
  customDescription?: string;
  [key: string]: any;
}

const SLIDES_PER_REQUEST = 5; // Fetch 5 slides per request
const MAX_SLIDES = 20; // Maximum 20 slides total
const DELAY_BETWEEN_REQUESTS = 100;
const MAX_RETRIES = 2;
const MAX_CONCURRENT_REQUESTS = 4; // Process 4 requests concurrently

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch a single page of slides
const fetchSlidesPage = async ({
  locale,
  id,
  page,
  perPage = SLIDES_PER_REQUEST,
  pagesPerType = {},
}: {
  locale: "en" | "ar";
  id: string;
  page: number;
  perPage?: number;
  pagesPerType?: PagesPerType;
}): Promise<FetchResult> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  console.log()
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
        cache :"no-store",
        // next: { revalidate: 900 },
      }
    );

    if (!res.ok) {
      console.error(`[fetchSlidesPage] Page ${page} failed with status:`, res.status);
      return { slides: [], pages: {}, success: false, page, pagesPerType };
    }

    const response = await res.json();

    if (!response.success) {
      console.error(`[fetchSlidesPage] Page ${page} API returned success: false`);
      return { 
        slides: [], 
        pages: response?.data?.pages || {}, 
        success: false, 
        page, 
        pagesPerType 
      };
    }

    if (!response?.data?.slides) {
      console.error(`[fetchSlidesPage] Page ${page} has no slides`);
      return { 
        slides: [], 
        pages: response?.data?.pages || {}, 
        success: true, 
        page, 
        pagesPerType 
      };
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

// Build pagesPerType for next request // alredy have been selected by type in backend
// const buildPagesPerType = (pages: any): PagesPerType => {
//   const pagesPerType: PagesPerType = {};
  
//   if (pages.services?.hasMore) pagesPerType.services = (pages.services.page || 1) + 1;
//   if (pages.projects?.hasMore) pagesPerType.projects = (pages.projects.page || 1) + 1;
//   if (pages.clients?.hasMore) pagesPerType.clients = (pages.clients.page || 1) + 1;
//   if (pages.testimonials?.hasMore) pagesPerType.testimonials = (pages.testimonials.page || 1) + 1;
//   if (pages.team?.hasMore) pagesPerType.team = (pages.team.page || 1) + 1;
  
//   return pagesPerType;
// };

// Retry failed requests with exponential backoff
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
      
      await delay(DELAY_BETWEEN_REQUESTS * (retryCount + 1));

      const result = await fetchSlidesPage({
        locale,
        id,
        page: failed.page,
        perPage: SLIDES_PER_REQUEST,
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

// Process requests in concurrent batches
const processConcurrentBatches = async (
  tasks: (() => Promise<FetchResult>)[]
): Promise<FetchResult[]> => {
  const results: FetchResult[] = [];
  
  for (let i = 0; i < tasks.length; i += MAX_CONCURRENT_REQUESTS) {
    const batch = tasks.slice(i, i + MAX_CONCURRENT_REQUESTS);
    console.log("task" , i )
    const batchResults = await Promise.all(batch.map(task => task()));
    results.push(...batchResults);
    
    // Add delay between batches
    if (i + MAX_CONCURRENT_REQUESTS < tasks.length) {
      await delay(DELAY_BETWEEN_REQUESTS);
    }
  }
  
  return results;
};

// Main server action to fetch all slides
export async function fetchAllSlides({
  locale,
  id,
}: {
  locale: "en" | "ar";
  id: string;
}): Promise<{ slides: SlideData[]; error?: string }> {
  try {
    const allSlides: any[] = [];
    const failedRequests: FetchResult[] = [];
    // let pagesPerType: PagesPerType = {};
    let keepFetching = true;
    let currentPage = 1;

    // Calculate max pages based on MAX_SLIDES and SLIDES_PER_REQUEST
    const maxPages = Math.ceil(MAX_SLIDES / SLIDES_PER_REQUEST);

    // Prepare all fetch tasks
    const fetchTasks: (() => Promise<FetchResult>)[] = [];

    // First, fetch the first page to understand the structure
    const firstResult = await fetchSlidesPage({
      locale,
      id,
      page: 1,
      perPage: SLIDES_PER_REQUEST,
    //   pagesPerType,
    });

    if (firstResult.success && firstResult.slides.length > 0) {
      allSlides.push(...firstResult.slides);
    } else if (!firstResult.success) {
      failedRequests.push(firstResult);
    }

    // Check if we need more pages
    keepFetching = hasMorePages(firstResult.pages) && allSlides.length < MAX_SLIDES;
    // pagesPerType = buildPagesPerType(firstResult.pages);
    currentPage = 2;

    // Prepare remaining fetch tasks
    while (keepFetching && currentPage <= maxPages) {
      const page = currentPage;
    //   const currentPagesPerType = { ...pagesPerType };
      
      fetchTasks.push(() => 
        fetchSlidesPage({
          locale,
          id,
          page,
          perPage: SLIDES_PER_REQUEST,
        //   pagesPerType: currentPagesPerType,
        })
      );

      currentPage++;
      
      // We'll update this after fetching
      if (currentPage > maxPages) {
        keepFetching = false;
      }
    }

    // Process all remaining requests concurrently in batches
    if (fetchTasks.length > 0) {
      console.log(`[fetchAllSlides] Processing ${fetchTasks.length} requests in concurrent batches`);
      
      const results = await processConcurrentBatches(fetchTasks);

      for (const result of results) {
        if (result.success && result.slides.length > 0) {
          // Check if we've reached the max slides limit
          const remainingSlots = MAX_SLIDES - allSlides.length;
          if (remainingSlots > 0) {
            const slidesToAdd = result.slides.slice(0, remainingSlots);
            allSlides.push(...slidesToAdd);
          }
        } else if (!result.success) {
          failedRequests.push(result);
        }

        // Stop if we've reached max slides
        if (allSlides.length >= MAX_SLIDES) {
          break;
        }
      }
    }

    console.log(`[fetchAllSlides] First pass complete. Slides: ${allSlides.length}, Failed: ${failedRequests.length}`);

    // Retry failed requests if we haven't reached max slides
    if (failedRequests.length > 0 && allSlides.length < MAX_SLIDES) {
      const retriedSlides = await retryFailedRequests({
        locale,
        id,
        failedRequests,
      });

      if (retriedSlides.length > 0) {
        const remainingSlots = MAX_SLIDES - allSlides.length;
        const slidesToAdd = retriedSlides.slice(0, remainingSlots);
        allSlides.push(...slidesToAdd);
      }
    }

    // Ensure we don't exceed max slides and sort by order
    const finalSlides = allSlides
      .slice(0, MAX_SLIDES)
      .sort((a, b) => a.order - b.order);

    console.log(`[fetchAllSlides] Total slides fetched: ${finalSlides.length}`);

    return { slides: finalSlides };
  } catch (err) {
    console.error("[fetchAllSlides] Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch slides";
    return { slides: [], error: errorMessage };
  }
}

// Server action to fetch initial slides (for immediate display)
export async function fetchInitialSlides({
  locale,
  id,
}: {
  locale: "en" | "ar";
  id: string;
}): Promise<{ slides: SlideData[]; hasMore: boolean; error?: string }> {
  try {
    const result = await fetchSlidesPage({
      locale,
      id,
      page: 1,
      perPage: SLIDES_PER_REQUEST,
      pagesPerType: {},
    });

    if (!result.success) {
      return { slides: [], hasMore: false, error: "Failed to fetch initial slides" };
    }

    const hasMore = hasMorePages(result.pages);

    return { 
      slides: result.slides, 
      hasMore,
    };
  } catch (err) {
    console.error("[fetchInitialSlides] Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch initial slides";
    return { slides: [], hasMore: false, error: errorMessage };
  }
}