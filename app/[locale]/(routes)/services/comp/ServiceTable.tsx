import { Fragment } from "react";
import FloatServiceDialog from "./FloatServiceDialog";
import { fetchServices } from "./Fetchers";
import { DictionaryShape } from "@/custom-components/contact/ContactForm";

export const dynamic = "force-static"

const ServiceTable = async ({ locale,dictionary}:{
  locale: "en" | "ar";
  dictionary :DictionaryShape

}) => {
  const featServices = await fetchServices({

    langEnd : locale?.toUpperCase() as "EN" |"AR"  || "EN",
    skip: 0,
    take: 15,
    isFeatured: true,
  });
  return (<>
        <div className="w-full relative z-10 ">

          <div className="  z-100 relative Feat-service md:max-h-80 max-h-170  overflow-auto bg-background border-primary border p-2 reounded-md  flex justify-start items-center w-full flex-col">
            <div className=" sticky top-0 py-2  border-b border-primary feat-haeader w-full">


              <div className="flex items-center justify-between  w-full  font-bold cursor-default">
                <h4 className="flex-1">{dictionary.servicePage.table.name}</h4>

                <p className="text-wrap line-clamp-1 flex-2">{dictionary.servicePage.table.description}</p>

                <p className="md:block hidden  text-wrap line-clamp-1 flex-3">{dictionary.servicePage.table.description}</p>
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
                    <h4 className="flex-1  line-clamp-1 ">{item.name}</h4>

                    <p className="text-wrap line-clamp-1 flex-2 ">
                      {item.description}
                    </p>
                  <div className="flex-3 md:block hidden ">

                    <p className="text-wrap wrap-anywhere line-clamp-1 ">
                      {item.richDescription}
                    </p>
                  </div>
                  </FloatServiceDialog>
                  {/* </button> */}
                </Fragment>
              );
            })}
          </div>

          

         
        </div>
      

                    </>

  );
};

export default ServiceTable;
