import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Menu,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ads_URL, axiosinstanceAdmin } from "../../../services/urls";
import DeleteConfirmation from "../../Shared/Components/deleteConfrim/deleteConfrim";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Ad, Room } from "../../../services/interfaces";
import type { ModalType } from "../../../services/types";






export default function AdsTable() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [form, setForm] = useState({ room: "", discount: 0, isActive: true });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAd, setMenuAd] = useState<Ad | null>(null);

  const token = localStorage.getItem("token");

  // Fetch ads + rooms
 const fetchAds = async () => {
  setLoading(true);
  try {
    const response = await axiosinstanceAdmin.get(ads_URL.FETCH);
    setAds(response.data.data.ads);

    const roomRes = await axiosinstanceAdmin.get("/rooms?page=1&size=50");
    setRooms(roomRes.data.data.rooms);
  } catch (error: any) {
    console.error("Error fetching ads:", error);
    toast.error(error.response?.data?.message || "Failed to fetch data");
  } finally {
    setLoading(false);
  }
};

// 2. Call it on mount
useEffect(() => {
  fetchAds();
}, [token]);

  // Open Modal
  const handleOpenModal = (type: ModalType, ad?: Ad) => {
    setModalType(type);
    if ((type === "edit" || type === "view") && ad) {
      setSelectedAd(ad);
      setForm({
        room: typeof ad.room === "string" ? ad.room : ad.room._id,
        discount: ad.discount,
        isActive: ad.isActive,
      });
    } else if (type === "create") {
      setForm({ room: "", discount: 0, isActive: true });
    }
    setOpenModal(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType(null);
    setSelectedAd(null);
  };

  // Create or Update
  const handleSubmit = async () => {
    if (!form.room) {
      toast.error("Please select a room.");
      return;
    }

    try {
      if (modalType === "edit" && selectedAd) {
        const res = await axiosinstanceAdmin.put(
          ads_URL.UPDATE(selectedAd._id),
          {
            discount: form.discount,
            isActive: form.isActive,
          },
           
        );

        const updatedAd = res.data.data.ads;
        setAds(ads.map((ad) => (ad._id === selectedAd._id ? updatedAd : ad)));
        toast.success(res.data.message || "Ad updated successfully");
      } else if (modalType === "create") {
        const res = await axiosinstanceAdmin.post(ads_URL.CREATE, form,  );

        const newAd = res.data.data.ads;
        setAds([...ads, newAd]);
        toast.success(res.data.message || "Ad created successfully");
        await fetchAds();
      }
      handleCloseModal();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  // Menu Actions
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, ad: Ad) => {
    setAnchorEl(event.currentTarget);
    setMenuAd(ad);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuAd(null);
  };

  // Delete
  const handleOpenDeleteDialog = (ad: Ad) => {
    setSelectedAd(ad);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedAd) return;

    try {
      const res = await axiosinstanceAdmin.delete(
        ads_URL.DELETE(selectedAd._id),
        
      );
      setAds(ads.filter((a) => a._id !== selectedAd._id));
      toast.success(res.data.message || "Ad deleted successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedAd(null);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      {/* Header */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    margin: "auto",
    width: "95%",
    padding: "5px",
  }}
>
  {/* Left side: Titles */}
  <Box>
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 600,
        fontSize: "20px",
      }}
    >
      ADS Table Details
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "14px",
      }}
    >
      You can check all details
    </Typography>
  </Box>

  {/* Right side: Button */}
  <Button
    variant="contained"
    color="primary"
    onClick={() => handleOpenModal("create")}
  >
    Add New Ads
  </Button>
</Box>


      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "95%",
          margin: "auto",
          bgcolor: "transparent",
          boxShadow: "none",
          border: "none",
          padding: "5px",
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: 0,
            border: "none",
          }}
        >
          <TableHead>
            <TableRow sx={{ bgcolor: "#e2e5eb" }}>
              <TableCell sx={{ textAlign: "center", border: "none" }}>
                Room Name
              </TableCell>
              <TableCell sx={{ textAlign: "center", border: "none" }}>
                Price
              </TableCell>
              <TableCell sx={{ textAlign: "center", border: "none" }}>
                Capacity
              </TableCell>
              <TableCell sx={{ textAlign: "center", border: "none" }}>
                Discount
              </TableCell>
              <TableCell sx={{ textAlign: "center", border: "none" }}>
                Active
              </TableCell>
              <TableCell sx={{ textAlign: "center", border: "none" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ bgcolor: "transparent" }}>
            {ads.map((ad, index) => (
              <TableRow
                key={ad._id}
                sx={{
                  bgcolor: index % 2 === 0 ? "#F8F9FB" : "white",
                  border: "none",
                }}
              >
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {typeof ad.room === "string" ? ad.room : ad.room.roomNumber}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {typeof ad.room !== "string" ? ad.room.price : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {typeof ad.room !== "string" ? ad.room.capacity : "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {typeof ad.room !== "string"
                    ? ad.room.discount
                    : ad.discount ?? "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center", border: "none" }}>
                  {ad.isActive ? "Yes" : "No"}
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <IconButton onClick={(e) => handleMenuClick(e, ad)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: "10px", minWidth: 150 },
        }}
      >
        <MenuItem onClick={() => handleOpenModal("view", menuAd!)}>
          <VisibilityIcon sx={{ fontSize: 18, color: "#3f51b5", mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={() => handleOpenModal("edit", menuAd!)}>
          <EditIcon sx={{ fontSize: 18, color: "#203FC7", mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleOpenDeleteDialog(menuAd!)}>
          <DeleteIcon sx={{ fontSize: 18, color: "#d32f2f", mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create/Edit/View Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          {modalType === "create"
            ? "Create Ad"
            : modalType === "edit"
            ? "Edit Ad"
            : "View Ad"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth required margin="dense">
            <InputLabel shrink>Select Room</InputLabel>
            <Select
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
              disabled={modalType === "view"}
            >
              <MenuItem value="">Select Room</MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room._id} value={room._id}>
                  {room.roomNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        <TextField
  fullWidth
  margin="dense"
  label="Discount"
  type="number"
  inputProps={{ min: 0, step: "0.001" }}   // allow decimals
  value={form.discount}
  disabled={modalType === "view"}
  onChange={(e) =>
    setForm({
      ...form,
      discount: Math.max(0, parseFloat(e.target.value) || 0),
    })
  }
/>


          <FormControl fullWidth margin="dense">
            <InputLabel shrink>Active</InputLabel>
            <Select
              value={form.isActive ? "Yes" : "No"}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.value === "Yes" })
              }
              disabled={modalType === "view"}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          {modalType !== "view" && (
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DeleteConfirmation deleteItem={handleDelete} />
      </Dialog>
    </>
  );
}
