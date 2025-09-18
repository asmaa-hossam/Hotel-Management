import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../../../src/assets/images/Staycation..svg'
import forgetpass from '../../../../assets/images/forget.png'
import { Auth_URL } from "../../../../services/urls";
import { toast } from "react-toastify";
import { EMAIL_VALIDATION } from "../../../../services/validation";
// import { axiosinstance } from '../../../../services/urls';

// MUI components
import {
  Box,
  Button,
  TextField,
  Typography,
   Link,
} from "@mui/material";

interface FormData {
  email: string;
}

export default function ForgetPass({}) {
  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } =  useForm<FormData>({
      defaultValues: { email:""} });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(Auth_URL.FORGETASSWORD, data);

      console.log("Forget response:", response.data); 
      toast.success(response?.data?.message || 'Check Your Mail')
       navigate("/resetPassword",{state:data.email});
     
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

        height: "100vh",   // full viewport height
        width: "100vw",    // full viewport width
        overflow: "hidden", // disable scrolling
      }}
    >

    <Box sx={{ flex: 1,mr:4, overflow: "hidden"}}>
     <Box sx={{ width: "50%", maxWidth: 600, mx: "auto", mt: 6, px: 2  ,position: "fixed",
    top: 132,
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
        Forgot password
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
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
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
            />
          )}
        />


         <Button  disabled= {isSubmitting} fullWidth variant="contained"  
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
      
      Send mail</Button>
         </form>


    </Box>
  {/* right Div */}
   </Box  >
      <Box sx={{ flex: 1,ml:4,p:2}}>
         <Box
  component="img"
  //Replace this with image coming from Auth
  src={forgetpass}
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

