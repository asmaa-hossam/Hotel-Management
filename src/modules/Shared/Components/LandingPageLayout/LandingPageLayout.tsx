import { Box } from "@mui/material";
import LandingPageNavbar from '../LandingPageNavbar/LandingPageNavbar'
import { Outlet } from 'react-router-dom'
import LandingPageFooter from '../LandingPageFooter/LandingPageFooter'

export default function LandingPageLayout() {
  return (
    <>

      
            <Box sx={{  py: 5 }}>
            <LandingPageNavbar/>
    <Outlet/>
    <LandingPageFooter/>
        </Box>
    </>
  )
}
