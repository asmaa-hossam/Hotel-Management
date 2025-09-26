import React from 'react'
import CalenderBooking from '../../UsersPortal/Components/UsersShared/CalenderBooking/CalenderBooking'
import Houses from '../../UsersPortal/Components/UsersShared/Houses/Houses'
import Hotels from '../../UsersPortal/Components/UsersShared/Hotels/Hotels'
import Reviews from '../../UsersPortal/Components/UsersShared/Reviews/Reviews'
import MostPopularAds from '../../UsersPortal/Components/UsersShared/MostPopularAds/MostPopularAds'
import Ads from '../../UsersPortal/Components/UsersShared/Ads/Ads'
import LandingPageFooter from '../../Shared/Components/LandingPageFooter/LandingPageFooter'
export default function Home() {
  return (
    <div>
home
<CalenderBooking/>
<MostPopularAds/>
<Houses/>
<Hotels/>
<Ads/>
<Reviews/>
  </div>
  )
}
