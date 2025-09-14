// src/pages/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users/login",
        data
      );
      toast.success("✅ Login successful!");
      console.log("Response:", response.data);
      // You can store token in localStorage if needed:
      // localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("❌ Something went wrong. Try again!");
      }
    }
  };

  return (
    <Box
      sx={{
        // minHeight: "100vh",
         display: "flex",
         flexDirection:"column",
         height:'30px',
        // alignItems: "center",
        // justifyContent: "center",
        // bgcolor: "#f5f5f5",
         p: 4,
      }}
    >
     
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign in
        </Typography>

        <Typography variant="body2" sx={{ }}>
          If you don’t have an account register <br />
          <Link href="#" underline="hover" fontWeight="bold" color="primary">
            Register here !
          </Link>
        </Typography>
        <br />

        {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email */}
     <TextField
  fullWidth={false}        // disable fullWidth to use custom width
  label="Email Address"
  placeholder="Enter your email..."
  margin="normal"
  sx={{
    width: '100%',            // fixed width in pixels
    height: "60px",
  }}
  {...register("email", { required: "Email is required" })}
  error={!!errors.email}
  helperText={errors.email?.message}
  InputLabelProps={{ shrink: true }}
/>


      {/* Password */}
      <TextField
        fullWidth
        label="Password"
        placeholder="Enter your password..."
        type={showPassword ? "text" : "password"}
        margin="normal"
         sx={{          
    height: "60px",
  }}
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputLabelProps={{ shrink: true }} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, borderRadius: 2, py: 3 }}
      >
        Login
      </Button>
    </Box>

        
       
    </Box>
  );
};

export default Login;