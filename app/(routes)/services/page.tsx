
// ServicePage.tsx
import ServiceTable from "./comp/ServiceTable"

const ServicePage = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-neutral-100'>
      <div className="absolute top-1/5 sm:top-2/5 -translate-y-1/2 flex items-start gap-2 flex-col px-2 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-3xl w-max font-bold">
          SELECT SERVICE
        </h2>
        <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl w-max font-bold">
          TECH VISION @ 2025
        </h2>
      </div>
      <ServiceTable />
    </div>
  )
}

export default ServicePage