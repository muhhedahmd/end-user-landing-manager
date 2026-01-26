
// ServicePage.tsx
import ServiceTable from "./comp/ServiceTable"
import Footer from "@/composnents/Footer/Footer";
import ContactForm from "@/composnents/contact/ContactForm";
import AllServices from "./comp/AllServices";
import { getDictionary } from "@/lib/i18n";

const ServicePage = async ({ params }: { params: Promise<{ locale: "en" | "ar" }> }) => {
    const _locale = (await params).locale || "en"
  const dictionary = await getDictionary(_locale)

  return (
    <>
      <div className=' fixed top-0 left-0 w-screen h-screen '>

        <div className=" -z-2 absolute lg:top-1/5 xl:top-60 md:top-1/3 sm:top-2/5 top-[20%] -translate-y-1/2 flex items-start gap-2 flex-col px-2 sm:px-8 md:px-12 lg:px-20">


          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl max-w-3xl w-max font-bold">
            {dictionary.servicePage.hero.selectService}
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl  xl:text-8xl max-w-5xl w-max font-bold">
            {dictionary.servicePage.hero.techVision}{new Date().getFullYear() + 1}
          </h2>
        </div>
        <div className=" relative z-10  w-screen flex items-center flex-col md:justify-end justify-center  h-screen md:p-20 pt-[50%] p-2">
          <ServiceTable locale={_locale} dictionary={dictionary} />

        </div>
      </div>
      <div className="relative bg-transparent -z-1 h-screen w-screen">

      </div>
    <AllServices locale={_locale} />
    

      <section id="contact" className="relative bg-background pt-20 w-screen">

        <ContactForm dictionary={dictionary} />
      </section>


      <div className='relative z-10 '>

        <Footer locale={_locale} dictionary={dictionary} />
      </div>

    </>

  )
}

export default ServicePage