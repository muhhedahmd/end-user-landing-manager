

import { SlideshowCard } from "./_comp/SlideShowCard";
import { PaginatedResponse } from "@/types/services";
import { SlideShow } from "@/types/slideShows";

const ITEMS_PER_PAGE = 10;
export const dynamic = "force-static"

type SlideShowResult = { status: "success" | "error"; data: PaginatedResponse<SlideShow> }
    | { status: "error" }
async function fetchSlideShows({ skip, take }: { skip: number, take: number }): Promise<SlideShowResult> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slide-show?skip=${skip}&take=${take}`,
            {
                cache: "force-cache",
                next: { revalidate: 3600 },
            },
        )
        if (!res.ok) return { status: "error" }
        const json = await res.json()
        const payload = json as PaginatedResponse<SlideShow>
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


async function SlideShowsProd() {
    const slideShows = await fetchSlideShows({ skip: 0, take: ITEMS_PER_PAGE })
    if (slideShows.status === "error" || !slideShows) return
    return (
        <div className="min-h-screen  px-4 py-16 ">
            <div className="space-y-6">
                {slideShows.data && slideShows.data.data.map((item, index) => (

                    <SlideshowCard
                        autoPlay={item.autoPlay}
                        interval={item.interval}
                        key={item.id}
                        item={item}
                        index={index}
                        bgColor={item.background || ""}
                    />
                ))}
            </div>
        </div>
    );
}
export default SlideShowsProd












//   const observerTarget = useRef<HTMLDivElement>(null);?
//   const loadingRef = useRef(false);

// const {
//     data: slideshowsData,
//     isLoading,
//     isError,
// } = useGetSlideShowsQuery({
//     skip: 0,
//     take: ITEMS_PER_PAGE,
// });

//     useEffect(() => {
//     if (!isLoading && slideshowsData) {
//       onLoad?.()
//     }
//   }, [isLoading,  slideshowsData])

//   // Update slides when new data arrives
//   useEffect(() => {
//     if (!slideshowsData?.data) return;
//     setIsLoadingMore(false);

//     const newSlides = slideshowsData.data.filter(
//       (newSlide) => !allSlides.some((existing) => existing.id === newSlide.id)
//     );

//     if (newSlides.length > 0) {
//       setAllSlides((prev) => [...prev, ...newSlides]);
//     }

//     if (slideshowsData.pagination) {
//       const { currentPage, totalPages } = slideshowsData.pagination;
//       setHasMore(currentPage < totalPages);
//     }
//   }, [allSlides, slideshowsData]);

// Intersection Observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           hasMore &&
//           !isLoading &&
//           !loadingRef.current
//         ) {
//           loadingRef.current = true;
//           setIsLoadingMore(true);
//           setPage((prev) => prev + 1);

//           setTimeout(() => {
//             loadingRef.current = false;
//           }, 500);
//         }
//       },
//       {
//         rootMargin: "500px",
//         threshold: 0.1,
//       }
//     );

//     if (observerTarget.current) {
//       observer.observe(observerTarget.current);
//     }

//     return () => observer.disconnect();
//   }, [hasMore, isLoading]);

// if (isError && allSlides.length === 0) {
//     return (
//         <div className="min-h-screen ">
//             <div className="max-w-6xl mx-auto px-4 py-16">
//                 <div className="text-center">
//                     <p className="text-gray-600 mb-6 text-lg">
//                         Failed to load slideshows
//                     </p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="px-6 py-2 bg-muted text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }