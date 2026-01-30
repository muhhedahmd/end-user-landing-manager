import { Image } from "@/types/schema";
import { successResponse } from "@/types/services";

export interface Slide {
  id: string;
  type: "services" | "projects" | "clients" | "testimonials" | "team";
  order: number;
  isVisible: boolean;
  customTitle?: string;
  customDescription?: string;
  translation :  {
    lang : string;
    title : string;
    position: string;
    name: string
    description : string
  }[],
  data: {
    name?: string;
    title?: string;
    clientName?: string;
    image?: Image;
    avatar?: Image;
    logo?: Image;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export interface PaginationInfo {
  totalPages: number;
  hasMore: boolean;
  currentPage: number;
}
export interface PaginatedSlidesResponse {
  slides: Slide[];
  pages: Record<
    "services" | "projects" | "clients" | "testimonials" | "team",
    PaginationInfo
  >;
  slidesCount: {
    services: number;
    projects: number;
    clients: number;
    testimonials: number;
    team: number;
  };
}

import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// Create axios instance with default config
const slidesApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
slidesApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
slidesApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error(
      "[API Response Error]",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export interface FetchSlidesParams {
  id: string;
  page?: number;
  perPage?: number;
}

export class SlidesService {
  // Cache for slides data
  private cache = new Map<
    string,
    {
      data: successResponse<PaginatedSlidesResponse>;
      timestamp: number;
    }
  >();

  private readonly CACHE_TTL = 60000; // 1 minute

  /**
   * Fetch paginated slides for a slideshow
   */
  async fetchSlides({
    id,
    page = 1,
    perPage = 50,
  }: FetchSlidesParams): Promise<successResponse<PaginatedSlidesResponse>> {
    // Check cache first
    const cacheKey = `${id}-${page}-${perPage}`;
    const cached = this.cache.get(cacheKey);

    // revlaidate cache if stale
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const response = await slidesApi.post<
        successResponse<PaginatedSlidesResponse>
      >(`/api/slide-show/get-paginated-slides/${id}`, { id, page, perPage });

      // Cache the response
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch slides"
        );
      }
      throw error;
    }
  }

  /**
   * Clear cache for specific slideshow or all
   */
  clearCache(id?: string) {
    if (id) {
      // Clear cache for specific slideshow
      for (const key of this.cache.keys()) {
        if (key.startsWith(id)) {
          this.cache.delete(key);
        }
      }
    } else {
      // Clear all cache
      this.cache.clear();
    }
  }

  /**
   * Prefetch slides for a slideshow
   */
  async prefetchSlides(id: string) {
    try {
      await this.fetchSlides({ id, page: 1, perPage: 50 });
    } catch (error) {
      console.warn(`[Prefetch Failed] ${id}`, error);
    }
  }
}

// Singleton instance
export const slidesService = new SlidesService();
