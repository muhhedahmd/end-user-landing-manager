'use client'

import { useEffect, useRef, useState, useTransition } from "react"
import { SlideshowCard, SlideShowWithTranslations } from "./SlideShowCard"
import { CompositionLoader } from "./SlidesLoader"
import { CompositionType } from "@/types/schema"
import { loadMoreSlideShows } from "@/lib/actions/slideShows"

interface InfiniteScrollContainerProps {
  initialData: SlideShowWithTranslations[]
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
  const [items, setItems] = useState<SlideShowWithTranslations[]>(initialData)
  const [currentPage, setCurrentPage] = useState(1) // Start from page 2 since initialData is page 1
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
          console.log('Loading page:', currentPage, result)
          
          if (result.success && result.data.length > 0) {
            setItems(prev => [...prev, ...result.data])
            setCurrentPage(prev => prev + 1) // Increment page
            setHasMore(result.hasMore)
          } else {
            setHasMore(false)
          }

          loadingRef.current = false
        })
      },
      {
        threshold: 0.1,
        rootMargin: "400px 400px 400px 0px",
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
        />
      ))}

      {isPending && (
        <div className="flex min-h-screen w-screen items-center container mx-auto justify-center flex-col gap-4">
          <CompositionLoader composition={CompositionType.GRID} locale="en" />
          <CompositionLoader composition={CompositionType.PARALLAX} locale="en" />
          <CompositionLoader composition={CompositionType.CAROUSEL} locale="en" />
          <CompositionLoader composition={CompositionType.LIGHTBOX} locale="en" />
          <CompositionLoader composition={CompositionType.MARQUEE} locale="en" />
          <CompositionLoader composition={CompositionType.COVERFLOW} locale="en" />
        </div>
      )}

      {/* Invisible trigger element for intersection observer */}
      {hasMore && (
        <div 
          ref={observerRef} 
          className="h-2400 w-full" 
          aria-hidden="true"
        />
      )}
    </>
  )
}