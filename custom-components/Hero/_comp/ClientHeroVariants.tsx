
import { ProductionHero } from '../HeroVariants'
import { IHero, Image } from '@/types/schema'

const ClientHeroVarients = ( { hero , backgroundImage } : { hero : IHero, backgroundImage?: Image }) => {
  return (
     <ProductionHero
            hero={hero}
            backgroundImage={backgroundImage}
        />
  )
}

export default ClientHeroVarients
