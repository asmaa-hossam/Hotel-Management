import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useFavorites } from "../../../Context/FavoritesContext";
import { useAuthContext } from "../../../Context/Context"; 
import loginBg from "../../../assets/images/Group 33.png";
import NoData from "../../Shared/Components/NoData/NoData";

interface Ad {
  _id: string;
  room: {
    _id: string;
    roomNumber: string;
    capacity: number;
    images: string[];
  };
}

const FavoritesPage: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const { favorites, toggleFavorite } = useFavorites();
  // const { loginData } = useAuthContext();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://upskilling-egypt.com:3000/api/v0/portal/ads"
        );
        if (res.data.success && res.data.data.ads) {
          setAds(res.data.data.ads);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAds();
  }, []);

  const favAds = ads.filter(ad => favorites.has(ad.room._id));

  return (
    <Box sx={{ padding: 2 }}>
<Box 
  display="flex" 
  // alignItems="center" 
  justifyContent="space-between"
  position="relative"
  padding={'25px'}
  
 
 
>
  {/* Left side */}
  <Typography  mb={2} sx={{ color: "#B0B0B0",fontSize:"18px"}}>
    Home / Favorites
  </Typography>

  {/* Centered text */}
  <Typography 
    variant="h6" 
    mb={2} 
    sx={{ 
      color: "#152C5B", 
      position: "absolute", 
      left: "50%", 
      transform: "translateX(-50%)", 
      fontSize:"36px",
      fontWeight:"600"
    }}
  >
    Your Favorites
  </Typography>
</Box>




      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          width: "88%",
          margin: "auto",
        }}
      >
        {favAds.length > 0 ? (
          favAds.map((ad) => (
            <Card
              key={ad._id}
              sx={{
                position: "relative",
                borderRadius: 5,
                overflow: "hidden",
                height: 250,
                "&:hover .overlay": { opacity: 1 },
              }}
            >
              <CardMedia
                component="img"
                height={250}
                image={ad.room.images[0] || loginBg}
                alt={ad.room.roomNumber}
              />

              {/* Overlay with favorite toggle */}
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
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <IconButton
                  sx={{ color: "#fff" }}
                  onClick={() => toggleFavorite(ad.room._id)}
                >
                  {favorites.has(ad.room._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              {/* Room info */}
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
          ))
        ) : (
          <Typography><NoData /></Typography>
        )}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
