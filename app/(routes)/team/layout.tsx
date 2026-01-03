import type { Metadata } from "next";
import DarkSchema from "@/composnents/DarkShema";
import Header from "@/composnents/Header/header";
import { Fragment } from "react";
import { fetchTeamMembers } from "../services/comp/Fetchers";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch top 5 featured team members for metadata
  const teamData = await fetchTeamMembers({
    skip: 0,
    take: 5,
    isFeatured: true,
  });

  const teamMembers = teamData?.data || [];
  
  const memberNames = teamMembers.slice(0, 3).map(m => m.name).join(", ");
  const remainingCount = teamMembers.length > 3 ? teamMembers.length - 3 : 0;
  
  const description = teamMembers.length > 0
    ? `Meet our talented team: ${memberNames}${remainingCount > 0 ? ` and ${remainingCount} more professionals` : ''}. Experienced experts dedicated to delivering exceptional results and driving innovation.`
    : "Meet our talented team of professionals dedicated to delivering exceptional results and innovative solutions for your business success.";

  const roleKeywords = teamMembers
    .map(m => m.position?.toLowerCase())
    .filter(Boolean);
  
  const keywords = [
    "team",
    "our team",
    "meet the team",
    "professionals",
    "experts",
    "leadership team",
    "company team",
    ...roleKeywords,
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    "employee": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.position || "Team Member",
      "image": member.image?.url || "",
    })),
  };

  return {
    title: "Our Team | Meet Our Expert Professionals",
    description: description,
    keywords: keywords,
    
    openGraph: {
      type: "website",
      title: "Our Team | Meet Our Expert Professionals",
      description: description,
      siteName: "Your Company Name",
      locale: "en_US",
      url: "/team",
    },

    twitter: {
      card: "summary_large_image",
      title: "Our Team | Meet Our Expert Professionals",
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
      canonical: "/team",
    },

    other: {
      "structured-data": JSON.stringify(structuredData),
    },
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
        <Header title="Team" border />
        {children}
      </Fragment>
    </DarkSchema>
  );
}