import React from "react";
import { Box, Typography } from "@mui/material";
import myImage from "../../../../assets/images/Group 33.png";
import Logo from "../../../../assets/images/Staycation..svg";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();

  // Function to return title based on route
  const getTitleByRoute = () => {
    const path = location.pathname;
    if (path.includes("login")) return "Sign in to Roamhome";
    if (path.includes("register")) return "Sign up to Roamhome";
    if (path.includes("forgetPassword")) 
      return "Forget Password";
    if (path.includes("resetPassword")) 
      return "Reset Password";
    if (path.includes("change-password")) return "Change Password";
    return "Welcome  to Roamhome";
  };

  const title = getTitleByRoute();
  const subtitle = "Homes as unique as you."; // same for all routes

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      {/* Right side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          bgcolor: "background.paper",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            width: { xs: "120px", sm: "148px" },
            height: "auto",
            mb: 3,
            alignSelf: "flex-start",
          }}
        />

        {/* Outlet for nested routes */}
        <Box
          sx={{
            height: "auto",
            mb: 2,
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Left side - Image with bottom text overlay */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          backgroundImage: `url(${myImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "300px", md: "auto" },
          display: "block",
          paddingTop: "20px",
        }}
      >
        {/* Text overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: 0,
            width: "100%",
            color: "#fff",
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              maxWidth: "435px",
              fontWeight: 400,
              lineHeight: 1.2,
              mb: 2,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: "380px",
              fontWeight: "500",
              color: "#ffffffff",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
