// src/components/CustomSlider.tsx
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

interface Slide {
 id: number;
 url:string
 title: string;
 subtitle?: string;
}


 interface Ad {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  price:string
}

interface CustomSliderProps {
  slides: Ad[]; // array of ads passed as props
}


const getRandomTitle = () => {
  const titles = ["PS Wood", "One Five", "Hot Deal", "Minimal", "Green Park", "Podo Wae","Silver Rain","Cashville"];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomSubtitle = () => {
  const subtitles = [
    "Depok, Indonesia",
    "Jakarta, Indonesia",
    "Wonosobo, Indonesia",
    "Tangerang, Indonesia",
    "Madiun, Indonesia",
    "Bandung, Indonesia",
    "Kemang, Indonesia"
  ];

  return subtitles[Math.floor(Math.random() * subtitles.length)];
};


const CustomSlider: React.FC<CustomSliderProps> = ({ slides }) => {

      const slidesWithRandomText = slides.map((slide:any) => ({
  ...slide,
  title: getRandomTitle(),
  subtitle: getRandomSubtitle(),
}));


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,

   responsive: [
  {
    breakpoint: 1024,
    settings: { slidesToShow: 2, arrows: true },
  },
  {
    breakpoint: 768,
    settings: { slidesToShow: 1, arrows: true },
  },
]

  };

  

  return (


    <Box sx={{}}>
      <Slider {...settings}>
        {slidesWithRandomText.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              borderRadius: 4,
              width: "1142px",
              height: "305px",
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            //   p: 1, 
              opacity: 1,
              mx: "auto", 
          
              overflow: "hidden", 
   
            }}

            
          >
            {/* Image */}
            <Box
              component="img"
              src={slide.room.images}
              alt={slide.title}
              sx={{
                width: "95%",
                height: 200,
                objectFit: "cover",
                borderRadius: 4,
                mb: 1,
              }}
            />

            {/* Title */}
            
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: 1.2,
                letterSpacing: "0%",
                color: "#152C5B",
                mb: 0.5,
                testalignment:"left"
              }}
            >
              {slide.title}
            </Typography>
             <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: 1.2,
                letterSpacing: "0%",
                color: "#152C5B",
                mb: 0.5,
                testalignment:"left",
            
              }}
            >
              {slide.title}
            </Typography>
             </Box>
            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: "15px",
                color: "#B0B0B0",
              }}
            >
              {slide.subtitle}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>

  );
};

export default CustomSlider;
