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
import {  axiosinstance, COMMENTS_URLS } from "../../../../services/urls"
import { toast } from "react-toastify";
import axios from "axios";
import { getCommentValidationRules } from "../../../../services/validation";

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
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<Comment>({
    defaultValues: {
      roomId: roomId,
      comment: "",
    },
    mode: "onChange",
  });
  const validationRules = getCommentValidationRules();
  const onSubmit = async (data: Comment) => {
    console.log(data);
    try {
      const response = await axiosinstance.post<AddCommentResponse>(
        COMMENTS_URLS.addComment,
        { ...data, roomId: roomId }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message || "Comment added successfully");
        reset();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Something went wrong, try again"
        );
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
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "500", fontSize: "20px" }}
      >
        Add Your Comment
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
                type="text"
                multiline
                rows={4}
                sx={{
                  width: {
                    xs: "100%",
                    xl: "516px",
                  },
                }}
                {...field}
              />
              {fieldState?.error && (
                <FormHelperText
                  sx={{ color: "#EB5148", fontWeight: 600, fontSize: 12 }}
                >
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
          {isSubmitting ? (
            <CircularProgress sx={{ color: "white" }} size={"1rem"} />
          ) : (
            "Send"
          )}
        </StyledButton>
      </Box>
    </Box>
  );
};

export default CommentForm;