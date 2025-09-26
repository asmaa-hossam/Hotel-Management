import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Button,
  Badge,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useFavorites } from "../../../../Context/FavoritesContext";
import { useAuthContext } from "../../../../Context/Context";
import Logo from "../../../../assets/images/Staycation..svg";
import { useNavigate } from "react-router-dom";
import { axiosinstance } from "../../../../services/urls";
import type { ProfileType, ApiResponse } from '../../../../services/interfaces';




const Navbar: React.FC = () => {
  const { favorites } = useFavorites();
  const { loginData, logOut } = useAuthContext();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Dropdown menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Fetch profile data
useEffect(() => {
  const fetchProfile = async () => {
    if (!loginData?._id) return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosinstance.get<ApiResponse>(`${loginData._id}`);
      if (res.data.data) {
        setProfile(res.data.data.user);
      } else {
        setError("Unexpected response structure");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [loginData]);


  const getDisplayName = () => profile?.userName || loginData?.userName || "";
  const getProfileImage = () => profile?.profileImage || "";

  return (
<AppBar
  position="fixed"
  sx={{
    bgcolor: "white",
    color: "black",
    padding: "12px",
    borderBottom: "1px solid #E5E5E5",
    boxShadow: "none",
    zIndex: (theme) => theme.zIndex.drawer + 1, // keep it above other elements
  }}
>

      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <img src={Logo} alt="Logo" style={{ height: 39, width: 148 }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/explore")}>
            Explore
          </Button>

          {loginData ? (
            <>
              <Button color="inherit" onClick={() => navigate("/")}>
                Reviews
              </Button>
              <Button
                color="inherit"
                startIcon={
                  <Badge badgeContent={favorites.size} color="error">
                    <FavoriteIcon />
                  </Badge>
                }
                onClick={() => navigate("/favourite")}
              >
                Favorites
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {loading ? (
                  <Avatar sx={{ width: 40, height: 40 }}>...</Avatar>
                ) : (
                  <Avatar
                    alt={getDisplayName()}
                    src={getProfileImage()}
                    sx={{ width: 40, height: 40 }}
                  />
                )}
                <Typography variant="body2" fontWeight="bold">
                  {getDisplayName()}
                </Typography>

                {/* Dropdown Menu */}
                <IconButton onClick={handleMenuOpen}>
                  <KeyboardArrowDownIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      logOut();
                      navigate("/"); 
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>

              {error && (
                <Box sx={{ color: "red", fontSize: "12px" }}>Error: {error}</Box>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: "#3252DF",
                  color: "white",
                  "&:hover": { bgcolor: "#3651c9ff" },
                  width: "30%",
                  boxShadow: "4px 4px 5px #323edf75",
                }}
              >
                Login Now
              </Button>

              <Button
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: "#3252DF",
                  color: "white",
                  "&:hover": { bgcolor: "#3651c9ff" },
                  width: "30%",
                  boxShadow: "4px 4px 5px #323edf75",
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
