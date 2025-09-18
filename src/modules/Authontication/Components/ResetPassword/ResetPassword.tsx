import { useEffect, useState } from "react";
 import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import logo from '../../../../../src/assets/images/Staycation..svg'
import resetpass from '../../../../assets/images/Group 34.png'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Auth_URL } from "../../../../services/urls";
import { toast } from "react-toastify";
import { EMAIL_VALIDATION ,PASSWORD_VALIDATION,CONFIRM_PASSWORD_VALIDATION,OTP_VALIDATION} from "../../../../services/validation";
// MUI components
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
   Link,
    InputAdornment,

} from "@mui/material";



interface FormData {
  email: string;
  password:string,
  confirmPassword:string,
  seed:string
}

export default function ResetPassword({}) {
   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location =useLocation();
  console.log(location)
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors ,isSubmitting},
  } =  useForm<FormData>({
      defaultValues: { email: location.state ,password:"",confirmPassword:"",seed:""} });
 
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(Auth_URL.RESETPASSWORD, data);

      console.log("Forget response:", response.data); 
      toast.success(response?.data?.message || 'Check Your Mail')

       navigate("/login");
     
    } catch (error: any) {
      console.error("Forget error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };



  return (
    <Box 
      sx={{
    display:"flex",
           flexDirection: { xs: "column", md: "row" }, 

    height: "100vh",
    width: "100vw",
    overflow: "hidden",  
      }}
    >

    <Box sx={{ flex: 1,  
     flexDirection: "column",
      justifyContent: "center",
      alignItems: { xs: "center", md: "flex-start" },
      px: { xs: 2, md: 6 },
      py: { xs: 4, md: 0 },}}>
     <Box sx={{ width: "50%", maxWidth: 600, mx: "auto",px: 2  ,position: "fixed",
    top: 120,
    left: 123,}}>
    <Box
  component="img"
  src={logo}
  alt="logo"

  sx={{
    position: "fixed",
    top: 30,
    left: 49,
    width: 147,
    height: 39,
    zIndex: 10, // make sure it stays on top
  }}
/>

      {/* Title */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          py: 1,
          color:"rgba(0, 0, 0, 1)",
        }}
      >
        Reset Password
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
          href="/login"
          underline="none"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            color: "rgba(235, 81, 72, 1)",  
          }}
        >
          Login here!
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
          Email 
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={EMAIL_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Please type here ..."
              size="small"
              disabled
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 2,
                width:429,
                height:35,
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


 {/* OTP Field */}
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
          OTP
        </Typography>
        <Controller
          name="seed"
          control={control}
          rules={OTP_VALIDATION}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Please type here ..."
              size="small"
              variant="outlined"
              error={!!errors.seed}
              helperText={errors.seed?.message}
              sx={{
                mb: 2,
                width:429,
                height:35,
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
                width:429,
                height:35,
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



 

{/* confirmed password */}


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
          Confirm Password
        </Typography>
        <Controller
          name="confirmPassword"
          control={control}
          rules={CONFIRM_PASSWORD_VALIDATION("password")}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Please type here ..."
              size="small"
              variant="outlined"
              error={!!errors.confirmPassword}
              type={showPassword ? "text" : "password"}
              helperText={errors.confirmPassword?.message}
              sx={{
                mb: 2,
                width:429,
                height:49,
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
              <Button disabled={isSubmitting} fullWidth variant="contained"  
              color="primary"
              type="submit"
              sx={{
            textTransform: "none",
            borderRadius: "4px",
            height:50,
            backgroundColor: " #3252DF",
            fontWeight: "Poppins",
            width:429
          }}
              >
      Reset</Button>
         </form>


    </Box>
  {/* right Div */}
   </Box  >
      <Box sx={{ flex: 1,ml:4,p:2}}>
         <Box
  component="img"
  //Replace this with image coming from Auth
  src={resetpass}
  alt="logo"
  sx={{     height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius:5,
}}
/>
      </Box>
    </Box>
  );
}
