


import { PaginatedResponse } from "@/types/services";
import { InfiniteScrollContainer } from "./_comp/PaggintionSlideshows";
import { SlideShowWithTranslations } from "./_comp/SlideShowCard";
import { fetchSlideShows } from "@/lib/actions/slideShows";

const ITEMS_PER_PAGE = 4;
const initialSkip = 0;

export type SlideShowResult = { status: "success" | "error"; data: PaginatedResponse<SlideShowWithTranslations> } | { status: "error" }



async function SlideShowsProd({ locale }: { locale: "en" | "ar", }) {
    const slideShows = await fetchSlideShows({ locale, skip: initialSkip, take: ITEMS_PER_PAGE })

    if (slideShows.status === "error" || !slideShows) return <div className="bg-destructive w-screen h-screen  flex items-center justify-between">
        something went wrong
    </div>
    const _SlideShows = slideShows.data

    const hasMore = slideShows.status === "success"
        ? slideShows.data.pagination.remainingItems > 0
        : false
    return (
        <div className="min-h-screen  px-4 py-16 ">
            <div className="space-y-6">
                <InfiniteScrollContainer initialData={_SlideShows.data} locale={locale} itemsPerPage={ITEMS_PER_PAGE} initialHasMore={hasMore} />
            </div>
        </div>
    );
}
export default SlideShowsProd


              