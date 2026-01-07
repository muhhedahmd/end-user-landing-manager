"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"



const Page = () => {
  const ref = useRef<HTMLDivElement[]>([])

  // useGSAP(()=>{

  //   gsap.to(ref.current, {
  //     x : gsap.utils.wrap(["-100%" , "100%" ,"-100%" , "100%"]),
  //     duration : 2,
  //     yoyo : true,

  //     ease : "power4.out"
  //   })

  // } , { 
  //   dependencies : [ref]

  // })
  return (
    <>
    <div className="h-screen w-screen relative">

  <div ref={(el) => { if (el) ref.current[0] = el }} className=' absolute top-0 left-0 test h-20 w-20   bg-emerald-500'/>
  <div ref={(el) => { if (el) ref.current[0] = el }} className='test h-20 w-20 absolute top-0 right-0   bg-emerald-500'/>
  <div ref={(el) => { if (el) ref.current[0] = el }} className='test h-20 w-20  absolute bottom-0 right-0  bg-emerald-500'/>
  <div ref={(el) => { if (el) ref.current[0] = el }} className='test h-20 w-20    bg-emerald-500'/>
    </div>
  {/* <div ref={(el) => { if (el) ref.current[0] = el }} className='test h-[25vh] w-screen bg-emerald-500'/>
  <div ref={(el) => { if (el) ref.current[1] = el }} className='test h-[25vh] w-screen bg-purple-500'/>

  <div ref={(el) => { if (el) ref.current[2] = el }} className='test h-[25vh] w-screen bg-blue-600'/>
  <div ref={(el) => { if (el) ref.current[3] = el }} className='test h-[25vh] w-screen bg-amber-600'/> */}
    </>
  )
}

export default Page