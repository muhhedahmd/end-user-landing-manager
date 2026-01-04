import type { Metadata } from "next";
import Header from "@/composnents/Header/header";
import { Fragment } from "react";
import { fetchServices } from "./comp/Fetchers";
import DarkSchema from "@/composnents/DarkShema";

export async function generateMetadata(): Promise<Metadata> {
  const servicesData = await fetchServices({
    skip: 0,
    take: 5,
    isFeatured: true,
  });

  const services = servicesData?.data || [];

  const serviceNames = services.slice(0, 3).map(s => s.name).join(", ");
  const remainingCount = services.length > 3 ? services.length - 3 : 0;

  const description = services.length > 0
    ? `Discover our professional services: ${serviceNames}${remainingCount > 0 ? ` and ${remainingCount} more` : ''}. Expert solutions tailored to drive your business success and growth.`
    : "Explore our comprehensive range of professional services designed to help your business grow and succeed with innovative solutions.";

  const serviceKeywords = services.map(s => s.name.toLowerCase());
  const keywords = [
    "professional services",
    "business solutions",
    "consulting services",
    "enterprise solutions",
    "digital transformation",
    ...serviceKeywords,
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name",
    },
    "serviceType": services.map(s => s.name),
    "areaServed": "Worldwide",
  };

  return {
    title: "Our Services | Professional Business Solutions & Consulting",
    description: description,
    keywords: keywords,

    openGraph: {
      type: "website",
      title: "Our Services | Professional Business Solutions & Consulting",
      description: description,
      siteName: "Your Company Name",
      locale: "en_US",
      url: "/services",
    },

    twitter: {
      card: "summary_large_image",
      title: "Our Services | Professional Business Solutions",
      description: description,
      site: "@yourcompany",
      creator: "@yourcompany",
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
      canonical: "/services",
    },

    other: {
      "structured-data": JSON.stringify(structuredData),
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkSchema>
      <Fragment>
        <Header  border title="services"/>
        {children}
      </Fragment>
    </DarkSchema>
  );
}