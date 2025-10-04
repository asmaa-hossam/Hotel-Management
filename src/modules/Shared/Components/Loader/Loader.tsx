import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
   <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <CircularProgress size={100} color="primary" />
  <Typography
    sx={{ mt: 2, fontFamily: "Poppins, sans-serif", fontSize: "10px", fontWeight: 200 }}
  >
    Loading...
  </Typography>
</Box>

  );
}
