

import { ServiceWithImage, TeamMemberWithImage } from "@/types/schema";
import { PaginatedResponse } from "@/types/services";


export const fetchServices = async ({

  skip,
  take,
  isFeatured,
}: {
  skip: number;
  take: number;
  isFeatured: boolean;
}): Promise<PaginatedResponse<ServiceWithImage> | null> => {
  try {
    const params = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
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

export const fetchTeamMembers = async ({
  skip,
  take,
  isFeatured,
}: {
  skip: number;
  take: number;
  isFeatured: boolean;
}): Promise<PaginatedResponse<TeamMemberWithImage> | null> => {
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
