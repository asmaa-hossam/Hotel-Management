// src/modules/Dashboard/Components/DashboardGraph.tsx

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
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

  useEffect(() => {
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
        if (res.data.success && res.data.data) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <img src={load} alt="loading..." />
      </Box>
    );
  }

  if (!data) return <Typography>No data available</Typography>;

  // Reusable options
  const createOptions = (cutout: string) => ({
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: { size: 14 },
        },
      },
    },
    cutout,
    maintainAspectRatio: false,
    responsive: true,
  });

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

  const isBookingsEmpty =
    data.bookings.pending === 0 && data.bookings.completed === 0;
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
      <ChartCard
        title=""
        isEmpty={isBookingsEmpty}
        data={bookingsData}
        options={createOptions("60%")}
        height={{ xs: 350, md: 300 }}
      />

      {/* Users Chart */}
      <ChartCard
        title="Users"
        isEmpty={isUsersEmpty}
        data={usersData}
        options={createOptions("90%")}
        height={{ xs: 250, md: 280 }}
      />
    </Box>
  );
}

// 🔹 Reusable Chart Card Component
type ChartCardProps = {
  title: string;
  isEmpty: boolean;
  data: any;
  options: any;
  height: { xs: number; md: number };
};

function ChartCard({ title, isEmpty, data, options, height }: ChartCardProps) {
  return (
    <Box
      flex="1 1 50%"
      maxWidth="360px"
      minWidth="250px"
      height={height}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="12px"
      p={2}
      bgcolor="transparent"
    >
      <Typography variant="subtitle1" mb={2}>
        {title}
      </Typography>
      {isEmpty ? (
        <Typography>No {title.toLowerCase()} data</Typography>
      ) : (
        <Box width="100%" height="100%">
          <Doughnut data={data} options={options} />
        </Box>
      )}
    </Box>
  );
}
