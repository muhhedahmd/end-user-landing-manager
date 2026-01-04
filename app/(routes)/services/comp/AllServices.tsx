import { PlusIcon } from "lucide-react"
import { fetchServices } from "./Fetchers"
import ServiceAnimation from "./serviceAnimation"
import ServiceHoverCard from "./ServiceHoverCard"



const AllServices = async () => {
    const skip = 0
    const result = await fetchServices({
        skip,
        take: 100,
        isFeatured: true,
    })




    return (
        <ServiceAnimation>
            <h2 className="  sticky top-0 text-4xl  sm:lg:text-3xl lg:text-6xl xl:text-7xl font-bold text-center pt-4 md:pt-10">
                Our Services
            </h2>
            <div className="container mx-auto flex justify-start items-start flex-col md:gap-10 gap-4 md:pt-20 pt-5">
                {
                    result?.data.map((item, i) => {
                        return (

                            <ServiceHoverCard item={item} key={i} idx={i} >


                             <div className="flex justify-start items-start  gap-2  ">
                                <PlusIcon className="w-8 h-8 group-hover:animate-spin"/>
                                <span className="text-2xl font-bold line-clamp-1">{item.name}</span>
                             </div>

                             <div className="md:ml-10 ml-2 flex justify-start items-start flex-col">
                                <span className="md:text-xl sm:text-md text-md font-bold line-clamp-1 ">{item.description}</span>
                                <p className="md:text-lg text-md font-normal  line-clamp-2">{item.richDescription}</p>
                             </div>
                             </ServiceHoverCard>
                        )
                    })
                }

            </div>
        </ServiceAnimation>
    )
}

export default AllServices