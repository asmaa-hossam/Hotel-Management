import React from "react";
import { Container, Box, Typography, Divider } from "@mui/material";
import logo from "../../../../assets/images/Staycation..svg";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation("footer");
  const isRTL = i18n.language === 'ar';

  return (
    <Container sx={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Divider sx={{ borderColor: "#E5E5E5", mb: 4 }} />

      <Grid container spacing={10}>
        {/* Logo + text */}
        <Grid item xs={12} md={4}>
          <Box>
            <img src={logo} alt="Staycation" />
            <Typography
              sx={{
                fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: "16px",
                color: "#B0B0B0",
                mt: 2,
                width: "258px",
                textAlign: isRTL ? "right" : "left"
              }}
            >
              {t("description.line1")}
            </Typography>
            <Typography
              sx={{
                fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: "16px",
                color: "#B0B0B0",
                mt: 2,
                width: "258px",
                textAlign: isRTL ? "right" : "left"
              }}
            >
              {t("description.line2")}
            </Typography>
          </Box>
        </Grid>

        {/* Column 1 */}
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ 
              fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
              fontWeight: 500, 
              color: "#152C5B", 
              mb: 2,
              fontSize: "18px",
              height: "24px",
              textAlign: isRTL ? "right" : "left"
            }}
          >
            {t("forBeginners.title")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("forBeginners.newAccount")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("forBeginners.startBooking")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("forBeginners.usePayments")}
          </Typography>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={6} md={2}>
          <Typography
            sx={{ 
              fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
              fontWeight: 500, 
              color: "#152C5B", 
              mb: 2,
              fontSize: "18px",
              height: "24px",
              textAlign: isRTL ? "right" : "left"
            }}
          >
            {t("exploreUs.title")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("exploreUs.ourCareers")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("exploreUs.privacy")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("exploreUs.termsConditions")}
          </Typography>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} md={3}>
          <Typography
            sx={{ 
              fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
              fontWeight: 500, 
              color: "#152C5B", 
              mb: 2,
              textAlign: isRTL ? "right" : "left"
            }}
          >
            {t("connectUs.title")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("connectUs.email")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("connectUs.phone")}
          </Typography>
          <Typography sx={{ 
            color: "#B0B0B0",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300, 
            mb: 2,
            fontSize: "18px",
            height: "24px",
            textAlign: isRTL ? "right" : "left"
          }}>
            {t("connectUs.address")}
          </Typography>
        </Grid>
      </Grid>

      {/* Footer bottom */}
      <Box sx={{ textAlign: "center", mt: 4, p: 2 }}>
        <Typography
          sx={{
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            color: "#B0B0B0",
          }}
        >
          {t("copyright")}
        </Typography>
      </Box>
    </Container>
  );
}