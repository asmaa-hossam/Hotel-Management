import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { axiosinstance, COMMENTS_URLS } from "../../../../services/urls";
import { toast } from "react-toastify";
import axios from "axios";
import { getCommentValidationRules } from "../../../../services/validation";
import { useTranslation } from "react-i18next";

const StyledTextField = styled(TextField)(() => ({
  width: "32.25rem",
  "& .MuiOutlinedInput-root": {
    border: "1px solid #203FC7",
    borderRadius: "15px",
    marginTop: "4rem",
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

type Comment = {
  roomId: string;
  comment: string;
};
interface AddCommentResponse {
  success: boolean;
  message: string;
}

const CommentForm = ({ roomId }: { roomId: string }) => {
  const { t, i18n } = useTranslation("comment");

  // RTL handling
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<Comment>({
    defaultValues: {
      roomId,
      comment: "",
    },
    mode: "onChange",
  });

  const validationRules = getCommentValidationRules();

  const onSubmit = async (data: Comment) => {
    try {
      const response = await axiosinstance.post<AddCommentResponse>(
        COMMENTS_URLS.addComment,
        { ...data, roomId }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message || t("commentSuccess"));
        reset();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || t("commentError")
        );
      } else {
        toast.error(t("commentError"));
      }
      console.log(error);
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
      <Typography variant="subtitle2" sx={{ fontWeight: "500", fontSize: "20px" }}>
        {t("addComment")}
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="comment"
          control={control}
          rules={validationRules.comment}
          render={({ field, fieldState }) => (
            <FormControl>
              <StyledTextField
                {...field}
                placeholder={t("commentPlaceholder")}
                type="text"
                multiline
                rows={4}
                sx={{
                  width: {
                    xs: "100%",
                    xl: "516px",
                  },
                }}
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
};

export default CommentForm;
