

import Footer from '@/composnents/Footer/Footer'
import { fetchTeamMembers } from '../services/comp/Fetchers'
import HeroTeam from './_comp/HeroTeam'
import TeamSectionCard from './_comp/TeamSectionCard'
import { getDictionary } from '@/lib/i18n'



export const dynamic = "force-static"
const page = async ({
  params
}: {
  params: Promise<{ locale: "en" | "ar" }>

}) => {
  const _locale = (await params).locale || "en"
  const dictionary = await getDictionary(_locale)

  const TeamMembers = await fetchTeamMembers({
    // langEnd : _locale?.toUpperCase() || "EN",
    skip: 0,
    take: 10,
    isFeatured: false
  })
  return (
    <>
      <HeroTeam  title={dictionary.teamPage.hero.description}/>

      <div className="  h-screen w-screen bg-transparent flex items-center justify-center p-10 text-center">
      </div>
      <TeamSectionCard locale={_locale} dictionary={dictionary} TeamMembers={TeamMembers} />

      <div className='relative z-1'>


        <Footer locale={_locale} dictionary={dictionary} />
      </div>

    </>
  )
}

export default page