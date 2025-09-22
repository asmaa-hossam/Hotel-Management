import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"   
      justifyContent="center"
      height="100%"
      minHeight="200px"
      px={4} 
    >
      <CircularProgress size={80} color="primary" /> 
      <Typography 
        sx={{ mt: 2, fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 500 }}
      >
        Loading...
      </Typography>
    </Box>
  );
}
