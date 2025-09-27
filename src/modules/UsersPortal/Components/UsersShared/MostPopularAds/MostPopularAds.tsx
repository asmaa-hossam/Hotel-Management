import React, { useEffect, useState } from "react";
import { 
  Box, Card, CardMedia, Typography, Chip, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, Button 
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
 import { useFavorites } from "../../../../../Context/FavoritesContext";
import { useAuthContext } from "../../../../../Context/Context"; 
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../../../../assets/images/Group 33.png";
import { ads_PORTAL_URL } from "../../../../../services/urls";
import { axiosinstance } from "../../../../../services/urls";


interface Ad {
  _id: string;
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    images: string[];
  };
}

const MostPopularAds: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const { loginData } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const fetchAds = async () => {
    try {
      const res = await axiosinstance.get(ads_PORTAL_URL.FETCH);
      if (res.data.success && res.data.data.ads) {
        setAds(res.data.data.ads);
      } else {
        setAds([]);
      }
    } catch (error) {
      console.error(error);
      setAds([]);
    } finally {
      setLoading(false);
    }
  };
  fetchAds();
}, []);


  const handleFavoriteClick = (roomId: string) => {
    if (!loginData) setOpenModal(true);
    else toggleFavorite(roomId);
  };

  if (loading) return <Typography>Loading ads...</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" mb={2} sx={{ color: "#152C5B" }}>
        Most Popular Ads
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "repeat(3, 1fr)" },
          gridAutoRows: "auto",
          gap: 5,
          width: "88%",
          margin: "auto",
        }}
      >
        {ads.slice(0, 5).map((ad, index) => (
          <Card
            key={ad._id}
            sx={{
              gridColumn: {
                xs: "1 / -1",
                sm: "1 / -1",
                md: index === 0 ? "1 / 2" : `${(index % 2) + 2} / ${(index % 2) + 3}`,
              },
              gridRow: {
                xs: "auto",
                sm: "auto",
                md: index === 0 ? "1 / span 2" : `${Math.floor((index - 1) / 2) + 1} / ${Math.floor((index - 1) / 2) + 2}`,
              },
              position: "relative",
              borderRadius: 5,
              overflow: "hidden",
              "&:hover .overlay": { opacity: 1 },
            }}
          >
            <CardMedia
              component="img"
              height={index === 0 ? 400 : 180}
              image={ad.room.images[0] || loginBg}
              alt={ad.room.roomNumber}
            />

            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {/* <Link to={`/details/${ad.room._id}`}> */}
              <IconButton sx={{ color: "#fff" }}
              onClick={()=>navigate(`/details/${ad.room._id}`)}
              >
                <VisibilityIcon />
              </IconButton>
              {/* </Link> */}
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => handleFavoriteClick(ad.room._id)}
              >
                {favorites.has(ad.room._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>

            <Chip
              label={`$${ad.room.price} per night`}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "#FF498B",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "0 15px 0 15px",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                color: "#fff",
                zIndex: 2,
                padding: "10px",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {ad.room.roomNumber}
              </Typography>
              <Typography variant="body2">Capacity: {ad.room.capacity}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Modal login */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ fontWeight: "bold", color: "#152C5B", display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 1.5 }}>
          Login Required
          <IconButton onClick={() => setOpenModal(false)} edge="end" aria-label="close" sx={{ color: "#152C5B" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography>You must be logged in to add favorites.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/login")} variant="contained" color="primary">
            Login
          </Button>
          <Button onClick={() => navigate("/register")} variant="outlined" color="secondary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MostPopularAds;
