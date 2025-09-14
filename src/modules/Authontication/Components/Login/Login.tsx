import  { useState } from "react";
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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        px: 2,
      }}
    >
      {/* Title */}
     <Typography
  variant="h5"
  gutterBottom
  sx={{
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "30px",
    lineHeight: 1, // 100%
    letterSpacing: "0%",
    paddingY:'10px'
  }}
>
  Sign in
</Typography>


      {/* Subtext */}
     <Typography
  variant="body2"
  sx={{
    mb: 1, // margin-bottom
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: 1, // 100%
    letterSpacing: "0%",
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
    lineHeight: 1,          
    letterSpacing: "0%",
    paddingTop:'10px',
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
      lineHeight: 1,
      letterSpacing: "0.012px",
      color: "primary.main",  
    }}
  >
    Register here !
  </Link>
</Typography>

      {/* Email Field */}
    <Typography
  variant="subtitle2"
  sx={{
    mb: 0.5,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "170%", // 1.7 for CSS equivalent
    letterSpacing: "0%",
    color:"#152C5B"
  }}
>
  Email Address
</Typography>

      <TextField
        fullWidth
        placeholder="Please type here ..."
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      {/* Password Field */}
      <Typography variant="subtitle2" sx={{
    mb: 0.5,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "170%", // 1.7 for CSS equivalent
    letterSpacing: "0%",
    color:"#152C5B"
  }}>
        Password
      </Typography>
      <TextField
        fullWidth
        placeholder="Please type here ..."
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        sx={{ mb: 1 }}
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

      {/* Forgot Password */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Link href="/forgot-password" variant="caption" color="text.secondary" underline="none">
          Forgot Password ?
        </Link>
      </Box>

      {/* Login Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          backgroundColor: "#2F49D1", // match blue tone
          fontWeight: "bold",
        }}
      >
        Login
      </Button>
    </Box>
  );
}
