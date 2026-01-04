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
            <h2 className="  text-4xl  sm:lg:text-3xl lg:text-6xl xl:text-7xl font-bold text-center">
                Our Services
            </h2>
            <div className="container mx-auto flex justify-start items-start flex-col gap-10 pt-30">
                {
                    result?.data.map((item, i) => {
                        return (

                            <ServiceHoverCard item={item} key={i} idx={i} >


                             <div className="flex justify-start items-start  gap-2  ">
                                <PlusIcon className="w-8 h-8 group-hover:animate-spin"/>
                                <span className="text-2xl font-bold">{item.name}</span>
                             </div>

                             <div className="ml-10 flex justify-start items-start flex-col">


                                <span className="text-xl font-semibold ">{item.description}</span>
                                <p className="text-lg font-normal  line-clamp-2">{item.richDescription}</p>
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