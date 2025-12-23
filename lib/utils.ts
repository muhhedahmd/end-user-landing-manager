import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const mockSlides  = [
    {
      id: 1,
      title: "Slide 1",
      description: "Description for Slide 1",
    },
    {
      id: 2,
      title: "Slide 2",
      description: "Description for Slide 2",
    },
    {
      id: 3,
      title: "Slide 3",
      description: "Description for Slide 3",
    },
    {
      id: 34,
      title: "Slide 4",
      description: "Description for Slide 3",
    },
    {
      id: 5,
      title: "Slide 5",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
    {
      id: 6,
      title: "Slide 6",
      description: "Description for Slide 3",
    },
  ]