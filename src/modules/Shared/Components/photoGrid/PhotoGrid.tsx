// import { Box, Typography } from "@mui/material";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";

// type Photo = {
//   url: string;
//   title: string;
//   subtitle: string;
// };

// type PhotoGridProps = {
//   gridTitle: string;
//   photos: Photo[];
// };

// const PhotoGrid = ({ gridTitle, photos }: PhotoGridProps) => {
//   return (
//     <Box
//       sx={{
//         width: "1142px",
//         height: "305px",
//         opacity: 1,
//         borderRadius: "15px",
//         mx: "auto", 
//         overflow:"hidden",
//         mb:0,
//         textAlign:"left"
//       }}
//     >
//       {/* Title */}
//       <Box sx={{ width: "100%", textAlign: "left" }}>     
//          <Typography
//         variant="h5"
//        sx={{
//     fontFamily: "Poppins, sans-serif",
//     fontWeight: 600,
//     fontSize: "24px",
//     lineHeight: "100%",
//     letterSpacing: "0%",
//     mb: 1,
//     color: "#152C5B",
//     textAlign: "left",
//     ml: 5, 
//   }}
//       >
//         {gridTitle}
//       </Typography>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent:"center",
//           // width:"1142"
//         }}
//       >

//         <ImageList cols={4} gap={8}>
//   {photos.map((photo, index) => (
//     <ImageListItem key={index} sx={{ width: 263 }}>
//    {((gridTitle == "Houses with beauty backyard" && index == 0) ||(gridTitle == "Hotels with large living room" && index == 3 ) )&&
//     <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           right: 0,
//           backgroundColor: "#FF498B",
//           borderBottomLeftRadius: "15px",
//           borderTopRightRadius: "15px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "white",
//           fontWeight: 600,
//           width:"180px",
//           height:"40px"
//         }}
//       >
//         <h5  style={{
//         fontFamily: "Poppins, sans-serif",
//         fontWeight: 500,
//         fontSize: "16px",
//         lineHeight: "170%",
//         letterSpacing: "0%",
//         textAlign: "center",
//         color: "#fff",
//       }}> Popular Choice</h5>
       
//       </Box>}
//       {/* Photo */}
//       <img
//         src={photo.url}
//         alt={photo.title}
//         style={{
//           width: "263px",
//           height: "180px",
//           objectFit: "cover",
//           borderRadius: "8px",
//         }}
//       />

//       {/* Caption */}
//       <ImageListItemBar
//         position="below"
//         title={
//           <Typography
//             sx={{
//               fontFamily: "Poppins, sans-serif",
//               fontWeight: 400,
//               fontSize: "20px",
//               lineHeight: "100%",
//               letterSpacing: "0%",
//               mb: 0.5,
//               color: "#152C5B",
//               textAlign: "left",
             
//             }}
//           >
//             {photo.title}
//           </Typography>
//         }
//         subtitle={
//           <Typography
//             sx={{
//               fontFamily: "Poppins, sans-serif",
//               fontWeight: 300,
//               fontSize: "15px",
//               // lineHeight: "100%",
//               letterSpacing: "0%",
//               color: "#B0B0B0",
//               textAlign: "left",
//             }}
//           >
//             {photo.subtitle}
//           </Typography>
//         }
//         sx={{ textAlign: "center" }}
//       />
//     </ImageListItem>
//   ))}
// </ImageList>

//       </Box>
//     </Box>
//   );
// };


// export default PhotoGrid;
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
