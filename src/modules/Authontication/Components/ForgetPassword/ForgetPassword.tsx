import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth_URL } from "../../../../services/urls";
import { toast } from "react-toastify";
import { EMAIL_VALIDATION } from "../../../../services/validation";
import { useTranslation } from "react-i18next";

// MUI components
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";

interface FormData {
  email: string;
}

export default function ForgetPass({}) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("forgetPassword");
  const isRTL = i18n.language === 'ar';

  // Language switcher handler
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: "" }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(Auth_URL.FORGETASSWORD, data);

      console.log("Forget response:", response.data); 
      toast.success(response?.data?.message || t('successMessage'));
      navigate("/resetPassword", { state: data.email });
     
    } catch (error: any) {
      console.error("Forget error:", error);
      toast.error(error?.response?.data?.message || t('errorMessage'));
    }
  };

  return (
    <Box sx={{ 
      width: "100%", 
      maxWidth: 600, 
      mx: "auto", 
      mt: 6, 
      px: 2,
      pb: 4,
      direction: isRTL ? "rtl" : "ltr"
    }}>
      {/* Language Switcher Buttons - Same as Login page */}
      <Box sx={{ 
        display: "flex", 
        gap: 1, 
        justifyContent: "flex-end", 
        mb: 2, 
        flexDirection: isRTL ? "row-reverse" : "row" 
      }}>
        <Button
          onClick={() => switchLanguage("en")}
          variant={i18n.language === "en" ? "contained" : "outlined"}
          size="small"
          sx={{
            minWidth: "60px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            fontWeight: i18n.language === "en" ? "600" : "400",
            borderRadius: "20px",
          }}
        >
          EN
        </Button>
        <Button
          onClick={() => switchLanguage("ar")}
          variant={i18n.language === "ar" ? "contained" : "outlined"}
          size="small"
          sx={{
            minWidth: "60px",
            fontFamily: "'Tajawal', sans-serif",
            fontSize: "12px",
            fontWeight: i18n.language === "ar" ? "600" : "400",
            borderRadius: "20px",
          }}
        >
          AR
        </Button>
      </Box>

      {/* Title */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          py: 1,
          color: "rgba(0, 0, 0, 1)",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t('title')}
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t('subtext1')}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 3,
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t('subtext2')}{" "}
        <Link
          href="/login"
          underline="none"
          sx={{
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            color: "rgba(235, 81, 72, 1)",  
          }}
        >
          {t('loginHere')}
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 0.5,
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#152C5B",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t('email')}
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={EMAIL_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={t('emailPlaceholder')}
              size="small"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{
                mb: 2,
                height: 49,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #f1f5fdff inset !important",
                    WebkitTextFillColor: "#5d5e61",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#5d5e61",
                  fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
                  textAlign: isRTL ? "right" : "left",
                },
                "& .MuiFormHelperText-root": {
                  fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
                  textAlign: isRTL ? "right" : "left",
                }
              }}
              inputProps={{
                dir: isRTL ? 'rtl' : 'ltr'
              }}
            />
          )}
        />

        <Button 
          disabled={isSubmitting} 
          fullWidth 
          variant="contained"  
          color="primary"
          type="submit"
          sx={{
            textTransform: "none",
            borderRadius: "4px",
            height: 50,
            backgroundColor: "#3252DF",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#2b47c9",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
            }
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('sendMail')}
        </Button>
      </form>
    </Box>
  );
}