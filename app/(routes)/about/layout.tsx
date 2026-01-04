import type { Metadata } from "next";
import DarkSchema from "@/composnents/DarkShema";
import Header from "@/composnents/Header/header";
import { Fragment } from "react";
import Footer from "@/composnents/Footer/Footer";
import ContactForm from "@/composnents/contact/ContactForm";
import { getCompanyInfo } from "../services/comp/Fetchers";
// import type { Metadata } from "next";



export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await getCompanyInfo();


  const companyName = companyInfo?.name ?? "Your Company Name";
  const companyDescription = companyInfo?.description ?? 
    "Learn about our mission, values, and the story behind our company. Discover what drives us to deliver exceptional results.";
  
  const title = `About Us | ${companyName}`;
  const description = companyDescription.length > 160 
    ? companyDescription.substring(0, 157) + "..." 
    : companyDescription;

  const keywords = [
    "about us",
    "company",
    "mission",
    "values",
    "our story",
    "who we are",
    companyName,
    ...(companyInfo?.metaKeywords ? companyInfo.metaKeywords.split(",") : []),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": companyName,
    "description": description,
    "url": process.env.NEXT_PUBLIC_SITE_URL + "/about",
    ...(companyInfo?.logo?.url && {
      "logo": companyInfo.logo.url,
    }),
  };

  return {
    title: title,
    description: description,
    keywords: keywords,

    openGraph: {
      type: "website",
      title: title,
      description: description,
      siteName: companyName,
      locale: "en_US",
      url: "/about",
      ...(companyInfo?.logo?.url && {
        images: [
          {
            url: companyInfo.logo.url,
            width: companyInfo.logo.width ?? 1200,
            height: companyInfo.logo.height ?? 630,
            alt: companyInfo.logo.alt ?? `${companyName} logo`,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      site: "@yourcompany",
      creator: "@yourcompany",
      ...(companyInfo?.logo?.url && {
        images: [companyInfo.logo.url],
      }),
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

    alternates: {
      canonical: "/about",
    },

    other: {
      "structured-data": JSON.stringify(structuredData),
    },

    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
  };
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkSchema>
      <Fragment>
        <Header title="about" border />
        {children}
        <ContactForm/>
        <Footer/>
      </Fragment>
    </DarkSchema>
  );
}