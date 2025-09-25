import React from "react";
import { AppBar, Toolbar, Box, Avatar, Typography, Button, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../../../../Context/FavoritesContext";
import { useAuthContext } from "../../../../Context/Context";
import Logo from "../../../../assets/images/Staycation..svg";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { favorites } = useFavorites();
  const { loginData, logOut } = useAuthContext();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: "white", color: "black", padding: "12px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <img src={Logo} alt="Logo" style={{ height: 39, width: 148 }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/explore")}>Explore</Button>

          {loginData ? (
            <>
              <Button
                color="inherit"
                startIcon={<Badge badgeContent={favorites.size} color="error"><FavoriteIcon /></Badge>}
                onClick={() => navigate("/favourite")}
              >
                Favorites
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar alt={loginData.userName} src="" />
                <Button onClick={logOut}>Logout</Button>
              </Box>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
