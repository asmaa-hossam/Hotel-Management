import { useState } from "react";
import { Auth_URL, axiosinstance } from "../../../../services/urls";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Box, Button, FormLabel, IconButton, InputAdornment, TextField, Alert, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { ChangePasswordData, ChangePasswordRes } from '../../../../services/interfaces';
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");
  const { t, i18n } = useTranslation("changePassword");
  const isRTL = i18n.language === 'ar';
  
  // Language switcher handler
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    watch,
    reset
  } = useForm<ChangePasswordData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
    try {
      setSubmitError("");
      
      const response = await axiosinstance.post<ChangePasswordRes>(
        Auth_URL.CHANGEPASSWORD,
        data
      );
      
      toast.success(response.data.message);
      reset();  
      navigate("/login");
      
    } catch (error: any) {
      console.error("Change password error:", error);
      
      const errorMessage = error?.response?.data?.message || 
                          error?.message || t('defaultError')
      
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const confirmPasswordRules = {
    ...CONFIRM_PASSWORD_VALIDATION,
    validate: (value: string) => {
      if (value !== newPassword) {
        return t('passwordMismatch')
      }
      return true;
    }
  };

  const commonTextFieldSx = {
    mb: 2,
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
  };

  const commonLabelSx = {
    mb: "8px",
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
    color: "rgba(21, 44, 91, 1)",
    display: "block",
    textAlign: isRTL ? "right" : "left",
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

      {/* Language Switcher Buttons */}
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

      <Typography
        gutterBottom
        sx={{
          fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          py: 1,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t('title')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <FormLabel sx={commonLabelSx}>
          {t('oldPassword')}
        </FormLabel>
        <Controller
          name="oldPassword"
          control={control}
          rules={PASSWORD_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder={t('oldPasswordPlaceholder')}
              type={showPasswords.old ? "text" : "password"}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
              fullWidth
              autoComplete="current-password"
              sx={commonTextFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => togglePasswordVisibility('old')} 
                      edge="end"
                      aria-label="toggle old password visibility"
                    >
                      {showPasswords.old ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              inputProps={{
                dir: isRTL ? 'rtl' : 'ltr'
              }}
            />
          )}
        />

        <FormLabel sx={commonLabelSx}>
          {t('newPassword')}
        </FormLabel>
        <Controller
          name="newPassword"
          control={control}
          rules={PASSWORD_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder={t('newPasswordPlaceholder')}
              type={showPasswords.new ? "text" : "password"}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              fullWidth
              autoComplete="new-password"
              sx={commonTextFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => togglePasswordVisibility('new')} 
                      edge="end"
                      aria-label="toggle new password visibility"
                    >
                      {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              inputProps={{
                dir: isRTL ? 'rtl' : 'ltr'
              }}
            />
          )}
        />

        <FormLabel sx={commonLabelSx}>
          {t('confirmPassword')}
        </FormLabel>
        <Controller
          name="confirmPassword"
          control={control}
          rules={confirmPasswordRules}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder={t('confirmPasswordPlaceholder')}
              type={showPasswords.confirm ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              autoComplete="new-password"
              sx={commonTextFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => togglePasswordVisibility('confirm')} 
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              inputProps={{
                dir: isRTL ? 'rtl' : 'ltr'
              }}
            />
          )}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{
            mt: 3,
            py: 1.5,
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#2F49D1",
            fontFamily: isRTL ? "'Tajawal', sans-serif" : "Poppins, sans-serif",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#1e3a8a",
            },
            "&:disabled": {
              backgroundColor: "#9ca3af",
            }
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t('submitButton')}
        </Button>
      </form>
    </Box>
  );
}