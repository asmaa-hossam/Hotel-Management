import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
   <Box
  sx={{
    position: "absolute",
    top: 16,
    left: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }}
>
  <CircularProgress size={50} color="primary" />
  <Typography
    sx={{ mt: 2, fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 500 }}
  >
    Loading...
  </Typography>
</Box>

  );
}
