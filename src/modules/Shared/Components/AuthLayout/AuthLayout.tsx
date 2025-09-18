import { Box, Typography } from "@mui/material";
import Logo from "../../../../assets/images/Staycation..svg";
import { Outlet, useLocation } from "react-router-dom";

// Background images
import loginBg from "../../../../assets/images/Group 33.png";
import registerBg from "../../../../assets/images/register.png";
import forgetPasswordBg from "../../../../assets/images/forget&reset bg.png";
import resetPasswordBg from "../../../../assets/images/forget&reset bg.png";
import defaultBg from "../../../../assets/images/Group 33.png";

export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");

  const getTitleByRoute = () => {
    const path = location.pathname;
    if (path.includes("login")) return "Sign in to Roamhome";
    if (path.includes("register")) return "Sign up to Roamhome";
    if (path.includes("forgetPassword")) return "Forget Password";
    if (path.includes("resetPassword")) return "Reset Password";
    if (path.includes("changepassword")) return "Change Password";
    return "Welcome to Roamhome";
  };

  const getBackgroundImage = () => {
    const path = location.pathname;
    if (path.includes("login")) return loginBg;
    if (path.includes("register")) return registerBg;
    if (path.includes("forgetPassword")) return forgetPasswordBg;
    if (path.includes("resetPassword")) return resetPasswordBg;
    return defaultBg;
  };

  const title = getTitleByRoute();
  const subtitle = "Homes as unique as you.";
  const backgroundImage = getBackgroundImage();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column",lg:'row' },
        minHeight: "100vh",
                 paddingLeft: isLoginPage ? 0 : "20px",
                 paddingTop: isLoginPage ? '20px' : "20px",
                 paddingRight: isLoginPage ? 0 : "20px",

        paddingBottom: isLoginPage ? 0 : "20px",
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

      {/* Left side - Image */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
          minHeight: { xs: "300px", md: "auto" },
          display: "block",
          // paddingTop: "10px",
          marginBottom: isLoginPage ? 0 : "40px",
 
          borderBottomLeftRadius: isLoginPage ? 0 : "20px",
          borderBottomRightRadius: isLoginPage ? 0 : "20px",
          borderTopLeftRadius: isLoginPage ? 0 : "20px",
          borderTopRightRadius: isLoginPage ? 0 : "20px",
        }}
      >
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
              maxWidth: isLoginPage ? "376px" : "455px",
               
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
