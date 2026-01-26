import type { Metadata } from "next";
import Header from "@/composnents/Header/header";
import { Fragment } from "react";
import Footer from "@/composnents/Footer/Footer";
import ContactForm from "@/composnents/contact/ContactForm";
import { getCompanyInfo } from "../services/comp/Fetchers";
import { getDictionary } from "@/lib/i18n";
// import type { Metadata } from "next";



export async function generateMetadata(
 { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params

  const companyInfo = await getCompanyInfo()
  if (!companyInfo) return {}

  const { company, logo, translation } = companyInfo

  const localized = translation.find(
    t => t.lang === (locale === "ar" ? "AR" : "EN")
  )

  const companyName =
    localized?.name ??
    company.name ??
    "Your Company Name"

  const rawDescription =
    localized?.metaDescription ??
    company.description ??
    "Learn about our mission, values, and the story behind our company."

  const description =
    rawDescription.length > 160
      ? rawDescription.slice(0, 157) + "..."
      : rawDescription

  const title =
    localized?.metaTitle ??
    `About Us | ${companyName}`

  const keywords = [
    "about us",
    "company",
    "mission",
    "values",
    companyName,
    ...(localized?.metaKeywords
      ? localized.metaKeywords.split(",")
      : []),
  ]

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  return {
    title,
    description,
    keywords,

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        ar: "/ar/about",
      },
    },

    openGraph: {
      type: "website",
      title,
      description,
      siteName: companyName,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      url: `/${locale}/about`,
      images: logo?.url
        ? [
            {
              url: logo.url,
              width: logo.width ?? 1200,
              height: logo.height ?? 630,
              alt: logo.alt ?? `${companyName} logo`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: logo?.url ? [logo.url] : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  }
}


export default async function AboutLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode;
}) {


  const _locale = (await params).locale as "en" | "ar"
  const dictionary = await getDictionary(_locale)

  return (
    // <DarkSchema>
      <Fragment>
        <Header locale={_locale} title="about" border />
        {children}
        <ContactForm dictionary={dictionary} />
        <Footer locale={_locale} dictionary={dictionary} />
      </Fragment>
    // </DarkSchema>
  );
}