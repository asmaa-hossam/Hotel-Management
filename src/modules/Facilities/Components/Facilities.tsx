import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { Facilities_URL } from "../../../services/urls";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../../Shared/Components/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditFacilityModal from "./EditFacilityModal"; 
import Email from '../../../assets/images/Email.png'
import { toast } from "react-toastify";
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
  Modal,
} from "@mui/material";



// ---- Table Styles ----
const StyledTableCell = styled(TableCell)(({ }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E2E5EB",
    color: " #1F263E",
    fontWeight: "500",
    fontsize: "16px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    background: "#F8F9FB",

  },
}));

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
};
 type Facility = {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  };
 

// ---- Main Component ----
export default function Facilities() 
{

  const [FacilitiesList, setFacilities] = useState<Facility[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<string | null>(null);
  const token = localStorage.getItem("token");
 



// Open delete dialog from action menu
const handleDeleteClick = (id: string) => {
  setFacilityToDelete(id);
  setDeleteDialogOpen(true);
};

// Close dialog
const handleCloseDeleteDialog = () => {
  setDeleteDialogOpen(false);
  setFacilityToDelete(null);
};
  


  const handleConfirmDelete = async () => {
  if (!facilityToDelete) return;
  try {
    const token = localStorage.getItem("token");
    await axios.delete(Facilities_URL.DELETE(facilityToDelete), {
      headers: { Authorization: `${token}` },
    });
    toast.success("Facility deleted successfully!");
    handleCloseDeleteDialog();
    getFacilities(token); // refresh table
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error deleting facility");
  }
};


 // ---- inside Facilities component ----

const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [selectedId, setSelectedId] = useState<string | null>(null);
const [facilityDetails, setFacilityDetails] = useState<any>(null);
const [openDetailsModal, setOpenDetailsModal] = useState(false);
const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
const [editModalOpen, setEditModalOpen] = useState(false);


// handle edit click from menu
const handleEditFromMenu = (id: string) => {
  setSelectedFacilityId(id);
  setEditModalOpen(true);
};


// handle menu open/close
const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
  setAnchorEl(event.currentTarget);
  setSelectedId(id);
};
const handleMenuClose = () => {
  setAnchorEl(null);
  setSelectedId(null);
};

// fetch details by id
async function fetchFacilityDetails(id: string) {
  const token = localStorage.getItem("token");
  if (!token) return toast.error("No token found");

  try {
    setLoading(true);
    const response: AxiosResponse = await axios.get(
      Facilities_URL.DETAILS(id),
      { headers: { Authorization: `${token}` } }
      
    );
    const url = Facilities_URL.DETAILS(id)
      console.log("urlllllllllllllllllllllll", url)
      console.log("responseeeeeeeeeeeeeeeeeee",response)
    setFacilityDetails(response?.data?.data?.facility);
    setOpenDetailsModal(true);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error fetching facility");
  } finally {
    setLoading(false);
  }
}

// menu actions
const handleView = () => {
  if (selectedId) {
    fetchFacilityDetails(selectedId);
  }
  handleMenuClose();
};


  type CustomizedDialogsProps = {
    open: boolean;
    handleClose: () => void;
  };


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "500px", 
    maxWidth: "90%", 
    borderRadius: "10px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,   
    borderBottom: `1px solid ${theme.palette.divider}`, 
  },
  "& .MuiDialogActions-root": {
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
         toast.success(response?.data?.message)

        handleClose(); // close modal after success
        } 
       catch (error:any) {
        console.error("Error adding facility:", error);
         toast.error(error.response?.data?.message)
      }

    };

    return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >

        <Box sx={{ m: 0, display: "flex", justifyContent: "space-between",variant:"h6" ,fontWeight:"bold", alignItems: "center" }}>
          <DialogTitle id="customized-dialog-title">Add Facility</DialogTitle>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: "#151414ff" }}
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
            <Button type="submit" variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                backgroundColor: "#203FC7",
                fontWeight: "bold",
                width: "20px",
              }} autoFocus >
              Save
            </Button>
          </DialogActions>

        </form>
      </BootstrapDialog>
    );
  }



  // GET ALL FACILITIES 
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
      toast.error("Error fetching facilities:")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFacilities(token);
  }, [token]);
   






  return (
    <Container maxWidth="xl"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden", // prevents scroll
      }}>

      {/* <FacilitiesHeader /> */}
      {!loading && (
        <Container
          maxWidth={false}   // disables max-width restriction
          sx={{
            width: "100%",
            px: 2,           // optional horizontal padding
          }}
        >

          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}>
            <Box>
              <Typography variant="h5">Facilities Table Details</Typography>
              <Typography variant="body1">You can check all details</Typography>
            </Box>
            <Box>
              <Button   onClick={handleOpenDialog}
                variant="contained"
                sx={{ textTransform: "none", borderRadius: "5px" }}
              >
                Add New Facility
              </Button>
            </Box>
            <CustomizedDialogs open={openDialog} handleClose={handleCloseDialog} />

          </Box>

        </Container>)}
      {/* Table Section */}

      {loading ? (<Loader />) :
        FacilitiesList.length > 0 ?
          (<TableContainer
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
            <Table sx={{ backgroundColor: "#E2E5EB" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="justify" >Name</StyledTableCell>
                  <StyledTableCell align="justify">Price</StyledTableCell>

                  <StyledTableCell align="justify">Capacity</StyledTableCell>
                  <StyledTableCell align="justify">Discount</StyledTableCell>
                  <StyledTableCell align="justify">Active</StyledTableCell>
                  {/* <StyledTableCell align="right">Protein</StyledTableCell>  */}
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
                    <StyledTableCell align="justify">{item.createdAt.split("T")[0]}</StyledTableCell>

                    <StyledTableCell align="justify">{item.updatedAt.split("T")[0]}</StyledTableCell>
                    <StyledTableCell align="justify">{item.name}</StyledTableCell>
{/* ✅ Last cell: Action menu */}
  <StyledTableCell align="justify">
    <IconButton onClick={(e) => handleMenuClick(e, item._id)}>
      <MoreVertIcon />
    </IconButton>
  </StyledTableCell>



              </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            
          </TableContainer>)
          : (
            <Typography>No data found</Typography>
          )}


<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleView}>
    <VisibilityIcon fontSize="small" sx={{ mr: 1 , color: "primary.main"}} /> View
  </MenuItem>
  <MenuItem
    onClick={() => {
      if (selectedId) handleEditFromMenu(selectedId);
      handleMenuClose();
    }}
  >
    <EditOutlinedIcon fontSize="small" sx={{ mr: 1 , color: "primary.main"}} /> Edit
  </MenuItem>
  
  <MenuItem
  onClick={() => {
    if (selectedId) handleDeleteClick(selectedId);
    handleMenuClose();
  }}
>
  <DeleteOutlinedIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} /> Delete
  
</MenuItem>
</Menu>


<Modal open={openDetailsModal} onClose={() => setOpenDetailsModal(false)}>
  <Box
    sx={{
      ...modalStyle,
      bgcolor: "background.paper",
      borderRadius: 3,
      p: 3,
      boxShadow: 24,
      width: { xs: "90%", sm: 500 },
      maxHeight: "90vh",
      overflowY: "auto",
    }}
  >
    {/* Header */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e0e0e0",
        pb: 1,
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Facility Details
      </Typography>
      <IconButton
        onClick={() => setOpenDetailsModal(false)}
        sx={{
          color: "#555",
          "&:hover": { bgcolor: "#f0f0f0" },
          borderRadius: "50%",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>

    {/* Content: Read-only inputs */}
    {loading ? (
      <Loader />
    ) : facilityDetails ? (
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ID"
          value={facilityDetails?._id}
          InputProps={{ readOnly: true }}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Name"
          value={facilityDetails?.name}
          InputProps={{ readOnly: true }}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Created At"
          value={facilityDetails?.createdAt?.split("T")[0]}
          InputProps={{ readOnly: true }}
          fullWidth
          variant="outlined"
        />
      </Box>
    ) : (
      <Typography>No details found</Typography>
    )}

    {/* Footer Close Button */}
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
      <Button
        variant="contained"
        onClick={() => setOpenDetailsModal(false)}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          borderColor: "#203FC7",
          color: "#ffff",
        }}
      >
        Close
      </Button>
    </Box>
  </Box>
</Modal>



{selectedFacilityId && (
  <EditFacilityModal
    open={editModalOpen}
    handleClose={() => setEditModalOpen(false)}
    facilityId={selectedFacilityId}
    onUpdated={() => getFacilities(token)}   // refresh table after edit
  />
)} 




<Modal
  open={deleteDialogOpen}
  onClose={() => setDeleteDialogOpen(false)}
  aria-labelledby="delete-dialog-title"
  aria-describedby="delete-dialog-description"
  closeAfterTransition
  slotProps={{
    backdrop: {
      sx: { backgroundColor: "rgba(0,0,0,0.5)" }, // dark overlay
    },
  }}
>
  <Box
    sx={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      borderRadius: 3,
      p: 4,
      boxShadow: 24,
      width: { xs: "90%", sm: 400 },
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    {/* Illustration */}
    <Box
      component="img"
      src={Email} // your illustration
      alt="Delete Illustration"
      sx={{ width: "20%", mb: 2 }}
    />

    {/* Heading */}
    <Typography
      variant="h5"
      sx={{ fontWeight: "bold", fontSize: "24px", color: "#494949" }}
    >
      Delete This Item?
    </Typography>

    {/* Description */}
    <Typography
      variant="body1"
      sx={{ color: "#929292", fontSize: "16px", mb: 3 }}
    >
      Are you sure you want to delete this item? If you are sure, just click on delete.
    </Typography>

    {/* Buttons */}
    <Box display="flex" gap={2}>
      <Button
        variant="contained"
        color="error"
        onClick={handleConfirmDelete}
        sx={{ textTransform: "none", borderRadius: "8px" }}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setDeleteDialogOpen(false)}
        sx={{ textTransform: "none", borderRadius: "8px" }}
      >
        Cancel
      </Button>
    </Box>
  </Box>
</Modal>

    </Container>

  );
}




