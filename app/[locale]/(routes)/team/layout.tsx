import type { Metadata } from "next";
import Header from "@/custom-components/Header/header";
import { Fragment } from "react";
import { fetchTeamMembers } from "../services/comp/Fetchers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const _locale = (await params).locale as "en" | "ar" || "en";

  const teamData = await fetchTeamMembers({
    skip: 0,
    take: 5,
    isFeatured: true,
  });

  const teamMembers = teamData?.data || [];

  // Extract translated data based on locale
  const getTranslation = (member: typeof teamMembers[0]) => {
    return (
      member.translation?.find(
        (t) => t?.lang?.toLowerCase() === _locale.toLowerCase()
      ) || member.translation?.[0]
    );
  };

  const translatedMembers = teamMembers.map((member) => ({
    name: getTranslation(member)?.name || "",
    position: getTranslation(member)?.position || "",
    image: member.image?.url || "",
  }));

  const memberNames = translatedMembers
    .slice(0, 3)
    .map((m) => m.name)
    .filter(Boolean)
    .join(_locale === "ar" ? "، " : ", ");

  const remainingCount = teamMembers.length > 3 ? teamMembers.length - 3 : 0;

  // Get featured image (first team member with image, or fallback)
  const featuredImage = translatedMembers.find(m => m.image)?.image || "/images/team-default.jpg";

  // Localized content
  const content = {
    en: {
      title: "Our Team | Meet Our Expert Professionals",
      descriptionPrefix: "Meet our talented team:",
      descriptionMore: "more professionals",
      descriptionSuffix:
        "Experienced experts dedicated to delivering exceptional results and driving innovation.",
      descriptionDefault:
        "Meet our talented team of professionals dedicated to delivering exceptional results and innovative solutions for your business success.",
      keywords: [
        "team",
        "our team",
        "meet the team",
        "professionals",
        "experts",
        "leadership team",
        "company team",
      ],
      siteName: "Your Company Name",
      jobTitleDefault: "Team Member",
      imageAlt: "Our professional team members",
    },
    ar: {
      title: "فريقنا | تعرف على خبرائنا المحترفين",
      descriptionPrefix: "تعرف على فريقنا الموهوب:",
      descriptionMore: "محترفين آخرين",
      descriptionSuffix:
        "خبراء متمرسون ملتزمون بتقديم نتائج استثنائية ودفع عجلة الابتكار.",
      descriptionDefault:
        "تعرف على فريقنا الموهوب من المحترفين الملتزمين بتقديم نتائج استثنائية وحلول مبتكرة لنجاح عملك.",
      keywords: [
        "فريق",
        "فريقنا",
        "تعرف على الفريق",
        "محترفون",
        "خبراء",
        "فريق القيادة",
        "فريق الشركة",
      ],
      siteName: "اسم شركتك",
      jobTitleDefault: "عضو الفريق",
      imageAlt: "أعضاء فريقنا المحترفين",
    },
  };

  const t = content[_locale];

  const description =
    teamMembers.length > 0
      ? `${t.descriptionPrefix} ${memberNames}${
          remainingCount > 0
            ? ` ${_locale === "ar" ? "و" : "and"} ${remainingCount} ${t.descriptionMore}`
            : ""
        }. ${t.descriptionSuffix}`
      : t.descriptionDefault;

  const roleKeywords = translatedMembers
    .map((m) => m.position?.toLowerCase())
    .filter(Boolean);

  const keywords = [...t.keywords, ...roleKeywords];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.siteName,
    employee: translatedMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.position || t.jobTitleDefault,
      image: member.image,
    })),
  };

  return {
    title: t.title,
    description: description,
    keywords: keywords,

    openGraph: {
      type: "website",
      title: t.title,
      description: description,
      siteName: t.siteName,
      locale: _locale === "ar" ? "ar_EG" : "en_US",
      url: `/${_locale}/team`,
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: t.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: description,
      site: "@yourcompany",
      creator: "@yourcompany",
      images: [featuredImage],
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
      canonical: `/${_locale}/team`,
      languages: {
        en: "/en/team",
        ar: "/ar/team",
      },
    },

    other: {
      "structured-data": JSON.stringify(structuredData),
    },
  };
}

export default async function TeamLayout({
params,
  children,
}: {
  params: Promise<{ locale: string }>

  children: React.ReactNode;
}) {
  const _locale = (await params).locale as "en" | "ar"
  return (
      <Fragment>
        <Header locale={_locale} title="Team" border />
        {children}
      </Fragment>
  );
}