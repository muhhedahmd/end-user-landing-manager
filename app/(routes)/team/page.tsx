

import Footer from '@/composnents/Footer/Footer'
import { fetchTeamMembers } from '../services/comp/Fetchers'
import HeroTeam from './_comp/HeroTeam'
import TeamSectionCard from './_comp/TeamSectionCard'



export const dynamic = "force-static"
const page = async () => {
  const TeamMembers = await fetchTeamMembers({
    skip: 0,
    take: 10,
    isFeatured: false
  })
  return (
    <>
      <HeroTeam />

      <div className="  h-screen w-screen bg-transparent flex items-center justify-center p-10 text-center">
      </div>
      <TeamSectionCard TeamMembers={TeamMembers} />
           
      <div className='relative z-1'>


            <Footer/>
      </div>

    </>
  )
}

export default page