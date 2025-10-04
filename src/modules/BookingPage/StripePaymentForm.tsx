import { CardElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import axios instance and booking URLs
import { axiosinstance, BASEURLDEV } from "../../services/urls";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PaymentFormProps {
  bookingId: string;
  totalPrice: number;
}

export default function PaymentForm({ bookingId }: PaymentFormProps) {
    const { t, i18n } = useTranslation("booking");
  
  const isRTL = i18n.language === 'ar';
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  // API call to pay booking
  const payBooking = async (bookingId: string, token: string) => {
    try {
      const res = await axiosinstance.post(
        `${BASEURLDEV}/api/v0/portal/booking/${bookingId}/pay`,
        { token },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Payment response:", res.data);
    } catch (error: any) {
      console.error("Payment API error:", error.response?.data || error.message);
    }
  };

  // Handle payment submit
  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;
    setLoading(true); 
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setErrorMessage(error.message || "Payment failed");
      toast.error(error.message || "Payment failed ❌");
      setLoading(false); 
      return;
    }

    if (token) {
      console.log("Stripe Token:", token.id);
      setLoading(true); 
      try {
        await payBooking(bookingId, token.id);
        setSuccess(true);
        navigate("/dashboard");

        setErrorMessage(null);
        toast.success("Payment Successful! 🎉");
      } catch {
        toast.error("Payment request failed ❌");
      } finally {
        setLoading(false); // stop loading
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handlePayment}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {success && <Alert severity="success">Payment Successful! 🎉</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      {/* <Typography variant="h6" color="#152C5B"> Total Payment:  ${totalPrice}</Typography> */}

      {/* Card Field */}
      <Box
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "8px",
        }}
      >
        <CardElement options={{ hidePostalCode: true }} />
      </Box>

      {/* Address Field */}
      <Box
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "8px",
        }}
      >
        <AddressElement options={{ mode: "billing" }} />
      </Box>

            <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{ 
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
          height: "48px"
        }}
      >
        {loading ? t("payment.processing") : t("payment.payNow")}
      </Button>
        <Button
        type="button"  
        sx={{ 
          border: "1px black solid",
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
          height: "48px"
        }}
        color="inherit"
        onClick={() => navigate("/")}
      >
        {t("payment.cancel")}
      </Button>
    </Box>
  );
}
