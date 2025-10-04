// src/pages/AdsTable.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface Ad {
  _id: string;
  roomName: string;
  price: number;
  discount: number;
  capacity: number | string;
  active: boolean;
  category?: string;
}

interface Room {
  _id: string;
  name: string;
}

export default function AdsTable() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAd, setSelectedAd] = useState<string | null>(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [discount, setDiscount] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [creating, setCreating] = useState(false);

  const openMenu = Boolean(anchorEl);

  // --- Fetch Ads ---
  useEffect(() => {
    const fetchAds = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login first.");
        token = token.replace(/^Bearer\s+/, "");

        const { data } = await axios.get(
          "https://upskilling-egypt.com:3000/api/v0/admin/ads",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const mappedAds: Ad[] = (data?.ads || []).map((ad: any) => ({
          _id: ad._id,
          roomName: ad.room?.name || "N/A",
          price: ad.room?.price || 0,
          discount: ad.discount || 0,
          capacity: ad.room?.capacity || "N/A",
          active: ad.isActive,
          category: ad.room?.category || "-",
        }));

        setAds(mappedAds);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // --- Fetch Rooms ---
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) return;
        token = token.replace(/^Bearer\s+/, "");

        const { data } = await axios.get(
          "https://upskilling-egypt.com:3000/api/v0/admin/rooms?page=1&size=10",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRooms(data?.rooms || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  // --- Actions ---
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, adId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedAd(adId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAd(null);
  };

  // --- Create Ad ---
  const handleCreateAd = async () => {
    if (!selectedRoom) return alert("Please select a room");
    setCreating(true);
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      token = token.replace(/^Bearer\s+/, "");

      const payload = { room: selectedRoom, discount, isActive };

      await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/ads",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh ads list
      const { data } = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/ads",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const mappedAds: Ad[] = (data?.ads || []).map((ad: any) => ({
        _id: ad._id,
        roomName: ad.room?.name || "N/A",
        price: ad.room?.price || 0,
        discount: ad.discount || 0,
        capacity: ad.room?.capacity || "N/A",
        active: ad.isActive,
        category: ad.room?.category || "-",
      }));

      setAds(mappedAds);
      alert("Ad created successfully");
      setOpenCreate(false);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Error creating ad");
    } finally {
      setCreating(false);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">ADS Table Details</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenCreate(true)}>
          Add New Ad
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Room Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No ads found
                </TableCell>
              </TableRow>
            ) : (
              ads.map((ad) => (
                <TableRow key={ad._id}>
                  <TableCell>{ad.roomName}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{ad.price}</TableCell>
                  <TableCell>{ad.discount}</TableCell>
                  <TableCell>{ad.capacity}</TableCell>
                  <TableCell>{ad.active ? "Yes" : "No"}</TableCell>
                  <TableCell>{ad.category}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, ad._id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>View</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>

      {/* Create Ad Modal */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        PaperProps={{
          sx: { width: "30vw", maxWidth: "30vw" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Create Ad</Typography>
          <IconButton
            onClick={() => setOpenCreate(false)}
            sx={{
              color: "red",
              border: "1px solid red",
              borderRadius: "50%",
              p: 0.5,
              width: 32,
              height: 32,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Room</InputLabel>
            <Select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} label="Room">
              {rooms.map((room) => (
                <MenuItem key={room._id} value={room._id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Discount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />

          <FormControl fullWidth>
            <InputLabel>Active</InputLabel>
            <Select value={isActive ? "true" : "false"} onChange={(e) => setIsActive(e.target.value === "true")}>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCreateAd} variant="contained" disabled={creating}>
            {creating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
