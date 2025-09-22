
import * as React from "react";
import { useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios  from "axios";
import type { AxiosResponse } from "axios";
import { useAuthContext } from "../../../Context/Context";
import NoData from "../../Shared/Components/NoData/NoData";
import { Facilities_URL } from "../../../services/urls";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string,

) {
  return { _id,name, createdAt, updatedAt};
}


// ---- Main Component ----

 
  

  export default function Facilities() {


  type Facility = {
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  };


  const [FacilitiesList, setFacilities] = useState<Facility[]>([]);
  const token = localStorage.getItem("token");
  console.log(token,"tokeeeeeeeeeeeeen")
  async function getFacilities(token: string | null): Promise<void> {
    try {
      if (!token) return console.warn("No token provided");

      const response: AxiosResponse = await axios.get(Facilities_URL.GETALL, {
        headers: { Authorization: `${token}` }, 
      });

      console.log("Full response:", response.data.data.facilities);

      setFacilities(response.data.data.facilities)

    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  }

  useEffect(() => {
    getFacilities(token);
  }, [token]);




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
          {/* <EditOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} /> */}
        <i className="fa fa-edit "  style={{ marginRight: 6, color: "#203FC7"}}></i>  Edit
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
    <Container maxWidth="xl"   sx={{ py: { xs: 2, sm: 2,md: 2} }}>
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

      {FacilitiesList.length > 0 ?

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
  <Table sx={{backgroundColor: "#E2E5EB"}} aria-label="customized table">
    <TableHead>
      <TableRow>
       <StyledTableCell align="justify" >Name</StyledTableCell>
        <StyledTableCell align="justify">Name</StyledTableCell>

        <StyledTableCell align="justify">CreatedAT</StyledTableCell>
        <StyledTableCell align="justify">updatedAT</StyledTableCell>
        {/* <StyledTableCell align="right">Carbs</StyledTableCell>
        <StyledTableCell align="right">Protein</StyledTableCell> */}
        <StyledTableCell align="justify">Actions</StyledTableCell> 
      </TableRow>
    </TableHead>
    <TableBody>
      {FacilitiesList.map((item) => (
        <StyledTableRow key={item._id}>
          <StyledTableCell
            component="th"
            scope="row"
            sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
          >
            {item.name}
          </StyledTableCell>
          <StyledTableCell align="justify">{item.name}</StyledTableCell> 
          <StyledTableCell align="justify">{item.createdAt}</StyledTableCell>

           <StyledTableCell align="justify">{item.updatedAt}</StyledTableCell>
          {/* <StyledTableCell align="right">{item.name}</StyledTableCell>  */}

          {/* ✅ Last cell with three dots menu */}
          <StyledTableCell align="justify">
            <ThreeDotsMenu />
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
     </TableContainer>
 :<NoData/>}

    
    </Box>
</Container>
 
  );
}




