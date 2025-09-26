import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900-1200

  // Determine columns based on screen size
  let cols = 4;
  if (isMd) cols = 3;
  if (isSm) cols = 2;
  if (isXs) cols = 1;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: 2,
        py: 2,
        borderRadius: 3,
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: { xs: "20px", sm: "22px", md: "24px" },
          mb: 2,
          color: "#152C5B",
        }}
      >
        {gridTitle}
      </Typography>

      {/* Image List */}
      <ImageList cols={cols} gap={16}>
        {photos.map((photo, index) => (
          <ImageListItem key={index}>
            {((gridTitle === "Houses with beauty backyard" && index === 0) ||
              (gridTitle === "Hotels with large living room" && index === 3)) && (
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
                  width: { xs: "120px", sm: "150px", md: "180px" },
                  height: { xs: "30px", sm: "35px", md: "40px" },
                  zIndex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    color: "#fff",
                  }}
                >
                  Popular Choice
                </Typography>
              </Box>
            )}

            <img
              src={photo.url}
              alt={photo.title}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "263 / 180", // maintains image ratio
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            <ImageListItemBar
              position="below"
              title={
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    color: "#152C5B",
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
                    fontSize: { xs: "12px", sm: "14px", md: "15px" },
                    color: "#B0B0B0",
                  }}
                >
                  {photo.subtitle}
                </Typography>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default PhotoGrid;
