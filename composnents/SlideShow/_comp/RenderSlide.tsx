/* eslint-disable @typescript-eslint/no-explicit-any */

import { CompositionType } from "@/types/schema";
import { CompositionPreview } from "./CompositionPreviw";


interface RenderSlidesProps {
  locale: "en" | "ar"
  id: string;
  interval?: number;
  autoPlay: boolean;
  composition: CompositionType;
}


const fetchSlides = async ({
  locale,
  id,
}: {
  locale: "en" | "ar",
  id: string,
}): Promise<any> => {

  let isLoading = true;
  let error = false;
  try {

    isLoading = true;

    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
      `/api/slide-show/get-paginated-slides/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: 1, perPage: 20 }),
      }
    );

    const response = await res.json()
    if (!response.success && !response?.data?.slides) {

      isLoading = false;
      error = true;
      return { isLoading, error };
    }


    const transformed = response.data.slides
      .filter((item: any) => item.isVisible)
      .sort((a: any, b: any) => a.order - b.order)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        ...item.data,
        type: item.type,
        order: item.order,
        id: item.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...item.translation.find((t: any) => t.lang.toUpperCase() === locale.toUpperCase()),
        customTitle: item.customTitle,
        customDescription: item.customDesc,
      }));

    return transformed;
  } catch (err) {

    const _error = err instanceof Error ? err : new Error("Failed to fetch slides");
    isLoading = false;
    error = true;
    throw _error;
  } finally {
    isLoading = false;
  }

}
const RenderSlidesManual = async ({
  locale,
  id,
  interval = 5000,
  autoPlay,
  composition,
}: RenderSlidesProps) => {

  const slides = await fetchSlides({ locale, id })

  return (
    <>
      <CompositionPreview
        interval={interval}
        autoPlay={autoPlay}
        composition={composition}
        slides={slides}

      />



    </>
  );

}
export default RenderSlidesManual
