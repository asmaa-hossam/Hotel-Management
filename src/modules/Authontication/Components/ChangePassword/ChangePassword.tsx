import { useState } from "react";
import { Auth_URL, axiosinstant } from "../../../../services/urls";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Box, Button, FormLabel, IconButton, InputAdornment, TextField, Alert, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { ChangePasswordData, ChangePasswordRes } from '../../../../services/interfaces';
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validation";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");
  
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
      
      const response = await axiosinstant.post<ChangePasswordRes>(
        Auth_URL.CHANGEPASSWORD,
        data
      );
      
      toast.success(response.data.message);
      reset(); // إعادة تعيين النموذج
      navigate("/login");
      
    } catch (error: any) {
      console.error("Change password error:", error);
      
      const errorMessage = error?.response?.data?.message || 
                          error?.message || "someThing went wronge"
      
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const confirmPasswordRules = {
    ...CONFIRM_PASSWORD_VALIDATION,
    validate: (value: string) => {
      if (value !== newPassword) {
        return "Passwords do not match"
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
    "& input": { color: "#5d5e61" },
  };

  const commonLabelSx = {
    mb: "8px",
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "Poppins",
    color: "rgba(21, 44, 91, 1)",
    display: "block"
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 6, px: 2 }}>

      <Typography
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          py: 1,
        }}
      >
       Change Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <FormLabel sx={commonLabelSx}>
          Old Password
        </FormLabel>
        <Controller
          name="oldPassword"
          control={control}
          rules={PASSWORD_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="please enter old password ..."
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
            />
          )}
        />

        <FormLabel sx={commonLabelSx}>
          New Password
        </FormLabel>
        <Controller
          name="newPassword"
          control={control}
          rules={PASSWORD_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="please enter new Password"
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
            />
          )}
        />

        <FormLabel sx={commonLabelSx}>
          Confirm Passwors
        </FormLabel>
        <Controller
          name="confirmPassword"
          control={control}
          rules={confirmPasswordRules}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="please confirm Password"
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
          {isSubmitting ? "save...." : "Change Password"}
        </Button>
      </form>
    </Box>
  );
}