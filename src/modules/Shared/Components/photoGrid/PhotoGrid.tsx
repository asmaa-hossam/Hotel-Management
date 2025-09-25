import { Box, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

type Photo = {
  url: string;
  title: string;
  subtitle: string;
};

type PhotoGridProps = {
  gridTitle: string;
  photos: Photo[];
};

const PhotoGrid = ({ gridTitle, photos }: PhotoGridProps) => {
  return (
    <Box
      sx={{
        width: "1142px",
        height: "305px",
        opacity: 1,
        borderRadius: "15px",
        mx: "auto", 
        overflow:"hidden",
        mb:0,
        textAlign:"left"
      }}
    >
      {/* Title */}
      <Box sx={{ width: "100%", textAlign: "left" }}>      <Typography
        variant="h5"
       sx={{
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "100%",
    letterSpacing: "0%",
    mb: 1,
    color: "#152C5B",
    textAlign: "left",
    ml: 5, 
  }}
      >
        {gridTitle}
      </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"center",
          // width:"1142"
        }}
      >

        <ImageList cols={4} gap={8}>
  {photos.map((photo, index) => (
    <ImageListItem key={index} sx={{ width: 263 }}>
   {((gridTitle == "Houses with beauty backyard" && index == 0) ||(gridTitle == "Hotels with large living room" && index == 3 ) )&&
    <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#FF498B",
          borderBottomLeftRadius: "15px",
          borderTopRightRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600,
          width:"180px",
          height:"40px"
        }}
      >
        <h5  style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "170%",
        letterSpacing: "0%",
        textAlign: "center",
        color: "#fff",
      }}> Popular Choice</h5>
       
      </Box>}
      {/* Photo */}
      <img
        src={photo.url}
        alt={photo.title}
        style={{
          width: "263px",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      {/* Caption */}
      <ImageListItemBar
        position="below"
        title={
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "0%",
              mb: 0.5,
              color: "#152C5B",
              textAlign: "left",
             
            }}
          >
            {photo.title}
          </Typography>
        }
        subtitle={
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: "15px",
              // lineHeight: "100%",
              letterSpacing: "0%",
              color: "#B0B0B0",
              textAlign: "left",
            }}
          >
            {photo.subtitle}
          </Typography>
        }
        sx={{ textAlign: "center" }}
      />
    </ImageListItem>
  ))}
</ImageList>

      </Box>
    </Box>
  );
};


export default PhotoGrid;
