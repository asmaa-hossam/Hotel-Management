
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { Box, Typography, Container } from "@mui/material";
import CustomSlider from '../../UsersShared/slider/customslider'
import { useState,useEffect } from "react";
import { ads_URL } from "../../../../../services/urls";
import axios from "axios";

function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);


 interface Ad {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  price:string
}

 const getAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(ads_URL.GETADS);
    console.log("resposeeeeeeeee",response.data)
    return response?.data?.data?.ads || [];
  } catch (error) {
    console.error("Failed to fetch ads:", error);
    return [];
  }
};

useEffect(() => {
    const fetchAds = async () => {
      const adsData = await getAds(); 
      setAds(adsData);    };
    fetchAds();
  }, []);


  return (
    <Container maxWidth="lg"  sx={{ mt: 4 }}>
    
    <Box sx={{ }}> 
  <Typography
    variant="h5"
    sx={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: "24px",
      letterSpacing: "0%",
      color: "#152C5B",
      pl:5,
      textAlign: "left",
    }}
  >
    Ads
  </Typography>

  {/* Slider */}
  <CustomSlider slides={ads}/>
</Box>

    </Container>




  );
}

export default Ads;

