import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import load from "../../../assets/react.svg";
import { axiosinstanceAdmin } from "../../../services/urls";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardData {
  bookings: {
    pending: number;
    completed: number;
  };
  users: {
    user: number;
    admin: number;
  };
}

export default function DashboardCharts() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchDashboard = async () => {
    try {
      const res = await axiosinstanceAdmin.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      if (res.data.success && res.data.data) setData(res.data.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <img src={load} alt="loading..." />
      </Box>
    );

  if (!data) return <Typography>No data available</Typography>;

  const bookingsData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [data.bookings.pending, data.bookings.completed],
        backgroundColor: ["#3f51b5", "#9c27b0"],
        borderColor: ["#3f51b5", "#9c27b0"],
        borderWidth: 4,
        hoverOffset: 20,
      },
    ],
  };

  const usersData = {
    labels: ["User", "Admin"],
    datasets: [
      {
        data: [data.users.user, data.users.admin],
        backgroundColor: ["#4caf50", "#2196f3"],
        borderColor: ["#4caf50", "#2196f3"],
        borderWidth: 4,
        hoverOffset: 20,
      },
    ],
  };

  const optionsBookings = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: { usePointStyle: true, pointStyle: "circle", padding: 20, font: { size: 14 } },
      },
    },
    cutout: "60%",
    maintainAspectRatio: false,
    responsive: true,
  };

  const optionsUsers = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: { usePointStyle: true, pointStyle: "circle", padding: 20, font: { size: 14 } },
      },
    },
    cutout: "90%",
    maintainAspectRatio: false,
    responsive: true,
  };

  const isBookingsEmpty = data.bookings.pending === 0 && data.bookings.completed === 0;
  const isUsersEmpty = data.users.user === 0 && data.users.admin === 0;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-evenly"
      alignItems="flex-start"
      gap={{ xs: 5, md: 22 }}
      pt={5}
    >
      {/* Bookings Chart */}
      <Box
        flex="1 1 60%"
        maxWidth="360px"
        minWidth="300px"
        height={{ xs: 350, md: 300 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="12px"
        p={2}
        bgcolor="transparent"
      >
        {isBookingsEmpty ? (
          <Typography>No bookings data</Typography>
        ) : (
          <Box width="100%" height="100%">
            <Doughnut data={bookingsData} options={optionsBookings} />
          </Box>
        )}
      </Box>

      {/* Users Chart */}
      <Box
        flex="1 1 35%"
        maxWidth="300px"
        minWidth="250px"
        height={{ xs: 250, md: 280 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="12px"
        p={2}
        bgcolor="transparent"
      >
        {isUsersEmpty ? (
          <Typography>No users data</Typography>
        ) : (
          <Box width="100%" height="100%">
            <Doughnut data={usersData} options={optionsUsers} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
