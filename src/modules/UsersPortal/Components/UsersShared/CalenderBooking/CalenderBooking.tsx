// CalenderBooking.tsx
import React, { useState } from "react";
import { keyframes } from "@emotion/react";
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;
import DatePicker from "./DatePicker";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { axiosinstance, USERS_URL } from "../../../../../services/urls";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import landingImg from '../../../../../assets/images/landing.png'

export default function CalenderBooking() {
  const [count, setCount] = useState(1);
  const handleDecrease = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };
  const handleIncrease = () => {
    setCount((c) => c + 1);
  };

  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }>({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getRooms = async () => {
    // validation
    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please pick a start and end date.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { startDate, endDate } = dateRange;

      const res = await axiosinstance.get(USERS_URL.GETALLROOMS, {
        params: {
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        },
      });

      navigate(
        `/explore?startDate=${dayjs(startDate).format(
          "YYYY-MM-DD"
        )}&endDate=${dayjs(endDate).format("YYYY-MM-DD")}`,
        { state: { initialRooms: res.data } }
      );
    } catch (err: any) {
      console.error(err);
      // show user friendly message
      const message =
        err?.response?.data?.message || err?.message || "Failed to fetch rooms";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: 2,
        py: 2,
        borderRadius: 3,
        overflow: "hidden",
        textAlign: "left",
      }}
    >
    <Box sx={{pt:15,width:"100%"}}>
      {/* parent Grid */}
      <Grid container spacing={2} >
        {/* first Grid child */}
        <Grid  size={{xs:12 ,sm:8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "700",
              fontSize: { xs: "1.5rem", sm: "2.625rem" },
              marginBottom: ".2rem",
              color: "#152C5B",
              lineHeight: "1.2",
              textAlign: "left",
            }}
          >
            Forget Busy Work, <br />
            Start Next Vacation
          </Typography>

          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              color: "#B0B0B0",
              lineHeight: "1.7rem",
            }}
          >
            We provide what you need to enjoy your holiday with family.
            <br />
            Time to make another memorable moments.
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              marginBottom: "0.1rem",
              color: "#152C5B",
              lineHeight: "1.875rem",
              mb: "1rem",
              textAlign: "start",
            }}
          >
            Start Booking
          </Typography>

          {/* DatePicker component (receives dateRange & setter) */}
          <DatePicker dateRange={dateRange} setDateRange={setDateRange} />

          {/* show error under the picker if exists */}
          {error && (
            <FormHelperText error sx={{ mt: 1 }}>
              {error}
            </FormHelperText>
          )}

          {/* capacity controls */}
          <Box sx={{ display: "flex", mt: "1.5rem", alignItems: "center" }}>
            <IconButton
              sx={{
                width: "3.5rem",
                backgroundColor: "#E74C3C",
                borderRadius: "4px 0px 0px 0px",
                "&:hover": { backgroundColor: "#811206ff" },
                marginInlineEnd: "1rem",
              }}
              onClick={handleDecrease}
            >
              <Remove sx={{ color: "#fff" }} />
            </IconButton>

            <TextField sx={{ color: "#152C5B", textAlign: "center" }} value={`${count} person`}
            label="Capacity"
            />

            <IconButton
              sx={{
                width: "3.5rem",
                backgroundColor: "#1ABC9C",
                borderRadius: "0px 4px 0px 0px",
                "&:hover": { backgroundColor: "#058d72ff" },
                marginInlineStart: "1rem",
              }}
              onClick={handleIncrease}
            >
              <Add sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          {/* Explore button: disabled while loading */}
          <Button
            sx={{
              color: "white",
              backgroundColor: "#3252DF",
              padding: "0.5rem 5rem",
              mt: "2rem",
              ml: "0.5rem",
            }}
            onClick={getRooms}
            disabled={loading}
          >
            {loading ? "Searching..." : "Explore"}
          </Button>
        </Grid>

        {/* second Grid child */}
        <Grid size={{xs:12 ,sm:4}}>
           <Box
            sx={{
              width: { xs: "250px", sm: "80%" },
              height: { xs: "450px", sm: "490px" },
              borderRadius: "15px",
              position: "relative",
              marginTop: { xs: "6rem", sm: "2.5rem" },
              marginInline: { xs: "auto", sm: "0rem" },
              marginBottom: { xs: "1rem", sm: "0rem" },
             
            }}
          >
         <Box
         component={"img"}
         src={landingImg}
          sx={{
                width: {
                  xs: "95%",
                  sm: "130%",
                },
                height: "100%",
                borderRadius: "105px 20px 20px 20px",
                position: "absolute",
                bottom: "40px",

                 // Animation بسيط
            animation: `${float} 3s ease-in-out infinite`,
            
            // Hover effect بسيط
            "&:hover": {
              transform: "scale(1.05)",
              transition: "transform 0.3s ease",}
              }}
         />
</Box>

        </Grid>
      </Grid>
    </Box>
    </Box>
  );
}
