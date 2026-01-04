
// ServicePage.tsx
import { Fragment } from "react/jsx-runtime";
import ServiceTable from "./comp/ServiceTable"
import Footer from "@/composnents/Footer/Footer";
import ContactForm from "@/composnents/contact/ContactForm";
import AllServices from "./comp/AllServices";

const ServicePage = async () => {

  return (
    <>
      <div className=' fixed top-0 left-0 w-screen h-screen '>

        <div className=" -z-2 absolute lg:top-1/4 xl:top-2/5 sm:top-2/5 top-[15%] -translate-y-1/2 flex items-start gap-2 flex-col px-2 sm:px-8 md:px-12 lg:px-20">


          <h2 className="text-3xl sm:text-5xl lg:text-4xl xl:text-8xl max-w-3xl w-max font-bold">
            SELECT SERVICE
          </h2>
          <h2 className="text-3xl sm:text-5xl lg:text-4xl  xl:text-8xl max-w-5xl w-max font-bold">
            TECH VISION @ {new Date().getFullYear() + 1}
          </h2>
        </div>
        <div className=" relative z-10  w-screen flex items-center flex-col md:justify-end justify-center  h-screen md:p-20 pt-[50%] p-2">
          <ServiceTable />

        </div>
      </div>
      <div className="relative bg-transparent -z-1 h-screen w-screen">

      </div>
    <AllServices/>
    

      <section id="contact" className="relative bg-background pt-20 w-screen">

        <ContactForm />
      </section>


      <div className='relative z-10 '>

        <Footer />
      </div>

    </>

  )
}

export default ServicePage