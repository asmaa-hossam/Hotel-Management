import { Box, Typography, Button } from "@mui/material";
import Email from "../../../../assets/images/Email.png";

interface DeleteConfirmationProps {
  deleteItem: () => void | Promise<void>;
}

export default function DeleteConfirmation({ deleteItem }: DeleteConfirmationProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={3}
      height="100%"
    >
      <Box
        component="img"
        src={Email}
        alt="Delete Illustration"
        sx={{ width: "15%", mb: 3 }}
      />

      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", fontSize: "30px", color: '#494949' }}>
        Delete This Item?
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "#929292", maxWidth: 400, fontSize: "16px" }}>
        Are you sure you want to delete this item? If you are sure, just click on delete.
      </Typography>

      <Box display="flex" gap={2}>
        <Button variant="contained" color="error" onClick={deleteItem}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
