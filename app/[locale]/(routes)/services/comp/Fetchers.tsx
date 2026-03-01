

import { CompanyInfo, Image, ServiceWithImage, TeamMember, TeamMemberTranslation } from "@/types/schema";
import { PaginatedResponse } from "@/types/services";


export const fetchServices = async ({
  langEnd,
  skip,
  take,
  isFeatured,
}: {
  langEnd: "EN" | "AR",
  skip: number;
  take: number;
  isFeatured: boolean;
}): Promise<PaginatedResponse<ServiceWithImage> | null> => {
  try {
    const params = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
      langEnd: langEnd,
      Active: "true",
      isFeatured: isFeatured.toString(),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/services?${params.toString()}`,
      {
        cache: "force-cache",

        next: { revalidate: 3600 },

      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface teamMemberResponse {
  teamMember: TeamMember,
  image: Image,
  translation: TeamMemberTranslation[]
}



export const fetchTeamMembers = async ({



  skip,
  take,
  isFeatured,
}: {
  skip: number;
  take: number;
  isFeatured: boolean;
}): Promise<PaginatedResponse<{
  teamMember: TeamMember,
  image: Image,
  translation: TeamMemberTranslation[]
}> | null> => {
  try {
    const params = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
      // Active: "true",
      isFeatured: isFeatured.toString(),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL

      }/api/team/active?${params.toString()}`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },

      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};



export async function getCompanyInfo(): Promise<{
  company: CompanyInfo,
  translation: {
    name: string,
    tagline: string,
    description: "",
    footerText: "",
    metaTitle: string
    metaDescription: string
    metaKeywords: string,
    lang: "AR" | "EN"
  }[]
  logo: Image | null
} | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/company-info", {
      cache: "no-store",
      next: { revalidate: 0 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error("Failed to fetch company info:", res.status);
      return null;
    }

    const json = await res.json();
    return json?.data ?? null;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}
