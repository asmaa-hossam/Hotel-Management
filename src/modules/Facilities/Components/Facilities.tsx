
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios  from "axios";
import type { AxiosResponse } from "axios";
import { useAuthContext } from "../../../Context/Context";
import { Facilities_URL } from "../../../services/urls";

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
  IconButton,
  Menu,
  MenuItem,
  Container
} from "@mui/material";
 import VisibilityIcon from "@mui/icons-material/Visibility";
 import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
 import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
 import Tooltip from "@mui/material/Tooltip";

import FacilitiesHeader from "./FacilitiesHeader";
// ---- Table Styles ----
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E2E5EB",
    color: " #1F263E",
    fontWeight: "500",
    fontsize:"16px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    background: "#F8F9FB",

  },
}));

// ---- Dummy Data ----
function createData(
  name: string,
  createdAt: string,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, createdAt, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", "2025-09-01", 6.0, 24, 4.0),
  createData("Ice cream sandwich", "2025-09-05", 9.0, 37, 4.3),
  createData("Eclair", "2025-09-10", 16.0, 24, 6.0),
  createData("Cupcake", "2025-09-12", 3.7, 67, 4.3),
  createData("Gingerbread", "2025-09-15", 16.0, 49, 3.9),
];

// ---- Main Component ----
export default function Facilities() {

  type Facility = {
    name:string,
    createdAt:string,
    Discount	:number,
   Capacity: string,
   Active:Boolean
  };
  const[FacilitiesList,setFacilitesList] =useState<Facility[]>([]);
  const {loginData} =useAuthContext()

async function getFacilities(

): Promise<Facility[]> {
  const url =  Facilities_URL.GETALL;
  
  try {
    const res: AxiosResponse<any> = await axios.get(url, {
      headers: {
        ...(loginData ? { Authorization: `Bearer ${loginData}` } : {}),
        "Content-Type": "application/json",
      },
      
      timeout: 15000, 
    });


    const payload = res.data;
   
    setFacilitesList(payload)
    console.log(payload)
  
    throw new Error("Unexpected response structure from server");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const msg =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message;
      throw new Error(`Failed to fetch facilities: ${msg}`);
    }
    if (error.name === "CanceledError" || error?.message === "canceled") {
      throw new Error("Request canceled");
    }
    throw error;
  }
}

 function ThreeDotsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="More actions">
        <IconButton
          size="small"
          aria-label="more"
          aria-controls={open ? "three-dots-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        id="three-dots-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 48 * 4.5,
            borderRadius: 2,
            minWidth: 150, // ✅ safe minimum, won’t break table
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
          View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EditOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}


 

  return (
    <Container maxWidth="xl"   sx={{ py: { xs: 2, sm: 2,md: 4 } }}>
       <Box
    sx={{
      width: "100%",
      maxWidth: 1200,
      mx: "auto",
      px: { xs: 1, sm: 2, md: 4 }, // responsive padding
    
    }}
  >

   <FacilitiesHeader/>
      {/* Table Section */}


      <TableContainer
  component={Paper}
  sx={{
    // width: "100%",
    overflowX: "auto", // ✅ keeps responsiveness
    borderRadius: 2,
    mt: 2,
     scrollbarWidth: "none", // Firefox
    "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
  }}
>
  <Table sx={{backgroundColor: "#E2E5EB" }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell align="right">Created At</StyledTableCell>
        <StyledTableCell align="right">Discount</StyledTableCell>
        <StyledTableCell align="right">Carbs</StyledTableCell>
        <StyledTableCell align="right">Protein</StyledTableCell>
        <StyledTableCell align="right">Actions</StyledTableCell> 
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.name}>
          <StyledTableCell
            component="th"
            scope="row"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
          <StyledTableCell align="right">{row.fat}</StyledTableCell>
          <StyledTableCell align="right">{row.carbs}</StyledTableCell>
          <StyledTableCell align="right">{row.protein}</StyledTableCell>

          {/* ✅ Last cell with three dots menu */}
          <StyledTableCell align="right">
            <ThreeDotsMenu />
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


    
    </Box>
</Container>
 
  );
}




