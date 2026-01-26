"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Moon } from "lucide-react"

function Switch({
  icon  ,
  className,
  ...props
}:React.ComponentProps<typeof SwitchPrimitive.Root> &  {icon : any}) {

  const pathname = usePathname() 
  const isRTL  = pathname.startsWith("/ar")

  return (
    <SwitchPrimitive.Root
    // dir={isRTL ? "rtl" : "ltr"}
    
      data-slot="switch"
      className={cn(
        "peer  data-[state=checked]:bg-background/20 data-[state=unchecked]:bg-background/90   px-0.5 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center l  shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 rounded-full",
        className
      )}
      {...props}
    >
      {/* <span> */}

      <SwitchPrimitive.Thumb
      // dir={isRTL ? "rtl" : "ltr"}
      data-slot="switch-thumb"
      className={cn(
        " bg-transparent justify-center   items-center pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%+5px)] data-[state=unchecked]:translate-x-0"
        , isRTL&& "data-[state=checked]:-translate-x-[calc(100%+5px)]") }
        >
          {
            icon ? icon :null
          }
          {/* <Moon className="w-4 h-4"/> */}

        </SwitchPrimitive.Thumb>
        {/* </span> */}
    </SwitchPrimitive.Root>
  )
}

export { Switch }
