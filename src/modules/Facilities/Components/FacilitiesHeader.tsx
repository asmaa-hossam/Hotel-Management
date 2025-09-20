import React from 'react'
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
export default function FacilitiesHeader() {

  return (
    <div>
        {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "20px",
            }}
          >
            Facilities Table Details
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "text.secondary",
            }}
          >
            You can check all details
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#203FC7",
            fontWeight: "bold",
            width: "224px",
          }}
        >
          Add New Facility
        </Button>
      </Box>
    </div>
  )
}
