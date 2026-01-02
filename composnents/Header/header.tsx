
import Link from "next/link"
import HeaderClient from "./header-client"
import Image from "next/image"
import HeaderAniamtion from "./HeaderAniamtion"
import { CompanyInfo } from "@/types/schema"


export const dynamic = "force-static"

async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {

    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/company-info", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null
    const json = await res.json()
    return json?.data ?? null
  } catch (err) {
    console.error(err)
    return null
  }
}

export default async function Header() {
  const companyInfo = await getCompanyInfo()

  const navItems = [
    { label: "Services", href: "/services" },
    // { label: "Portfolio", href: "#portfolio" },
    { label: "Team", href: "#team" },
    { label: "Blog", href: "/blogs" },
    { label: "Features", href: "#features" },
    // { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <HeaderAniamtion>

      <div className="  h-full flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {companyInfo?.logo ? (
            <Image
              src={companyInfo.logo.url}
              width={8}
              height={8}
              alt={companyInfo.logo.alt || companyInfo.name}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {companyInfo?.name?.charAt(0) ?? "V"}
            </div>
          )}
          <span className="font-semibold hidden sm:inline">
            {companyInfo?.name ?? "Brand"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-md font-medium hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderClient companyInfo={companyInfo ?? null} navItems={navItems} />
      </div>
    </HeaderAniamtion>

  )
}


