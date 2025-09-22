// src/pages/NotFound/NotFound.tsx
import { Box,  Typography} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/Staycation..svg";

export default function NotFound() {
  // const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        minHeight: "100vh",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, md: 0 },
        fontFamily: "Poppins, sans-serif",
        background: "#ffffff32",
        backgroundImage: { xs: "none", md: "url('/img.svg')" },
        backgroundSize: "contain",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: 500 },
          textAlign: { xs: "center", md: "left" },
          p: { xs: 2, sm: 3 },
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: { xs: "180px", sm: "225px" },
            mb: { xs: 4, sm: 6, md: 8 },
            mx: { xs: "auto", md: "0" },
            display: "block",
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
            fontWeight: 700,
            color: "#222",
            lineHeight: 1.1,
          }}
        >
          Oops.
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            mt: 1,
            mb: { xs: 2, sm: 3 },
            lineHeight: 1.2,
          }}
        >
          <Box component="span" sx={{ color: "#2F49D1", fontWeight: "bold" }}>
            Page
          </Box>{" "}
          not found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#555",
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
          }}
        >
          This page doesn't exist or was removed! <br />
          We suggest you go back to home.
        </Typography>

        {/* <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#2F49D1",
            color: "white",
            px: 3,
            py: 1.5,
            borderRadius: "8px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            "&:hover": { backgroundColor: "#324fe0ff" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <i className="fa fa-arrow-left me-2"></i> Back 
        </Button> */}
      </Box>
    </Box>
  );
}