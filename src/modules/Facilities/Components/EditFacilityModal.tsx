// src/components/Facilities/EditFacilityModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import { Facilities_URL } from "../../../services/urls";
import Loader from "../../Shared/Components/Loader/Loader";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
  maxHeight: "90vh",
  overflowY: "auto",
};

type Facility = {
  _id: string;
  name: string;
  createdAt: string;
};

interface EditFacilityModalProps {
  open: boolean;
  handleClose: () => void;
  facilityId: string;
  onUpdated?: () => void; // callback to refresh list
}

export default function EditFacilityModal({
  open,
  handleClose,
  facilityId,
  onUpdated,
}: EditFacilityModalProps) {
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState<Facility | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!facilityId) return;
    const fetchFacility = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(Facilities_URL.DETAILS(facilityId), {
          headers: { Authorization: `${token}` },
        });
        setFacility(res.data.data.facility);
        setName(res.data.data.facility.name);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching facility");
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [facilityId]);

  const handleSave = async () => {
    if (!facility) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        Facilities_URL.UPDATE(facility._id),
        { name },
        { headers: { Authorization: `${token}` } }
      );
      toast.success("Facility updated successfully!");
      handleClose();
      onUpdated?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating facility");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Edit Facility
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "#555" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        {loading ? (
          <Loader />
        ) : facility ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="ID"
              value={facility._id}
              InputProps={{ readOnly: true }}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Created At"
              value={facility.createdAt.split("T")[0]}
              InputProps={{ readOnly: true }}
              fullWidth
              variant="outlined"
            />
          </Box>
        ) : (
          <Typography>No facility found</Typography>
        )}

        {/* Footer */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ textTransform: "none", borderRadius: "8px" }}
            disabled={loading || !facility}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              borderColor: "#203FC7",
              color: "#203FC7",
              "&:hover": { backgroundColor: "#f0f0f0", borderColor: "#203FC7" },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
