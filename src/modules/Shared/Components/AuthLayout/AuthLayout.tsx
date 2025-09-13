import { Box, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import myImage from "../../../../assets/images/Rectangle 7.png";
import logo from "../../../../assets/images/Staycation..svg";
import Login from "../../../Authontication/Components/Login/Login";

export default function AuthLayout() {
  const location = useLocation();
  
  // Text in img depend in route of pages
  const getHeaderText = () => {
    if ( location.pathname.includes("login")) {
      return "Sign up to Roamhome";
    } else if (location.pathname.includes("forgot-password")) {
      return "Forgot password";
    }else if (location.pathname.includes("changePassword")) {
      return "Change password";
    } else if (location.pathname.includes("resetPassword")) {
      return "Reset password";
    }else {
      return "Sign in to Roamhome";
    }
  };

  const getSubText = () => {
    if (location.pathname.includes("signup") || location.pathname.includes("register")) {
      return "Join our community today.";
    } else if (location.pathname.includes("forgot-password")) {
      return "We'll help you get back in.";
    } else {
      return "Homes as unique as you.";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        height: "100vh",
        margin: 0,
        overflow: "hidden", 
      }}
    >
      {/* Form Section */}
    <Box
  sx={{
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: { xs: "100%", md: "50%" },
    // height: "70%",  
    padding: { xs: 2, md: 4 },
    overflowY: "auto", // allow scroll if content is taller
  }}
>

        {/* Logo */}
        <Box
          sx={{
            width: "100%",
            height: '15%',
            paddingTop: { xs: 1, md: 1 },
            paddingBottom: 3,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={logo}
            alt="Staycation Logo"
            style={{
              maxWidth: "148px",
              maxHeight: "39px",
              height: "auto",
            }}
          />
        </Box>

        {/* Form content */}
        <Box sx={{ width: "100%"  }}>
          
          <Login />
        </Box>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          width: { xs: "100%", md: "50%" },
          height: { xs: "40vh", md: "100%" },
          order: { xs: -1, md: 1 },
          position: "relative",
        }}
      >
        <img
          src={myImage}
          alt="Auth Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block", 
            paddingTop: '49px',
          }}
        />

        {/* Overlay Text */}
        <Box
          sx={{
            position: "absolute",
            top: "80%",
            left: "50%",
            height: '80px',
            width: '100%',
            transform: "translate(-50%, -50%)",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            textAlign: "left",
            maxWidth: { xs: "80%", sm: "70%", md: "70%" },
          }}
        >
          <Typography
            component="h3"
            sx={{
              margin: 0,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "24px", sm: "32px", md: "40px" },
              lineHeight: 1.2,
              letterSpacing: "1px",
            }}
          >
            {getHeaderText()}
          </Typography>

          <Typography
            component="p"
            sx={{
              margin: 0,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "18px", md: "20px" },
              letterSpacing: "1px",
            }}
          >
            {getSubText()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}