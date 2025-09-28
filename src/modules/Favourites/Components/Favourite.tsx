import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../../../Context/FavoritesContext";
import loginBg from "../../../assets/images/Group 33.png";
import NoData from "../../Shared/Components/NoData/NoData";
import { axiosinstance, ads_PORTAL_URL } from "../../../services/urls";
import { useTranslation } from "react-i18next";

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
  const [adsLoading, setAdsLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const { t } = useTranslation("favorites");

  useEffect(() => {
    const fetchAds = async () => {
      setAdsLoading(true);
      try {
        const res = await axiosinstance.get(ads_PORTAL_URL.FETCH);
        if (res.data.success && res.data.data.ads) {
          setAds(res.data.data.ads);
        }
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setAdsLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Filter ads that are in favorites
  const favAds = ads.filter((ad) => favorites.has(ad.room._id));

  // Show loading if favorites or ads are still loading
  if (adsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 15 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        position="relative"
        padding="30px"
      >
        <Typography sx={{ color: "#B0B0B0", fontSize: "18px", mt: "20px" }}>
          {t("breadcrumb")}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#152C5B",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "36px",
            fontWeight: 600,
          }}
        >
          {t("title")}
        </Typography>
      </Box>

      {/* Favorites Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          width: "92%",
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

              {/* Favorite Overlay */}
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
                  {favorites.has(ad.room._id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>

              {/* Room Info */}
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
                <Typography variant="body2">
                  {t("capacity")}: {ad.room.capacity}
                </Typography>
              </Box>
            </Card>
          ))
        ) : (
          <NoData />
        )}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
