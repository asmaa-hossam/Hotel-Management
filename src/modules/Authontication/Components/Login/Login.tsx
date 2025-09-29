import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Auth_URL } from "../../../../services/urls";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validation";
import { useAuthContext } from "../../../../Context/Context";
import { useTranslation } from "react-i18next";

type LoginFormInputs = { email: string; password: string };

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);  
  const { SaveLogenData } = useAuthContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("login");

  const isRTL = i18n.language === 'ar';

  // Language switcher handler
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "" },
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true); 
    try {
      const res = await axios.post(Auth_URL.LOGIN, data);
      const token = res?.data?.data?.token;
      const user = res?.data?.data?.user;

      localStorage.setItem("token", token);
      SaveLogenData();
      toast.success(res?.data?.message || t("loginSuccess"));

      if (user.role === "admin") navigate("/dashboard");
      else navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || t("loginError"));
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        px: 2,
        pb: 4,
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      {/* Language Switcher Buttons - Same as Register page */}
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mb: 2, flexDirection: isRTL ? "row-reverse" : "row" }}>
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

      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
          fontWeight: 500, 
          fontSize: "30px", 
          py: 1,
          textAlign: isRTL ? "right" : "left"
        }}
      >
        {t("signin")}
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          mb: 1,
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
          textAlign: isRTL ? "right" : "left"
        }}
      >
        {t("no_account")}
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          mb: 3,
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
          textAlign: isRTL ? "right" : "left"
        }}
      >
        <Link
          href="/register"
          underline="none"
          sx={{ 
            fontWeight: 600, 
            color: "red",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif"
          }}
        >
          {t("register_here")}
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 0.5, 
            color: "#152C5B",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            textAlign: isRTL ? "right" : "left"
          }}
        >
          {t("email")}
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={EMAIL_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              variant="outlined"
              placeholder={t("emailPlaceholder")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ 
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                },
                "& .MuiInputBase-input": {
                  fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
                  textAlign: isRTL ? "right" : "left",
                },
              }}
            />
          )}
        />

        {/* Password */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mb: 0.5, 
            color: "#152C5B",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            textAlign: isRTL ? "right" : "left"
          }}
        >
          {t("password")}
        </Typography>
        <Controller
          name="password"
          control={control}
          rules={PASSWORD_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                },
                "& .MuiInputBase-input": {
                  fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
                  textAlign: isRTL ? "right" : "left",
                },
              }}
            />
          )}
        />

        <Box sx={{ textAlign: isRTL ? "left" : "right", mb: 3 }}>
          <Link
            href="/forgetPassword"
            variant="caption"
            color="text.secondary"
            underline="none"
            sx={{ fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif" }}
          >
            {t("forgot_password")}
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ 
            height: 45,
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#2F49D1",
            fontWeight: "bold",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "'Poppins', sans-serif",
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : t("login")}
        </Button>
      </form>
    </Box>
  );
}