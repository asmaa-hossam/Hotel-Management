import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { stripePromise } from "../../services/stripe";
import PaymentForm from "./StripePaymentForm";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/images/Staycation..svg"

export default function BookingPage() {
  const location = useLocation();
  const { bookingId, totalPrice } = location.state || {};
  console.log(totalPrice);

  return (
    <Box 
      sx={{ 
        margin: "2rem auto",
        width: "100%",
      }}
    >
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
          alt="Staycation Logo" 
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
          sx={{ fontWeight: "bold", marginBottom: "2rem" ,color:"#152C5B"}}
        >
          Complete Your Payment
        </Typography>
        
        {bookingId ? (
          <Elements stripe={stripePromise}>
            <PaymentForm bookingId={bookingId} totalPrice={totalPrice} />
          </Elements>
        ) : (
          <Typography variant="body1" align="center">
            No booking found. Go back and try again.
          </Typography>
        )}
      </Box>
    </Box>
  );
}