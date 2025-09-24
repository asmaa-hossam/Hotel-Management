import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  );
}

