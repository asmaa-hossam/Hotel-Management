
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import type { AxiosResponse } from "axios";
import NoData from "../../Shared/Components/NoData/NoData";
import { Facilities_URL } from "../../../services/urls";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
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
  Modal
} from "@mui/material";


import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
// ---- Table Styles ----
const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
export default function BookingList() {
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
         toast.success(response?.data?.message)

        await getFacilities(token);
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

        <Box sx={{ m: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
   


const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function FacilityActions() {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<"view" | "edit" | "delete" | null>(null);

  const handleOpen = (type: "view" | "edit" | "delete") => {
    setActionType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActionType(null);
  };

  // Example data
  const facility = { id: 1, name: "OOP Facility", location: "Cairo" };

  return (
    <>
      {/* Action Menu Items */}
      <MenuItem onClick={() => handleOpen("view")}>
        <VisibilityIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
        View
      </MenuItem>
      <MenuItem onClick={() => handleOpen("edit")}>
        <EditOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
        Edit
      </MenuItem>
      <MenuItem onClick={() => handleOpen("delete")}>
        <DeleteOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#203FC7" }} />
        Delete
      </MenuItem>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {actionType === "view" && (
            <>
              <Typography variant="h6">View Facility</Typography>
              <Typography>Name: {facility.name}</Typography>
              <Typography>Location: {facility.location}</Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
                Close
              </Button>
            </>
          )}

          {actionType === "edit" && (
            <>
              <Typography variant="h6">Edit Facility</Typography>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                defaultValue={facility.name}
              />
              <TextField
                label="Location"
                fullWidth
                margin="normal"
                defaultValue={facility.location}
              />
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // ✅ Call API to update
                    console.log("Update facility");
                    handleClose();
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            </>
          )}

          {actionType === "delete" && (
            <>
              <Typography variant="h6" color="error">
                Delete Facility
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Are you sure you want to delete <b>{facility.name}</b>?
              </Typography>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // ✅ Call API to delete
                    console.log("Delete facility");
                    handleClose();
                  }}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}



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

      {/* <BookingListHeader /> */}
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
              <Typography variant="h5">Booking Table Details</Typography>
              <Typography variant="body1">You can check all details</Typography>
            </Box>
          

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
                  <StyledTableCell align="justify" >Room Number</StyledTableCell>
                  <StyledTableCell align="justify">Price</StyledTableCell>

                  <StyledTableCell align="justify">Start Date</StyledTableCell>
                  <StyledTableCell align="justify">End Date</StyledTableCell>
                  <StyledTableCell align="justify">User</StyledTableCell>
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
                    <StyledTableCell align="justify">{item.createdAt}</StyledTableCell>

                    <StyledTableCell align="justify">{item.updatedAt}</StyledTableCell>
                    <StyledTableCell align="justify">{item.name}</StyledTableCell>

                    {/* ✅ Last cell with three dots menu */}
                    <StyledTableCell align="justify">
                    <VisibilityIcon fontSize="small" color="primary" />

                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)
          : (
            <Typography>No data found</Typography>
          )}

    </Container>

  );
}
