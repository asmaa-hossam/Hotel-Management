import CalenderBooking from '../../UsersPortal/Components/UsersShared/CalenderBooking/CalenderBooking'
import Houses from '../../UsersPortal/Components/UsersShared/Houses/Houses'
import Hotels from '../../UsersPortal/Components/UsersShared/Hotels/Hotels'
import Reviews from '../../UsersPortal/Components/UsersShared/Reviews/Reviews'
import MostPopularAds from '../../UsersPortal/Components/UsersShared/MostPopularAds/MostPopularAds'
import Ads from '../../UsersPortal/Components/UsersShared/Ads/Ads'
import { Box } from '@mui/material'
export default function Home() {
  return (
    <>
   <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
<CalenderBooking/>
<MostPopularAds/>
<Houses/>
<Hotels/>
<Ads/>
<Reviews/>

  </Box>
   </>
  )
}
