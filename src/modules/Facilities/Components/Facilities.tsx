
import * as React from "react";
import { useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios  from "axios";
import type { AxiosResponse } from "axios";
import NoData from "../../Shared/Components/NoData/NoData";
import { Facilities_URL } from "../../../services/urls";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import DeleteConfirmation from "../../Shared/Components/deleteConfrim/deleteConfrim";
import Loader from "../../Shared/Components/Loader/Loader";
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
  Container,
  TextField,
  CircularProgress,
} from "@mui/material";


 import VisibilityIcon from "@mui/icons-material/Visibility";
 import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
 import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
 import Tooltip from "@mui/material/Tooltip";
import {toast } from "react-toastify";
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


// function createData(
//   _id: string,
//   name: string,
//   createdAt: string,
//   updatedAt: string,

// ) {
//   return { _id,name, createdAt, updatedAt};
// }


// ---- Main Component ----

  export default function Facilities() {


  type Facility = {
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  };

 type CustomizedDialogsProps = {
  open: boolean;
  handleClose: () => void;
  };




  const [FacilitiesList, setFacilities] = useState<Facility[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false); 
  const token = localStorage.getItem("token");
  console.log(token,"tokeeeeeeeeeeeeen")



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomizedDialogs({ open, handleClose }: CustomizedDialogsProps) {

  const [facilityName, setFacilityName] = useState<string>("");


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
  
    const response: AxiosResponse = await axios.post(
      Facilities_URL.CREATE, 
      { name: facilityName }, // request body
      {
        headers: {
          Authorization: `${token}`, // if your API needs auth
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Facility added:", response.data);

    // Optionally refresh facilities list
    await getFacilities(token);
    handleClose(); // close modal after success
  } catch (error) {
    console.error("❌ Error adding facility:", error);
    toast.error("❌ Error adding facility")
  }

};

  return (
    <BootstrapDialog 
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >

      <Box sx={{ m: 0,display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <DialogTitle   id="customized-dialog-title">Add Facility</DialogTitle>

       <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: "#151414ff"}}
        >
          <CloseIcon />
        </IconButton>
      </Box>
   



    <form onSubmit={handleSubmit}>
        <DialogContent >
       <TextField
  fullWidth
  label="Name"
  variant="outlined"
  margin="normal"
  value={facilityName}
  required
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setFacilityName(e.target.value)
  }
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px", // rounded corners
      backgroundColor: "#f9f9f9", // light background
      "& fieldset": {
        borderColor: "#ccc", // default border
      },
      "&:hover fieldset": {
        borderColor: "#203FC7", // hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#203FC7", // focus border color
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "14px",
      color: "#323C47",
    },
    "& .MuiInputBase-input": {
      fontFamily: "Poppins, sans-serif",
      fontSize: "14px",
      padding: "12px 14px",
    },
  }}
/>


   
        </DialogContent>
              <DialogActions>
        <Button    type="submit" variant="contained" 
             sx={{
               textTransform: "none",
               borderRadius: "8px",
               backgroundColor: "#203FC7",
               fontWeight: "bold",
               width: "20px",
             }}autoFocus >
          Save 
        </Button>
      </DialogActions>
     
      </form>




   

    </BootstrapDialog>
  );
}


  async function getFacilities(token: string | null): Promise<void> {
    try {

      setLoading(true)
      if (!token) return console.warn("No token provided");

      const response: AxiosResponse = await axios.get(Facilities_URL.GETALL, {
        headers: { Authorization: `${token}` }, 
      });

      console.log("Full response:", response.data.data.facilities);

      setFacilities(response.data.data.facilities)

    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
    finally{
      setLoading(false)
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
          <EditOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
         {/* <i className="fa fa-edit" style={{ marginRight: 6, color: "#203FC7"}}></i> */}
        Edit 
        </MenuItem>
        <MenuItem onClick={handleClose }>
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

   {/* <FacilitiesHeader /> */}

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
                 fontWeight: 550,
                 fontSize: "15px",
                 color: "#1b2031ff",
                 // fontWeight:"bold"
                 
   
               }}
             >
               Facilities Table Details
             </Typography>
             <Typography
               variant="body2"
               sx={{
                 fontFamily: "Poppins, sans-serif",
                 fontSize: "11px",
                 color: "#323C47",
   
               }}
             >
               You can check all details
             </Typography>
           </Box>
   
           <Button   onClick={handleOpenDialog}
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
           <CustomizedDialogs open={openDialog} handleClose={handleCloseDialog} />

         </Box>



      {/* Table Section */}
      
     {loading? (<Loader/>) :
      FacilitiesList.length > 0 ?
 (
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
      {FacilitiesList?.map((item) => (
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
     </TableContainer>)
 :(
      <Typography>No data found</Typography>
    )}

    
    </Box>
</Container>
 
  );
}




