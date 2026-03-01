
import { ClientWithRelationsSlide, ProjectWithRelationsSlide, ServiceWithImage, slide, TeamMemberWithImage, TestimonialWithImage } from "@/types/schema"
import { memo } from "react"
import { ServiceCard } from "./CardProd/service"
import { ProjectCard } from "./CardProd/project"
import { ClientCard } from "./CardProd/client"
import { TestimonialCard } from "./CardProd/testimonals"
import { TeamMemberCard } from "./CardProd/teamMemeber"

export const TypeToRenderProd = memo(({  lightOpen ,light, idx, play, cube, single, splitcarousel, slide, imaged, minmal, split, index, story }: {
  play?: boolean
  slide: slide,
  splitcarousel?: boolean,
  imaged?: boolean,
  minmal?: boolean,
  split?: boolean,
  index?: number,
  single?: boolean
  cube?: boolean
  story?: boolean,
  idx?: number,
  light?: boolean , 
  lightOpen ?: boolean 
}) => {


  if (slide?.type === "service") {
    return <ServiceCard lightOpen={lightOpen} splitcarousel={splitcarousel} data={slide as ServiceWithImage}   imaged={imaged} story={story || false} />
  }
  if (slide?.type === "project") {
    return <ProjectCard   imaged={imaged}   imagePosition="left" data={slide as ProjectWithRelationsSlide}    split={split} index={index || 0} story={story} />
  }
  if (slide.type === "client") {
    return <ClientCard  imaged={imaged}  story={story}  lightOpen={lightOpen} light={light} single={single} cube={cube} data={slide as ClientWithRelationsSlide} idx={idx} />
  }
  if (slide.type === "testimonial") {
    return <TestimonialCard light={light} data={slide as TestimonialWithImage}  minmal={minmal} />
  }
  if (slide.type === "team") {

    return <TeamMemberCard  splitcarousel={splitcarousel}  data={slide as TeamMemberWithImage}   />
  }
  return <div />
})

TypeToRenderProd.displayName = "TypeToRenderProd"