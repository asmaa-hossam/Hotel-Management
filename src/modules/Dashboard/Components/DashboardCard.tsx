import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";

interface DashboardData {
  rooms: number;
  facilities: number;
  ads: number;
}

export default function DashboardCards() {
  const [data, setData] = useState<DashboardData>({
    rooms: 0,
    facilities: 0,
    ads: 0,
  });

  useEffect(() => {
    axios
      .get("https://upskilling-egypt.com:3000/api/v0/admin/dashboard", {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setData({
          rooms: res.data.data.rooms,
          facilities: res.data.data.facilities,
          ads: res.data.data.ads,
        });
      })
      .catch((err) => console.error("Error fetching dashboard:", err));
  }, []);

  const cards = [
    { label: "Rooms", value: data.rooms },
    { label: "Facilities", value: data.facilities },
    { label: "Ads", value: data.ads },
  ];

  return (
    <Box
      display="flex"
      gap={3}
      justifyContent="center"
      mt={3}
      flexWrap="wrap" // allow wrapping on smaller screens
    >
      {cards.map((card) => (
        <Card
          key={card.label}
          sx={{
            bgcolor: "#1A1B1E",
            color: "white",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            boxShadow: 3,
            width: {
              xs: "100%",    // full width on extra small devices
              sm: 250,       // small screens: 250px
              md: 313,       // medium and above: 200px
            },
            height: {
              xs: 100,
              sm: 120,
              md:175,
            },
            mb: 2, // margin bottom for spacing when wrapped
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.8rem" },
              }}
            >
              {card.value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {card.label}
            </Typography>
          </CardContent>

          <Box
            sx={{
              bgcolor: "#1b2340",
              borderRadius: "50%",
              width: { xs: 35, sm: 40 },
              height: { xs: 35, sm: 40 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkIcon sx={{ color: "#203FC7", fontSize: { xs: 20, sm: 24 } }} />
          </Box>
        </Card>
      ))}
    </Box>
  );
}
