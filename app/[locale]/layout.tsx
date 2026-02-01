import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./heightBreakPoints.css";
import { TimelineProvider } from "@/context/MainLoaderTimeLine";
import { AnalyticsProvider } from "@/providers/analytic-provider";
import { SectionVisibilityProvider } from "@/composnents/contact/SectionVisibilityContext";
import SmoothScrolling from "@/composnents/scroll/smoothScrolling";
import { getCompanyInfo } from "./(routes)/services/comp/Fetchers";
import { locales  } from "@/lib/i18n";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  
  const { locale } = await params

  // Fetch company info
  const companyInfo = await getCompanyInfo()
  if (!companyInfo) return {}

  const { company, logo, translation } = companyInfo

  // Find localized translation if exists
  const localized = translation?.find(
    t => t.lang.toLowerCase() === (locale === "ar" ? "ar" : "en")
  )

  const companyName =
    localized?.name ?? company?.name ?? "Your Company Name"

  const rawTitle =
    localized?.metaTitle ?? `Welcome | ${companyName}`

  const rawDescription =
    localized?.metaDescription ??
    company?.description ??
    "Learn about our company, mission, and values."

  // Limit description to 160 chars for SEO
  const description =
    rawDescription.length > 160
      ? rawDescription.slice(0, 157) + "..."
      : rawDescription

  // Build keywords array
  const keywords = [
    "company",
    "about us",
    "mission",
    "values",
    companyName,
    ...(localized?.metaKeywords
      ? localized.metaKeywords.split(",").map(k => k.trim())
      : []),
  ]

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  // Build OpenGraph images array
  const ogImages = logo?.url
    ? [
        {
          url: logo.url,
          width: logo.width ?? 1200,
          height: logo.height ?? 630,
          alt: logo.alt ?? `${companyName} logo`,
        },
      ]
    : undefined

  return {
    title: rawTitle,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "website",
      title: rawTitle,
      description,
      siteName: companyName,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      url: `/${locale}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: rawTitle,
      description,
      images: logo?.url ? [logo.url] : undefined,
    },
    icons: {
      icon: logo?.url ?? "/favicon.ico",
      shortcut: logo?.url ?? "/favicon.ico",
      apple: logo?.url ?? "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const _locale = (await params).locale as "en" | "ar" || "en"
  if (!locales.includes(_locale)) return notFound()
  const dir = _locale === "ar" ? "rtl" : "ltr"


  return (
    <html lang={_locale} dir={dir}>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          <TimelineProvider>
            <SectionVisibilityProvider>
              <SmoothScrolling>
                <main>{children}</main>
              </SmoothScrolling>
            </SectionVisibilityProvider>
          </TimelineProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}