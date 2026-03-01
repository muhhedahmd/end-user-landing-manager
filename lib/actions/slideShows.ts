// app/actions/slideshow-actions.ts
"use server";

import { SlideShowWithTranslations } from "@/custom-components/SlideShow/_comp/SlideShowCard";
import { SlideShowResult } from "@/custom-components/SlideShow/SlideShow";

import { PaginatedResponse } from "@/types/services";

export async function fetchSlideShows({
  locale,
  skip,
  take,
}: {
  locale: "en" | "ar";
  skip: number;
  take: number;
}): Promise<SlideShowResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slide-show?skip=${skip}&take=${take}&lang=${locale?.toUpperCase()}&visible=true`,
      {
        cache: "force-cache",

        next: {
          revalidate: 900,
        },
      },
    );
    if (!res.ok) return { status: "error" };
    const json = await res.json();
    const payload = json as PaginatedResponse<SlideShowWithTranslations>;
    if (!payload) {
      return { status: "error" };
    }
    return {
      status: "success",
      data: payload,
    };
  } catch {
    return { status: "error" };
  }
}

/**
 * Server-side slide fetcher with Next.js caching.
 * Fetches and transforms slides for a single slideshow.
 * Eliminates the client-side waterfall by prefetching on the server.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchSlidesForSlideshow(
  id: string,
  locale: string,
): Promise<any[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!BASE_URL) return [];

  try {
    const res = await fetch(
      `${BASE_URL}/api/slide-show/get-paginated-slides/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 1, perPage: 20 }),
        next: { revalidate: 900 }, // Cache for 15 minutes
      },
    );

    if (!res.ok) return [];

    const response = await res.json();
    if (!response?.success || !response?.data?.slides) return [];

    // Transform slides server-side (instead of doing it on the client)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformed = response.data.slides
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // .filter((item: any) => item.isVisible)
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // .sort((a: any, b: any) => a.order - b.order)
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        ...item.data,
        type: item.type,
        order: item.order,
        id: item.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...item.translation?.find(
          (t: any) => t.lang?.toUpperCase() === locale.toUpperCase(),
        ),
        customTitle: item.customTitle,
        customDescription: item.customDesc,
      }));

    return transformed;
  } catch (err) {
    console.error(`[fetchSlidesForSlideshow] Error for ${id}:`, err);
    return [];
  }
}

export async function loadMoreSlideShows(
  locale: "en" | "ar",
  page: number,
  itemsPerPage: number = 3,
) {
  try {
    const res = await fetchSlideShows({
      locale,
      skip: page,
      take: itemsPerPage,
    });

    if (res.status === "success") {
      // Prefetch slides for each new slideshow in parallel
      const slideshows = res.data.data;
      const slidesResults = await Promise.all(
        slideshows.map((show) => fetchSlidesForSlideshow(show.id, locale)),
      );

      // Attach prefetched slides to each slideshow
      const enrichedData = slideshows.map((show, i) => ({
        ...show,
        prefetchedSlides: slidesResults[i] || [],
      }));

      return {
        success: true,
        data: enrichedData,
        hasMore: res.data.pagination.remainingItems > 0,
      };
    }

    return { success: false, data: [], hasMore: false };
  } catch (error) {
    console.error("Error loading slideshows:", error);
    return { success: false, data: [], hasMore: false };
  }
}
