import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
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
};

interface ViewFacilityModalProps {
  open: boolean;
  handleClose: () => void;
  facilityId: string;
}

type Facility = {
  _id: string;
  name: string;
  createdAt: string;
};

export default function ViewFacilityModal({ open, handleClose, facilityId }: ViewFacilityModalProps) {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching facility");
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [facilityId]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Facility Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Loader />
        ) : facility ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="ID" value={facility._id} InputProps={{ readOnly: true }} fullWidth />
            <TextField label="Name" value={facility.name} InputProps={{ readOnly: true }} fullWidth />
            <TextField label="Created At" value={facility.createdAt.split("T")[0]} InputProps={{ readOnly: true }} fullWidth />
          </Box>
        ) : (
          <Typography>No details found</Typography>
        )}
      </Box>
    </Modal>
  );
}
