



import { getCompanyInfo } from "@/app/[locale]/(routes)/services/comp/Fetchers";
import { SlideshowCard, SlideShowWithTranslations } from "@/composnents/SlideShow/_comp/SlideShowCard";
import { PaginatedResponse } from "@/types/services";


const ITEMS_PER_PAGE = 3;
export type SlideShowResult = { status: "success" | "error"; data: PaginatedResponse<SlideShowWithTranslations> } | { status: "error" }
 async function fetchSlideShows({ locale, skip, take }: { locale: "en" | "ar", skip: number, take: number }): Promise<SlideShowResult> {
    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/slide-show?skip=${skip}&take=${take}&lang=${locale?.toUpperCase()}`,
            {
                cache: "no-store",
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queue: any[] = []
const testMulti = async ({

    locale,
    pages,
    take = ITEMS_PER_PAGE,
}: {
    locale?: "en" | "ar",
    pages: number,
    take?: number,
}) => {
    if (pages <= 0 || queue.length > 0) return;
    try {

        Array.from({ length: pages }, (_, i) => {
            fetchSlideShows({
                locale: locale || "en",
                skip: i ,
                take: take,
            })
                .then(res => {
                    if (res.status === "success") {
                        queue.push(res.data.data)
                    }
                })
                .catch(console.error)
        })

    } catch (error) {
        console.error("Error fetching slide shows:", error);

    }
}

async function SlideShowsProd({ locale = "en" }: { locale: "en" | "ar", }) {
    const companyinfo = await getCompanyInfo()
    const totalPages = companyinfo?.slideShowsPages?.totalPages || 0

    await testMulti({
        locale,
        pages: totalPages - (companyinfo?.slideShowsPages?.nowCount || 0),
        take: companyinfo?.slideShowsPages.pageSize || ITEMS_PER_PAGE,
    });
    
    const merge = queue.flat()

    return (
        <div className="min-h-screen  px-4 py-16 ">
            <div className="space-y-6">


                {merge && merge.map((item, index) => (

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
export default SlideShowsProd

