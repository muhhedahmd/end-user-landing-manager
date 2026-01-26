import Link from "next/link";
import HeaderClient from "./header-client";
import Image from "next/image";
import HeaderAniamtion from "./HeaderAniamtion";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n";
import { getCompanyInfo } from "@/app/[locale]/(routes)/services/comp/Fetchers";

export const dynamic = "force-static";



export default async function Header({
  locale,
  title,
  border,
}: {
  title?: string;
  border?: boolean;
  locale: "en" | "ar";
}) {
  const companyInfo = await getCompanyInfo();
  const dictionary = await getDictionary(locale);

  const navItems = [
    { label: dictionary.header.services, href: `/${locale}/services` },
    { label: dictionary.header.team, href: `/${locale}/team` },
    { label: dictionary.header.about, href: `/${locale}/about` },
  ];

  if (!companyInfo) {
    return null
  }
  const { company, logo, translation } = companyInfo
  const currentTranslaton = translation?.find((item) => item?.lang?.toLowerCase() === locale.toLowerCase())
  return (
    <HeaderAniamtion locale={locale} border={border} title={title}>
      <div dir={locale === "ar" ? "rtl" : "ltr"} className="  h-full w-full flex items-center justify-between  sm:px-8 md:px-16 lg:px-24 2xl:px-32 sm:py-4 py-0 px-4 ">
        
        <div className="w-full flex items-end justify-start ">
        <Link href="/" className="flex items-center gap-2 w-fit">

          {companyInfo?.logo ? (
            <Image
              src={companyInfo.logo.url}
              width={8}
              height={8}
              alt={companyInfo.logo.alt || currentTranslaton?.name || ""}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {currentTranslaton?.name?.charAt(0) ?? "V"}
            </div>
          )}
          <span className="font-semibold ">
            {currentTranslaton?.name ?? dictionary.header.brandFallback}
          </span>
        </Link>
              </div>

        <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-md font-medium hover:text-primary transition",
                title?.toLowerCase() === item.label.toLowerCase()
                  ? "dark:text-orange-600"
                  : "text-primary ",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <HeaderClient locale={locale} dictionary={dictionary} companyInfo={{...company ,...currentTranslaton , logo : logo || undefined}} navItems={navItems} />
      </div>
    </HeaderAniamtion>
  );
}
