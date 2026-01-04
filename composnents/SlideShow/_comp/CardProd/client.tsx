import { ClientWithRelationsSlide } from "@/types/schema"
import Link from "next/link"
interface ClientCardProps {
    data: ClientWithRelationsSlide
    cube?: boolean,
    single?: boolean,
    idx?: number
}
import BlurredImage from "@/composnents/Reusabale/ClientImageWithBlurHash"
import { cn } from "@/lib/utils"

export const ClientCard = ({ data, single, idx }: ClientCardProps) => {

    if (single) return <ClientCardsingle data={data} idx={idx} />
    else
        return (
            <div
                className="group relative h-fit w-full  flex lg:flex-row flex-col   rounded-2xl  border-primary bg-card  border-1  hover:border-primary/50 transition-all duration-300 overflow-hidden gap-4"
            >
                <div className="lg:h-full h-1/4 lg:w-1/2 w-full  ">



                    {data.image && (


                        <div className="relative h-full  bg-muted/50 border-b border-border ">
                            <BlurredImage
                                imageUrl={data.image.url}
                                height={data.image.height || 400}
                                width={data.image.width || 400}
                                alt={data.image.alt || data.name}
                                blurhash={data.image.blurHash || ""}
                                quality={100}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    )}
                </div>

                {/* Logo Section */}
                <div className="lg:h-full h-1/2 lg:w-1/2 w-full border-border bg-card">

                    {data.logo && (
                        <div className=" bg-muted/30 flex  items-center justify-start gap-4 p-4 border-b border-border">
                            <BlurredImage
                                imageUrl={data.logo.url}
                                height={data.logo.height || 100}
                                width={data.logo.width || 100}
                                alt={data.logo.alt || `${data.name} logo`}
                                blurhash={data.logo.blurHash || ""}
                                quality={100}
                                className="max-w-5 max-h-5 w-5 h-5 object-contain rounded-xl"
                            />
                            <h3
                                className="text-lg font-bold text-foreground font-sora"
                            >
                                {data.name}
                            </h3>
                        </div>
                    )}
                    <div className="p-6 space-y-3">

                        {data.industry && (
                            <span className="client-industry inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full font-inter">
                                {data.industry}
                            </span>
                        )}

                        {data.description && (
                            <p className="client-description lg:text-md text-sm font-semibold text-muted-foreground leading-relaxed font-inter">
                                {data.description}
                            </p>
                        )}

                        {data.richDescription && data.richDescription !== data.description && (
                            <div
                                className="client-description md:line-clamp-none  line-clamp-3 text-sm font-bold text-muted-foreground leading-relaxed font-inter prose prose-sm dark:prose-invert"
                                dangerouslySetInnerHTML={{ __html: data.richDescription }}
                            />
                        )}

                        {data.website && (
                            <Link
                                href={data.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="client-website inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-inter group/link"
                            >
                                Visit Website
                                <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                                    →
                                </span>
                            </Link>
                        )}


                    </div>
                </div>

            </div >
        )
}

const ClientCardsingle = ({ data, idx = 0 }: ClientCardProps) => {

    return (
        <div
            className="group relative h-full w-full  flex lg:flex-row flex-col  items-center justify-start  rounded-2xl  border-primary  hover:border-primary/50 transition-all duration-300 overflow-hidden gap-4"
        >
            <div className=" h-full   xl:w-1/2 lg:w-full w-full  shrink-0 ">



                {data.image && (


                    <div className="relative h-full  items-center justify-center    ">

                        <BlurredImage
                            imageUrl={data.image.url}
                            height={data.image.height || 400}
                            width={data.image.width || 400}
                            alt={data.image.alt || data.name}
                            blurhash={data.image.blurHash || ""}
                            quality={100}
                            className="md:w-full md:h-full sm:h-[70%] sm:w-[90%]  w-full h-full  object-cover  transition-transform duration-700 ease-out rounded-2xl shadow-md"
                        />
                    </div>

                )}
            </div>

            <div className="  relative  lg:h-3/4 h-1/4 lg:w-1/2 w-full  md:mr-10  items-center justify-center md:flex hidden ">


                <h2 style={{
                    textShadow: "0 0  3px black"
                }} className={cn("  z-5 cursor-default  lg:text-[50rem] xl:text-[60rem] text-white ",)}> {idx + 1}
                </h2>
                <span
                    style={{
                        textShadow: "0 0  2px black"

                    }}
                    className=" w-max z-10 absolute -top-20 left-1/2 -translate-1/2  text-8xl font-bold  text-white font-sora">
                    {data.industry}
                </span>

            </div>
            {/* Logo Section */}
            <div className=" z-10 md:min-w-auto md:w-auto min-w-5/6 w-3/4   absolute  top-1/2 left-1/2 md:top-1/2   md:left-1/2 -translate-1/2 bg-white  p-4 shadow-2xl border border-border rounded-xl space-y-4 ">



                {data.logo && (

                    <div className=" bg-muted/30 flex  items-center justify-start gap-4 p-4 ">
                        <BlurredImage
                            imageUrl={data.logo.url}
                            height={data.logo.height || 100}
                            width={data.logo.width || 100}
                            alt={data.logo.alt || `${data.name} logo`}
                            blurhash={data.logo.blurHash || ""}
                            quality={100}
                            className="max-w-10 max-h-10 sm:w-10 sm:h-10  object-contain rounded-md"
                        />
                        <h3
                            className="text-2xl md:text-4xl line-clamp-1 font-bold text-foreground font-sora"
                        >
                            {data.name}
                        </h3>
                    </div>
                )}
                <div className="p-6 space-y-8">



                    {data.description && (
                        <p className="client-description text-xl lg:text-md lg:text-2xl xl:text3xl font-bold text-primary leading-relaxed font-inter">
                            {data.description}
                        </p>
                    )}

                    {data.richDescription && data.richDescription !== data.description && (
                        <div
                            className=" relative z-30 client-description md:line-clamp-none  sm:line-clamp-6 line-clamp-5 lg:text-xl xl:text-xl  text-black leading-relaxed font-inter prose prose-sm dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: data.richDescription }}
                        />
                    )}

                    {data.website && (
                        <Link
                            href={data.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="client-website inline-flex items-center gap-1 lg:text-xl xl:text-2xl font-semibold text-primary hover:text-primary/80 transition-colors font-inter group/link"
                        >
                            Visit Website
                            <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                                →
                            </span>
                        </Link>
                    )}


                </div>
            </div>

        </div >

    )
}