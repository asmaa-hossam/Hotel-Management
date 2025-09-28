
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { Box } from "@mui/material";
import { useState,useEffect } from "react";
import { ads_URL } from "../../../../../services/urls";
import axios from "axios";
import UnevenSetsInfinite from '../../UsersShared/slider/customslider'
function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);
  const token = localStorage.getItem("token")

 interface Ad {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  price:string
  rooms:{images:[]}
}
  



 const getAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(ads_URL.GETADS, {
    headers: { Authorization: `${token}` }
})
    console.log("respose",response.data)
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
    
    <Box > 

  <UnevenSetsInfinite slides={ads}/>
   </Box>

 




  );
}

export default Ads;






