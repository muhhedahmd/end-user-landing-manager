"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  label: string
  href: string
}

export default function HeaderClient({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Button className="mt-4 bg-white border-1 border-primary text-primary hover:bg-primary hover:text-secondary cursor-pointer">Get Started</Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden p-2" aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="pt-10">
          <nav className="flex flex-col gap-3">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Button  onClick={() => setOpen(false)} className="mt-4 bg-white border-1 border-primary text-primary">
              Get Started
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
