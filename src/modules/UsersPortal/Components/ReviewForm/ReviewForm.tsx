import  { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Rating,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { axiosinstance, ROOM_REVIEWS } from "../../../../services/urls";
import type { Review, ReviewResponse } from "../../../../services/interfaces";
import { getReviewValidationRules } from "../../../../services/validation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    border: "1px solid #203FC7",
    borderRadius: "15px",
    marginTop: "0.8rem",
  },
}));

const StyledButton = styled(Button)(() => ({
  height: "50px",
  fontSize: "18px",
  display: "flex",
  backgroundColor: "#3252DF",
  width: "210px",
  boxShadow: "0px 4px 10px rgba(50, 82, 223, 0.3)",
  marginTop: "1.7rem",
  "&.Mui-disabled": {
    background: "#949fcf",
    color: "#c0c0c0",
  },
}));

const validationRules = getReviewValidationRules();

export default function ReviewForm({ roomId }: { roomId: string }) {
  const { t, i18n } = useTranslation("review");

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<Review>({
    defaultValues: {
      roomId: roomId,
      rating: 1,
      review: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Review) => {
    try {
      let res = await axiosinstance.post<ReviewResponse>(
        ROOM_REVIEWS.CREATE_REVIEW,
        { ...data, roomId: roomId }
      );
      if (res.status === 200) {
        toast.success(res?.data?.message || t("success"));
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || t("error"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "#152C5B",
        width: "100%",
      }}
    >
      <Typography variant={"subtitle2"} sx={{ fontWeight: "500", fontSize: "20px" }}>
        {t("rateTitle")}
      </Typography>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="rating"
          control={control}
          rules={validationRules.review}
          render={({ field, fieldState }) => (
            <FormControl>
              <Rating disabled={isSubmitting} precision={0.5} {...field} />
              {fieldState?.error && (
                <FormHelperText sx={{ color: "#EB5148", fontWeight: 600, fontSize: 12 }}>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: "500",
            fontSize: "20px",
            marginBlockStart: "1.15rem",
          }}
        >
          {t("messageTitle")}
        </Typography>

        <Controller
          name="review"
          control={control}
          rules={validationRules.review}
          render={({ field, fieldState }) => (
            <FormControl sx={{ width: "100%" }}>
              <StyledTextField
                type="text"
                multiline
                rows={3}
                placeholder={t("messageTitle")}
                sx={{
                  width: "100%",
                }}
                {...field}
              />
              {fieldState?.error && (
                <FormHelperText sx={{ color: "#EB5148", fontWeight: 600, fontSize: 12 }}>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <StyledButton
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{
            textTransform: "none",
            alignSelf: {
              xs: "flex-start",
              sm: "flex-end",
            },
          }}
        >
          {isSubmitting ? <CircularProgress sx={{ color: "white" }} size={"1rem"} /> : t("send")}
        </StyledButton>
      </Box>
    </Box>
  );
}
