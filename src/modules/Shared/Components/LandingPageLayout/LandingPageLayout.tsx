import React from 'react'
import LandingPageNavbar from '../LandingPageNavbar/LandingPageNavbar'
import { Outlet } from 'react-router-dom'
import LandingPageFooter from '../LandingPageFooter/LandingPageFooter'

export default function LandingPageLayout() {
  return (
    <>
    <LandingPageNavbar/>
    <Outlet/>
    <LandingPageFooter/>
      
    </>
  )
}
