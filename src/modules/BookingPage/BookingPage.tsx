import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { stripePromise } from "../../services/stripe";
import PaymentForm from "./StripePaymentForm";
import { Box, Typography, Button } from "@mui/material";
import logo from "../../assets/images/Staycation..svg";
import { useTranslation } from "react-i18next";

export default function BookingPage() {
  const location = useLocation();
  const { bookingId, totalPrice } = location.state || {};
  const { t, i18n } = useTranslation("booking");
  
  const isRTL = i18n.language === 'ar';
  console.log(totalPrice);

  // Language switcher handler
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box 
      sx={{ 
        margin: "2rem auto",
        width: "100%",
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      {/* Language Switcher Buttons */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: 1, 
          mb: 2,
          px: 2,
          flexDirection: isRTL ? "row-reverse" : "row"
        }}
      >
        <Button
          onClick={() => switchLanguage('en')}
          variant={i18n.language === 'en' ? "contained" : "outlined"}
          size="small"
          sx={{
            minWidth: '60px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: i18n.language === 'en' ? '600' : '400',
            borderRadius: '20px',
          }}
        >
          EN
        </Button>
        
        <Button
          onClick={() => switchLanguage('ar')}
          variant={i18n.language === 'ar' ? "contained" : "outlined"}
          size="small"
          sx={{
            minWidth: '60px',
            fontFamily: "'Tajawal', sans-serif",
            fontSize: '12px',
            fontWeight: i18n.language === 'ar' ? '600' : '400',
            borderRadius: '20px',
          }}
        >
          AR
        </Button>
      </Box>

      {/* Centered Logo - Full Width */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          width: "100%",
          marginBottom: "2rem", 
          borderBottom: "1px solid black",
          paddingY: "10px"  
        }}
      >
        <img 
          src={logo} 
          alt={t("logoAlt")} 
          style={{ 
            maxWidth: "150px", 
            height: "auto" 
          }}
        />
      </Box>

      {/* Payment Container with maxWidth */}
      <Box
        sx={{
          maxWidth: "500px",
          margin: "0 auto",
          width: "100%",
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          backgroundColor: "white"
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: "bold", 
            marginBottom: "2rem",
            color: "#152C5B",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            textAlign: isRTL ? "right" : "left"
          }}
        >
          {t("paymentTitle")}
        </Typography>
        
        {bookingId ? (
          <Elements stripe={stripePromise}>
            <PaymentForm bookingId={bookingId} totalPrice={totalPrice} />
          </Elements>
        ) : (
          <Typography 
            variant="body1" 
            align="center"
            sx={{ 
              fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
              textAlign: isRTL ? "right" : "left"
            }}
          >
            {t("noBookingFound")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}