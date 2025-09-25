import React from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  row: any;
  onSave?: (updated: any) => void;
};

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, mode, row, onSave }) => {
  if (!row) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {mode === "view" ? "" : "Edit"}
        </Typography>

        {/* User */}
        <TextField
          label="User"
          defaultValue={"hello"}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: mode === "view" }}
        />

        {/* Room */}
        <TextField
          label="Room Number"
          defaultValue={"hello"}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: mode === "view" }}
        />

        Price
        <TextField
          label="Price"
          defaultValue={`$${row.totalPrice}`}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: mode === "view" }}
        />

        Dates
        {/* <TextField
          label="Start Date"
          defaultValue={row.startDate.split("T")[0]}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: mode === "view" }}
        />
        <TextField
          label="End Date"
          defaultValue={row.endDate.split("T")[0]}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: mode === "view" }}
        /> */}

        {mode === "edit" && (
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => onSave && onSave(row)}
          >
            Save Changes
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default BookingModal;
