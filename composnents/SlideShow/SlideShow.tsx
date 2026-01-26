


import { PaginatedResponse } from "@/types/services";
import PaggintionSlideshows from "./_comp/PaggintionSlideshows";
import { SlideshowCard, SlideShowWithTranslations } from "./_comp/SlideShowCard";

const ITEMS_PER_PAGE = 3;
const initialSkip = 0;
export const dynamic = "force-dynamic";

export type SlideShowResult = { status: "success" | "error"; data: PaginatedResponse<SlideShowWithTranslations> } | { status: "error" }
async function fetchSlideShows({ locale, skip, take }: { locale: "en" | "ar", skip: number, take: number }): Promise<SlideShowResult> {

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slide-show?skip=${skip}&take=${take}&lang=${locale?.toUpperCase()}`,
            {
                cache: "force-cache",
                next: { revalidate: 1 },
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


async function SlideShowsProd({ locale }: { locale: "en" | "ar", page?: string }) {
    const slideShows = await fetchSlideShows({ locale, skip: initialSkip, take: ITEMS_PER_PAGE })

    if (slideShows.status === "error" || !slideShows) return
    const _SlideShows = slideShows.data

    return (
        <div className="min-h-screen  px-4 py-16 ">
            <div className="space-y-6">
                {_SlideShows && _SlideShows.data.map((item, index) => (

                    <SlideshowCard
                        locale={locale}
                        autoPlay={item.autoPlay}
                        interval={item.interval}
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))}
                <PaggintionSlideshows initialData={_SlideShows.data} locale={locale} initialPage={1} itemsPerPage={ITEMS_PER_PAGE} />
            </div>
        </div>
    );
}
export default SlideShowsProd

