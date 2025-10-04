import Slider from "react-slick";
import type { Settings } from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Rating, Typography } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import StarIcon from "@mui/icons-material/Star";
import img1 from "../../../../../assets/images/reviewImg .png";
import img2 from "../../../../../assets/images/review2.jpg";
import { styled } from "@mui/system";
import { useRef } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();
  const reviewData = useMemo(
    () => [
      {
        img: img1,
        title: t("happy_review"),
        rate: (
          <Rating
            name="text-feedback"
            value={5}
            readOnly
            precision={0.5}
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        ),
        comment: t("happy_comment"),
        person: t("happy_person"),
      },
      {
        img: img2,
        title: t("third_review_title"),
        rate: (
          <Rating
            name="text-feedback"
            value={4.5}
            readOnly
            precision={0.5}
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        ),
        comment: t("third_review_comment"),
        person: t("third_person"),
      },
      {
        img: img1,
        title: t("review_title"),
        rate: (
          <Rating
            name="text-feedback"
            value={4}
            readOnly
            precision={0.5}
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        ),
        comment: t("first_review"),
        person: t("first_person"),
      },
      {
        img: img2,
        title: t("second_review_title"),
        rate: (
          <Rating
            name="text-feedback"
            value={5}
            readOnly
            precision={0.5}
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        ),
        comment: t("second_review"),
        person: t("second_person"),
      },
    ],
    [t]
  );

  const sliderRef = useRef<Slider>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const prev = () => {
    sliderRef.current?.slickPrev();
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "50px",
        }}
        id="reviews"
      >
        <Slider {...settings} ref={sliderRef}>
          {reviewData.map((item, index) => (
            <Box key={index}>
              <StyledSlideContainer>
                {/* ************* Left Side - Image ************* */}
                <StyledImageSection>
                  <StyledImgBox>
                    <Box
                      component={"img"}
                      src={item.img}
                      sx={{
                        width: {
                          xs: "240px",
                          sm: "356px",
                          lg: "450px",
                        },
                        height: {
                          xs: "490px",
                          sm: "560px",
                          lg: "550px",
                        },
                        borderRadius: "15px 15px 100px 15px",
                        position: "absolute",
                        top: "40px",
                        left: {
                          xs: "20px",
                          sm: "40px",
                        },
                        zIndex: 10,
                      }}
                    />
                  </StyledImgBox>
                </StyledImageSection>

                {/* ************* Right Side - Content ************* */}
                <StyledContentSection>
                  <StyledBoxContent>
                    <Typography
                      variant="h6"
                      sx={{ 
                        fontWeight: "500", 
                        fontSize: "24px", 
                        color: "#152C5B",
                        marginBottom: "16px"
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box sx={{ marginBottom: "24px" }}>
                      <Box
                        sx={{
                          textAlign: {
                            xs: "center",
                            md: "start",
                          },
                          marginBottom: "12px"
                        }}
                      >
                        {item.rate}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          maxWidth: "595px",
                          fontSize: {
                            xs: "20px",
                            sm: "32px",
                          },
                          color: "#152C5B",
                          lineHeight: 1.4,
                          marginBottom: "16px"
                        }}
                      >
                        {item.comment}
                      </Typography>
                      <StyledPersonText variant="body2">
                        {item.person}
                      </StyledPersonText>
                    </Box>

                    <StyledArrowBox>
                      <ArrowCircleLeftOutlinedIcon
                        onClick={prev}
                        sx={{
                          color: "#203FC7",
                          cursor: "pointer",
                          fontSize: "57px",
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#1a33a8"
                          }
                        }}
                      />
                      <ArrowCircleRightOutlinedIcon
                        onClick={next}
                        sx={{
                          color: "#203FC7",
                          cursor: "pointer",
                          fontSize: "57px",
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#1a33a8"
                          }
                        }}
                      />
                    </StyledArrowBox>
                  </StyledBoxContent>
                </StyledContentSection>
              </StyledSlideContainer>
            </Box>
          ))}
        </Slider>
      </Box>
  
  );
};

export default Reviews;

// Styled Components
const StyledSlideContainer = styled(Box)(({ theme }) => ({
  display: "flex !important",
  flexDirection: "row",
  gap: "60px",
  height: "780px",
  alignItems: "center",
  [theme.breakpoints.down('md')]: {
    flexDirection: "column",
    height: "auto",
    gap: "30px",
  }
}));

const StyledImageSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down('md')]: {
    marginTop: "40px"
  }
}));

const StyledContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down('md')]: {
    padding: "0 2rem",
    textAlign: "center"
  }
}));

const StyledBoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop: "7.9rem", // الـ padding العلوي محافظ عليه كما طلبت
  width: "100%",
  [theme.breakpoints.down('md')]: {
    paddingTop: "2rem",
    textAlign: "center"
  }
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "450px",
  height: "32.8rem",
  borderRadius: "15px",
  position: "relative",
  zIndex: 0,
  [theme.breakpoints.down('lg')]: {
    width: "356px",
    height: "33.8rem"
  },
  [theme.breakpoints.down('sm')]: {
    width: "240px",
    height: "30rem"
  }
}));

const StyledArrowBox = styled(Box)(() => ({
  display: "flex",
  gap: "60px",
  justifyContent: "center",
  marginTop: "32px"
}));

const StyledPersonText = styled(Typography)(() => ({
  color: "#B0B0B0",
  fontWeight: "400",
  fontSize: "18px"
}));