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
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth_URL } from "../../../../services/urls";
import type {RegisterFormInputs} from "../../../../services/types"
import { CONFIRM_PASSWORD_VALIDATION, COUNTRY_VALIDATION, EMAIL_VALIDATION, IMAGE_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION, USERNAME_VALIDATION } from "../../../../services/validation";



export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      phoneNumber: "",
      country: "",
      role: "user",
      profileImage: null,
    },
  });

  const password = watch("password");

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();

      // Append  FormData
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("country", data.country);
      formData.append("role", data.role);
      
      // Append profile image  
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }

      // Make request
      let response=await axios.post(
        (Auth_URL.REGISTER),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful registration
      toast.success(response?.data?.message || "Registration successful! You can now login.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Handle error response
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 6, px: 2, pb: 4 }}>
      {/* Title */}
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "30px", py: 1 }}>
        Sign up
      </Typography>

      {/* Subtext */}
      <Typography variant="body2" sx={{ mb: 1, fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "16px" }}>
        If you already have an account register
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "16px" }}>
        You can{" "}
        <Link href="/login" underline="none" sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px", color: "red" }}>
          Login here !
        </Link>
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Name */}
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>User Name</Typography>
        <Controller
          name="userName"
          control={control}
          rules={USERNAME_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Please type here ..."
              size="small"
              variant="outlined"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                },
              }}
            />
          )}
        />

        {/* Email */}
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Email</Typography>
        <Controller
          name="email"
          control={control}
          rules={EMAIL_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Enter email"
              size="small"
              variant="outlined"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                },
              }}
            />
          )}
        />

        {/* Phone and Country */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Phone</Typography>
            <Controller
              name="phoneNumber"
              control={control}
              rules= {PHONE_VALIDATION}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter phone number"
                  size="small"
                  variant="outlined"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F5F6F8",
                      "&:hover": { backgroundColor: "#f1f5fdff" },
                      "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Country</Typography>
            <Controller
              name="country"
              control={control}
              rules={COUNTRY_VALIDATION}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter country"
                  size="small"
                  variant="outlined"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F5F6F8",
                      "&:hover": { backgroundColor: "#f1f5fdff" },
                      "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>

        {/* Password */}
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Password</Typography>
        <Controller
          name="password"
          control={control}
          rules={PASSWORD_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Please type here ..."
              size="small"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Confirm Password */}
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Confirm Password</Typography>
        <Controller
          name="confirmPassword"
          control={control}
          rules={CONFIRM_PASSWORD_VALIDATION(password)}

          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Please type here ..."
              size="small"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

       {/* Profile Image Upload */}
<Typography variant="subtitle2" sx={{ mb: 0.5 }}>Profile Image</Typography>
<Controller
  name="profileImage"
  rules={IMAGE_VALIDATION}
  control={control}
  render={({ field: { onChange, value, ...field } }) => (
    <Box sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{
          py: 1,
          backgroundColor: "#F5F6F8",
          "&:hover": { backgroundColor: "#f1f5fdff" },
        }}
      >
        {value ? "Change Image" : "Upload Image"}
        <input
          {...field}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
        />
      </Button>

      {/* Show error if validation fails */}
      {errors.profileImage && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: "block", mt: 0.5 }}
        >
          {errors.profileImage.message}
        </Typography>
      )}
    </Box>
  )}
/>

        {/* Role (hidden but included in form) */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#2F49D1",
            fontWeight: "bold",
            py: 1.5,
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Sign up"}
        </Button>
      </form>
    </Box>
  );
}