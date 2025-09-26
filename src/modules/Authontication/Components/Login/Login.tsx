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
      toast.success(res?.data?.message || t("login"));

      if (user.role === "admin") navigate("/dashboard");
      else navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || t("login"));
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
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        textAlign: i18n.language === "ar" ? "right" : "left",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, fontSize: "30px", py: 1 }}>
        {t("signin")}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        {t("no_account")}
      </Typography>

      <Typography variant="body2" sx={{ mb: 3 }}>
        <Link
          href="/register"
          underline="none"
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          {t("register_here")}
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#152C5B" }}>
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
              placeholder={t("placeholder")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Password */}
        <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#152C5B" }}>
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
              placeholder={t("placeholder")}
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
              sx={{ mb: 2 }}
            />
          )}
        />

        <Box sx={{ textAlign: "right", mb: 3 }}>
          <Link
            href="/forgetPassword"
            variant="caption"
            color="text.secondary"
            underline="none"
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
          sx={{ height: 45 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : t("login")}
        </Button>

        {/* Language Switch */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button onClick={() => i18n.changeLanguage("en")}>English</Button>
          <Button onClick={() => i18n.changeLanguage("ar")}>العربية</Button>
        </Box>
      </form>
    </Box>
  );
}
