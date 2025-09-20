import { Box, Typography } from "@mui/material";
import Email from "../../../../assets/images/Email.png";

interface DeleteConfirmationProps {
  deleteItem: string;
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
      height="100%" // make it take full container height if needed
    >
      <Box
        component="img"
        src={Email}
        alt="Delete Illustration"
        sx={{ width: "15%", mb: 3 }}
      />

      <Typography variant="h5" sx={{ mb: 2 ,fontWeight:"bold",fontSize:"30px",color:'#494949'}}>
        Delete This {deleteItem}?
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "#929292", maxWidth: 400 ,fontSize:"16px"}}>
        Are you sure you want to delete this item? If you are sure, just click on delete.
      </Typography>
    </Box>
  );
}
