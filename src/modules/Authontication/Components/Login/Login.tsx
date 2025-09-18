import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Auth_URL } from "../../../../services/urls"; // Make sure Auth_URL.LOGIN is correct
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validation";
import { useAuthContext } from "../../../../Context/Context";

// Types
type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {SaveLogenData}=useAuthContext()
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "" },
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await axios.post(Auth_URL.LOGIN, data);
       SaveLogenData()
      console.log("Login response:", res.data); 

      const token = res?.data?.data?.token;

       
        localStorage.setItem("token", token);
        toast.success(res?.data?.message || "Login successful!");
        navigate("/dashboard");
        
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 6, px: 2 }}>
      {/* Title */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          py: 1,
        }}
      >
        Sign in
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
        }}
      >
        If you don't have an account register
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 3,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
        }}
      >
        You can{" "}
        <Link
          href="/register"
          underline="none"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            color: "primary.main",
          }}
        >
          Register here!
        </Link>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 0.5,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#152C5B",
          }}
        >
          Email Address
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={EMAIL_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Please type here ..."
              size="small"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F6F8",
                  "&:hover": { backgroundColor: "#f1f5fdff" },
                  "&.Mui-focused": { backgroundColor: "#f1f5fdff" },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow:
                      "0 0 0 1000px #f1f5fdff inset !important",
                    WebkitTextFillColor: "#5d5e61",
                  },
                },
                "& input": { color: "#5d5e61" },
              }}
            />
          )}
        />

        {/* Password Field */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 0.5,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#152C5B",
          }}
        >
          Password
        </Typography>
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
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow:
                      "0 0 0 1000px #f1f5fdff inset !important",
                    WebkitTextFillColor: "#5d5e61",
                  },
                },
                "& input": { color: "#5d5e61" },
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

        {/* Forgot Password */}
        <Box sx={{ textAlign: "right", mb: 3 }}>
          <Link
            href="/forgetPassword"
            variant="caption"
            color="text.secondary"
            underline="none"
          >
            Forgot Password?
          </Link>
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#2F49D1",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}
