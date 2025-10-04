import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation("auth");
  const isRTL = i18n.language === "ar";

  const getTitleByRoute = () => {
    const path = location.pathname;
    if (path.includes("login")) return t("signIn");
    if (path.includes("register")) return t("signUp");
    if (path.includes("forgetPassword")) return t("forgetPassword");
    if (path.includes("resetPassword")) return t("resetPassword");
    if (path.includes("changepassword")) return t("changePassword");
    return t("welcome");
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
  const subtitle = t("subtitle");
  const backgroundImage = getBackgroundImage();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: isRTL ? "row-reverse" : "row" }, // RTL support
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        padding: { xs: 0, lg: "20px" },
        direction: isRTL ? "rtl" : "ltr", // RTL support
      }}
    >
      {/* Left side - Form */}
      <Box
        sx={{
          flexBasis: { xs: "100%", lg: "50%" },
          flexGrow: 0,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 2, lg: 3 },
          bgcolor: "background.paper",
          boxSizing: "border-box",
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
            alignSelf: isRTL ? "flex-end" : "flex-start",
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

      {/* Right side - Image */}
      <Box
        sx={{
          flexBasis: { xs: "100%", lg: "50%" },
          flexGrow: 0,
          flexShrink: 0,
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "300px", lg: "100vh" },
          borderRadius: isLoginPage ? 0 : "20px",
          boxSizing: "border-box",
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
              maxWidth: isLoginPage ? "600px" : "500px",
              fontWeight: 400,
              lineHeight: 1.2,
              mb: 2,
              textAlign: "left",
              mx: "auto",
              fontFamily: isRTL
                ? "'Tajawal', sans-serif"
                : "Poppins, sans-serif",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: isLoginPage ? "600px" : "500px",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.2,
              textAlign: "left",
              mx: "auto",
              fontFamily: isRTL
                ? "'Tajawal', sans-serif"
                : "Poppins, sans-serif",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
