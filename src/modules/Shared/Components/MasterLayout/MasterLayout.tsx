import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
       
      >
        <SideBar />
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <Box
          sx={{
            height: 64,
            color: "white",
            display: "flex",
            alignItems: "center",
            px: 2,
          }}
        >
          <Navbar />
        </Box>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
