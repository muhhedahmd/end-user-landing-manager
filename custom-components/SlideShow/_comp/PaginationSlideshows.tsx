'use client'

import { useEffect, useRef, useState, useTransition } from "react"
import { SlideshowCard } from "./SlideShowCard"
import { CompositionLoader } from "./SlidesLoader"
import { CompositionType } from "@/types/schema"
import { loadMoreSlideShows } from "@/lib/actions/slideShows"
import { SlideShowWithPrefetchedSlides } from "../SlideShow"

interface InfiniteScrollContainerProps {
  initialData: SlideShowWithPrefetchedSlides[]
  locale: "en" | "ar"
  itemsPerPage: number
  initialHasMore: boolean
}

export function InfiniteScrollContainer({
  initialData,
  locale,
  itemsPerPage,
  initialHasMore,
}: InfiniteScrollContainerProps) {
  const [items, setItems] = useState<SlideShowWithPrefetchedSlides[]>(initialData)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isPending, startTransition] = useTransition()
  const observerRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    if (!observerRef.current || !hasMore || isPending) return

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return

        loadingRef.current = true

        startTransition(async () => {
          const result = await loadMoreSlideShows(locale, currentPage, itemsPerPage)

          if (result.success && result.data.length > 0) {
            setItems(prev => [...prev, ...result.data])
            setCurrentPage(prev => prev + 1)
            setHasMore(result.hasMore)
          } else {
            setHasMore(false)
          }

          loadingRef.current = false
        })
      },
      {
        threshold: 0.1,
        rootMargin: "400px 0px 400px 0px",
      }
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [hasMore, isPending, currentPage, locale, itemsPerPage])

  return (
    <>
      {items.map((item, index) => (
        <SlideshowCard
          key={item.id}
          item={item}
          index={index}
          locale={locale}
          autoPlay={item.autoPlay}
          interval={item.interval}
        // prefetchedSlides={item.prefetchedSlides}
        />
      ))}

      {isPending && (
        <div className="flex min-h-screen w-screen items-center container mx-auto justify-center flex-col gap-4">
          <CompositionLoader composition={CompositionType.GRID} locale={locale} />
          <CompositionLoader composition={CompositionType.PARALLAX} locale={locale} />
        </div>
      )}

      {/* Invisible trigger element for intersection observer */}
      {hasMore && (
        <div
          ref={observerRef}
          className="h-20 w-full"
          aria-hidden="true"
        />
      )}
    </>
  )
}