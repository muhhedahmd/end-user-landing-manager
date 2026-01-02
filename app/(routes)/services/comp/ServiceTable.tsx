import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import FloatServiceDialog from "./FloatServiceDialog";
import { ServiceWithImage } from "@/types/schema";
import { PaginatedResponse } from "@/types/services";


export const dynamic = "force-static"

const fetchServices = async ({

  skip,
  take,
  isFeatured,
}: {
  skip: number;
  take: number;
  isFeatured: boolean;
}): Promise<PaginatedResponse<ServiceWithImage> | null> => {
  try {
    const params = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
      Active: "true",
      isFeatured: isFeatured.toString(),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/services?${params.toString()}`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },

      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ServiceTable = async () => {
  const featServices = await fetchServices({
    skip: 0,
    take: 20,
    isFeatured: true,
  });
  return (
    <>
      <div className=" relative w-screen flex items-center flex-col md:justify-end justify-center  h-screen md:p-20 pt-[50%] p-2">
        <div className="w-full relative">
          <div className=" relativeFeat-service md:max-h-80 max-h-170 overflow-auto  flex justify-start items-center w-full flex-col">
            <div className=" sticky top-0 bg-neutral-100 border-b border-black feat-haeader w-full">

              <div className="flex items-center justify-between  w-full  font-bold cursor-default">
                <h4 className="flex-1">Name</h4>

                <p className="text-wrap line-clamp-1 flex-2">Description</p>

                <p className="md:block hidden  text-wrap line-clamp-1 flex-3">Content</p>
              </div>
            </div>

            {featServices?.data.map((item, i) => {

              return (
                <Fragment key={i}>
                  <FloatServiceDialog
                    item={item}
                    idx={i}
                    Allitems={featServices.data}
                  >
                    <h4 className="flex-1  line-clamp-1">{item.name}</h4>

                    <p className="text-wrap line-clamp-1 flex-2">
                      {item.description}
                    </p>

                    <p className="md:block hidden text-wrap line-clamp-1 flex-3">
                      {item.richDescription}
                    </p>
                  </FloatServiceDialog>
                  {/* </button> */}
                </Fragment>
              );
            })}
          </div>

          {/* <div className=" absolute md:-bottom-14 -bottom-24 flex items-center justify-center w-full">
            <button className="rounded-xl flex items-center cursor-pointer hover:bg-black hover:text-white bg-accent border-black border p-2 min-h-0 h-fit min-w-fit w-fit text-black">
              VIEW ALL <ChevronDown />
            </button>
          </div> */}
        </div>
      </div>
      {/* <FloatServiceDialog /> */}
    </>
  );
};

export default ServiceTable;
