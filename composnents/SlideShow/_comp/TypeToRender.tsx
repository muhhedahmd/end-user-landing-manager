import { ClientWithRelationsSlide, ProjectWithRelationsSlide, ServiceWithImage, slide, TeamMemberWithImage, TestimonialWithImage } from "@/types/schema"
import { memo } from "react"
import { ClientCard, ProjectCard, ServiceCard, TeamMemberCard, TestimonialCard } from "./SlideShowCards"

export const TypeToRender = memo(({  splitcarousel , slide, imaged, minmal, split, index, story }: {

  slide: slide,
  splitcarousel?: boolean, 
  imaged?: boolean,
  minmal?: boolean,
  split?: boolean,
  index?: number,
  story?: boolean
}) => {
  console.log(slide)

  if (slide?.type === "service") {
    return <ServiceCard splitcarousel={splitcarousel} data={slide as ServiceWithImage} imaged={imaged} story={story || false} />
  }
  if (slide?.type === "project") {
    return <ProjectCard imagePosition="left" data={slide as ProjectWithRelationsSlide} split={split} index={index || 0} story={story} />
  }
  if (slide.type === "client") {
    return <ClientCard data={slide as ClientWithRelationsSlide} />
  }
  if (slide.type === "testimonial") {
    return <TestimonialCard data={slide as TestimonialWithImage} minmal={minmal} />
  }
  if (slide.type === "team") {

    return <TeamMemberCard data={slide as TeamMemberWithImage} />
  }
  return <div />
})

TypeToRender.displayName = "TypeToRender"