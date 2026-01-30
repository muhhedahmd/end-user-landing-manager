



import { getCompanyInfo } from "@/app/[locale]/(routes)/services/comp/Fetchers";
import { SlideshowCard, SlideShowWithTranslations } from "@/composnents/SlideShow/_comp/SlideShowCard";
import { PaginatedResponse } from "@/types/services";


const ITEMS_PER_PAGE = 3;
export type SlideShowResult = { status: "success" | "error"; data: PaginatedResponse<SlideShowWithTranslations> } | { status: "error" }
async function fetchSlideShows({ locale, skip, take }: { locale: "en" | "ar", skip: number, take: number }): Promise<SlideShowResult> {
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        if (!BASE_URL) throw new Error("BACKEND_URL is not defined")
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slide-show?skip=${skip}&take=${take}&lang=${locale?.toUpperCase()}`,
            
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


const fetchAllSlideShows = async ({
    locale,
    pages,
    take = ITEMS_PER_PAGE,
}: {
    locale?: "en" | "ar",
    pages: number,
    take?: number,
}) => {
    if (pages <= 0) return [];

    try {
        // Create array of promises
        const promises = Array.from({ length: pages }, (_, i) =>
            
            fetchSlideShows({
                locale: locale || "en",
                skip: i,
                take: take,
            })
        );

        const results = await Promise.all(promises);

        const data = results
            .filter(res => res.status === "success")
            .flatMap(res => res.status === "success" ? res.data.data : []);

        return data;

    } catch (error) {
        console.error("Error fetching slide shows:", error);
        return [];
    }
}

async function SlideShowsProd({ locale = "en" }: { locale: "en" | "ar" }) {
    const companyinfo = await getCompanyInfo();
    const totalPages = companyinfo?.slideShowsPages?.totalPages || 0;

    if (totalPages === 0) {
        return (
            <div className="min-h-screen px-4 py-16">
                <div className="space-y-6">
                    <p>No slide shows available.</p>
                </div>
            </div>
        );
    }

    const slideShows = await fetchAllSlideShows({
        locale,
        pages: totalPages - (companyinfo?.slideShowsPages?.nowCount || 0),
        take: companyinfo?.slideShowsPages.pageSize || ITEMS_PER_PAGE,
    });

    return (
        <div className="min-h-screen px-4 py-16">
            <div className="space-y-6">
                {slideShows.map((item, index) => (
                    <SlideshowCard
                        locale={locale}
                        autoPlay={item.autoPlay}
                        interval={item.interval}
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default SlideShowsProd;