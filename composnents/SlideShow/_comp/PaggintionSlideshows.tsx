/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import { SlideShow } from "@/types/slideShows"
import { fetchSlideShows } from "@/app/[locale]/(routes)/services/comp/Fetchers"
import { SlideshowCard, SlideShowWithTranslations } from "./SlideShowCard"

interface PaginationTriggerProps {
  locale: "en" | "ar"
  initialData: SlideShowWithTranslations[]          
  initialPage?: number              
  itemsPerPage?: number
}

const PaginationTrigger = ({
  locale,
  initialPage = 1,
  itemsPerPage = 3,
}: PaginationTriggerProps) => {
  const [items, setItems] = useState<SlideShow[]>([])
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [hasMore, setHasMore] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    if (!ref.current || !hasMore) return

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        if (loadingRef.current) return

        loadingRef.current = true
        const nextPage = currentPage + 1

        try {
          const res = await fetchSlideShows({
            locale :locale,
            skip: (nextPage - 1),
            take: itemsPerPage,
          })

          if (res.status === "success" && res.data.data.length > 0) {
            setItems(prev => [...prev, ...res.data.data])
            setCurrentPage(nextPage)
            setHasMore(res.data.pagination.remainingItems > 0)
          } else {
            setHasMore(false)
          }
        } catch {
          setHasMore(false)
        } finally {
          loadingRef.current = false
        }
      },
      { threshold: .1, rootMargin: "400px 0px 400px 0px" }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [locale, currentPage, hasMore, itemsPerPage])

  return (
    <>
      {items.map((item, index) => (
        <SlideshowCard
          key={item.id}
          item={item as any}
          index={index}
          locale={locale}
          autoPlay={item.autoPlay}
          interval={item.interval}
        />
      ))}

      {hasMore && <div ref={ref} className="h-40  w-full bg-transparent" />}
    </>
  )
}

export default PaginationTrigger
