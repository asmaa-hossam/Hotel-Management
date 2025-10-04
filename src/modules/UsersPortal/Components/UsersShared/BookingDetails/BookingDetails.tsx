import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
  Alert,
  Modal,
} from "@mui/material";
import DatePicker from "../CalenderBooking/DatePicker";
import { useState } from "react";
import { useAuthContext } from "../../../../../Context/Context";
import { axiosinstance, BOOKINGG_USER_URL } from "../../../../../services/urls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const CustomBox = styled(Box)({
  borderRadius: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E8ECF4",
  padding: "32px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #3252DF 0%, #1ABC9C 100%)",
  },
});

const PriceContainer = styled(Box)({
  background: "linear-gradient(135deg, #f8fdfc 0%, #f0fdf9 100%)",
  borderRadius: "16px",
  padding: "20px",
  marginTop: "16px",
  marginBottom: "24px",
  border: "1px solid #d1fae5",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)",
    borderRadius: "50%",
    opacity: 0.1,
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};
const DateSection = styled(Box)({
  marginTop: "32px",
  marginBottom: "24px",
  "& .date-picker-wrapper": {
    border: "2px solid #E8ECF4",
    borderRadius: "12px",
    padding: "16px",
    marginTop: "12px",
    transition: "all 0.3s ease",
     textAlign: "right",
    "&:hover": {
      borderColor: "#3252DF",
      boxShadow: "0 0 0 3px rgba(50, 82, 223, 0.1)",
    },
    "&.error": {
      borderColor: "#FF1612",
      boxShadow: "0 0 0 3px rgba(255, 22, 18, 0.1)",
    },
  },
});

const PaymentSummary = styled(Box)({
  background: "linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%)",
  borderRadius: "12px",
  padding: "20px",
  marginTop: "24px",
  marginBottom: "32px",
  border: "1px solid #e0e7ff",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  marginBlock: "1rem",
  marginInline: "auto",
  background: "linear-gradient(135deg, #3252DF 0%, #4f6de6 100%)",
  width: "100%",
  height: "56px",
  borderRadius: "16px",
  textTransform: "none",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "600",
  boxShadow: "0 8px 24px rgba(50, 82, 223, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #2a47cc 0%, #4760d9 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 32px rgba(50, 82, 223, 0.4)",
  },
  "&:active": {
    transform: "translateY(0px)",
  },
  "&.Mui-disabled": {
    background: "linear-gradient(135deg, #949fcf 0%, #a8b3d9 100%)",
    color: "#c0c0c0",
    boxShadow: "none",
  },
});

export default function BookingDetails({
  roomId,
  totalPrice,
  capacity,
}: {
  roomId: string;
  totalPrice: number;
  capacity: number;
}) {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }>({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { loginData } = useAuthContext();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const numBookingDays =
    dateRange.startDate && dateRange.endDate
      ? Math.ceil(
          (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
            (1000 * 60 * 60 * 24) +
            1
        )
      : 0;

  const handleButtonClick = async () => {
    try {
      setError(""); // Clear previous errors

      if (!dateRange.startDate || !dateRange.endDate) {
        setError("Please select both start and end dates to proceed.");
        return;
      }

      setIsSubmitting(true);

      if (loginData?.role === "user") {
        let res = await axiosinstance.post(BOOKINGG_USER_URL.CREATE_BOOKING, {
          room: roomId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          totalPrice,
        });

        console.log(res);

        if (res.status === 201) {
          toast.success(res?.data?.message || "Booking created successfully");
        }

        navigate(`/booking/${roomId}/userInfo`, {
          state: { bookingId: res?.data?.data?.booking._id },
        });
      } else {
        handleOpen();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong, try again"
      );
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const { t, i18n } = useTranslation("booking");
  
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <CustomBox sx={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Typography sx={{
          color: "#152C5B",
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "8px",
          textAlign: "center",
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
        }}>
          {t("bookingDetails.title")}
        </Typography>

           <Typography sx={{
          color: "#8B95A7",
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "16px",
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
        }}>
          {t("bookingDetails.subtitle")}
        </Typography>
 <PriceContainer>
          <Typography sx={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#1ABC9C",
            textAlign: "center",
            marginBottom: "8px",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
          }}>
            ${totalPrice}{" "}
            <span style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#8B95A7"
            }}>
              {t("perNight")}
            </span>
          </Typography>
          
          <Typography sx={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#FF1612",
            textAlign: "center",
            background: "rgba(255, 22, 18, 0.1)",
            padding: "4px 12px",
            borderRadius: "20px",
            display: "inline-block",
            width: "fit-content",
            margin: "0 auto",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
          }}>
            🎉 {t("discountText")}
          </Typography>
        </PriceContainer>


             <DateSection>
          <Typography sx={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#152C5B",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            
          }}>
            📅 {t("selectDates")}
          </Typography>

          <Box className={`date-picker-wrapper ${error ? "error" : ""}`}>
            <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                borderRadius: "12px",
                "& .MuiAlert-message": {
                  fontSize: "14px",
                  fontWeight: "500",
                },
              }}
            >
              {error}
            </Alert>
          )}
        </DateSection>

        <PaymentSummary>
                <Typography sx={{
            color: "#8B95A7",
            fontWeight: "500",
            fontSize: "16px",
            marginBottom: "8px",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
          }}>
            {t("totalAmount")}
          </Typography>

          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#152C5B",
              marginBottom: "4px",
            }}
          >
            ${totalPrice * numBookingDays}
          </Typography>

           <Typography sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#8B95A7",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
          }}>
            {t("bookingSummary", { 
              capacity, 
              nights: numBookingDays,
              context: capacity > 1 ? "plural" : "singular",
              nightContext: numBookingDays !== 1 ? "plural" : "singular"
            })}
          </Typography>
        </PaymentSummary>

        <StyledButton onClick={handleButtonClick} disabled={isSubmitting}>
          {isSubmitting ? (
               <Box sx={{ display: "flex", alignItems: "center", gap: "12px", flexDirection: isRTL ? "row-reverse" : "row" }}>
              <CircularProgress sx={{ color: "white" }} size="20px" />
              <span>{t("processing")}</span>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexDirection: isRTL ? "row-reverse" : "row" }}>
              <span>{t("continueBooking")}</span>
              <span>{isRTL ? "←" : "→"}</span>
            </Box>
          )}
        </StyledButton>
      </CustomBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("modal.title")}
            </Typography>
            <Button
              sx={{ ":hover": { backgroundColor: "unset" } }}
              onClick={handleClose}
            ></Button>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2, color: "" }}>
            {t("modal.description")}
            <Typography></Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                {t("modal.login")}
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#3252DF",
                  fontFamily: isRTL
                    ? "'Tajawal', sans-serif"
                    : "'Poppins', sans-serif",
                }}
              >
                {t("modal.signup")}
              </Link>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
