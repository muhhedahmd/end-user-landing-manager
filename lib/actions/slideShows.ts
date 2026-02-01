// app/actions/slideshow-actions.ts
'use server'

import { SlideShowWithTranslations } from "@/composnents/SlideShow/_comp/SlideShowCard"
import { SlideShowResult } from "@/composnents/SlideShow/SlideShow"

import { PaginatedResponse } from "@/types/services"



export async function fetchSlideShows({ locale, skip, take }: { locale: "en" | "ar", skip: number, take: number }): Promise<SlideShowResult> {
    try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slide-show?skip=${skip}&take=${take}&lang=${locale?.toUpperCase()}&visible=true`,
      {
        cache: "force-cache",

        next: {
          revalidate: 900,

        },

      },
    )
    if (!res.ok) return { status: "error" }
    const json = await res.json()
    const payload = json as PaginatedResponse<SlideShowWithTranslations>
    if (!payload) {
      return { status: "error" }
    }
    return {
      status: "success",
      data: payload
    }
  } catch {
    return { status: "error" }
  }
}


export async function loadMoreSlideShows(
  locale: "en" | "ar",
  page: number,
  itemsPerPage: number = 3
) {
    console.log({page , itemsPerPage})
  try {
    const res = await fetchSlideShows({
      locale,
      skip: page , // Just pass the page number (backend handles skip calculation)
      take: itemsPerPage,
    })

    if (res.status === "success") {
      return {
        success: true,
        data: res.data.data,
        hasMore: res.data.pagination.remainingItems > 0,
      }
    }

    return { success: false, data: [], hasMore: false }
  } catch (error) {
    console.error('Error loading slideshows:', error)
    return { success: false, data: [], hasMore: false }
  }
}









