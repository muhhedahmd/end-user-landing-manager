import { Fragment } from "react";
import FloatServiceDialog from "./FloatServiceDialog";
import { fetchServices } from "./Fetchers";

export const dynamic = "force-static"

const ServiceTable = async () => {
  const featServices = await fetchServices({
    skip: 0,
    take: 20,
    isFeatured: true,
  });
  return (

        <div className="w-full relative z-10 bg-neutral-100">
          
          <div className=" relative Feat-service md:max-h-80 max-h-170 overflow-auto  flex justify-start items-center w-full flex-col">
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

         
        </div>
      


  );
};

export default ServiceTable;
