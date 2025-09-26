
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";



// Random title/subtitle
const getRandomTitle = () => {
  const titles = ["PS Wood", "One Five", "Hot Deal", "Minimal", "Green Park", "Podo Wae", "Silver Rain", "Cashville"];
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
    "Kemang, Indonesia",
  ];
  return subtitles[Math.floor(Math.random() * subtitles.length)];
};


type UnevenSetsInfiniteProps = {
  slides: string[];
};
 function UnevenSetsInfinite({ slides }: UnevenSetsInfiniteProps)  {

    const slidesWithRandomText = slides.map((slide:any) => ({
    ...slide,
    title: getRandomTitle(),
    subtitle: getRandomSubtitle(),
  }));
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
        

      { breakpoint: 1200, settings: { slidesToShow: 4, arrows: true } },
      { breakpoint: 900, settings: { slidesToShow: 3, arrows: true } },
      {breakpoint: 768,settings: { slidesToShow: 2, arrows: true },},
      { breakpoint: 600, settings: { slidesToShow: 1, arrows: true } },
    ],
  };
  return (
     <Box  sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: 5,
        py: 5,
        borderRadius: 3,
        overflow: "hidden",
        textAlign: "left",
        ".slick-prev:before, .slick-next:before": {
          color: "#ffff",   
          fontSize: "30px",
        },
      }}>
         <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: 2,
        borderRadius: 3,
        overflow: "hidden",
        textAlign: "left",
      }}
    >
              <Typography
    variant="h5"
    sx={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: "24px",
      letterSpacing: "0%",
      color: "#152C5B",
      textAlign: "left",
    }}
  >
    Ads
  </Typography>
    </Box>
   
     <Slider {...settings}>
        {slidesWithRandomText.map((slide:any) => (
          <Box
            key={slide.id}
            sx={{
              p: 1,
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "1500px",
              height: "305px",
          
            }}
          >
            
            {/* Image */}
            <Box
              component="img"
              src={slide.room.images}
              alt={slide.title}
              sx={{
                width: "95%",
                height: { xs: 150, sm: 180, md: 200 },
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
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                lineHeight: 1.2,
                color: "#152C5B",
                mb: 0.5,
              }}
            >
              {slide.title}
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: { xs: "12px", sm: "14px", md: "15px" },
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
}

export default UnevenSetsInfinite;
