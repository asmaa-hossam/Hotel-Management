import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import type { AxiosResponse } from "axios";
import {BOOKING_URL} from "../../../services/urls";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  CircularProgress,
  Modal,
  TablePagination,
} from "@mui/material";



//Table Styles 
const StyledTableCell = styled(TableCell)(({}) => ({
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

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffff",
  },
    "&:nth-of-type(even)": {
    backgroundColor: "#F8F9FB",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    // background: "#F8F9FB",

  },
}));




export default function BookingList() {

    type BookingList = {
    _id: string,
    totalPrice:string,
    Active:string
    endDate:string,
    startDate:string,
    User:string,
    room:{
      roomNumber:string},
    user :{
     userName:string,} 
  };

 

  const [BookingList, setBookingList] = useState<BookingList[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const[total,setTotal]  =useState(0)
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("token");


  // GET ALL FACILITIES 
  async function getBookingList(token: string  | null, page = 1, size = 10): Promise<void> {
    try {

      setLoading(true)
      if (!token) return console.warn("No token provided");
      console.log("Fetching from:", BOOKING_URL.GETALL);

      const response: AxiosResponse = await axios.get(`${BOOKING_URL.GETALL}?page=${page}&size=${size}` ,
        {
        headers: { Authorization: `${token}` },
        });

      console.log("Full response:", response);

      setBookingList(response.data.data.booking)
      setTotal(response.data.data.totalCount);
     
    } catch (error) {
      console.error("Error fetching BookingList", error);
      toast.error("Error fetching BookingList")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBookingList(token);
  }, [token]);
   
  const handleOpen = (row: any) =>
  {
     
    setOpen(true);
    setSelectedRow(row)
    console.log("clicked row:", row); // <--- debug: make sure this is correct

  }


  return (

    <Container
  maxWidth="xl"
>
  {/* Header Section */}
  <Container
    maxWidth={false}
    sx={{
      width: "100%",
      px: 2,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      mb:2
    }}
  >
    <Box >
      <Typography variant="h5">Booking Table Details</Typography>
      <Typography variant="body1">You can check all details</Typography>
    </Box>
  </Container>

  {/* Table Section */}

<TableContainer
  component={Paper}
  sx={{
    overflowX: "auto",
    borderRadius: 2,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  }}
>
  <Table sx={{ backgroundColor: "#E2E5EB" }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="justify">Room Number</StyledTableCell>
        <StyledTableCell align="justify">Price</StyledTableCell>
        <StyledTableCell align="justify">Start Date</StyledTableCell>
        <StyledTableCell align="justify">End Date</StyledTableCell>
        <StyledTableCell align="justify">User</StyledTableCell>
        <StyledTableCell align="justify">Actions</StyledTableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {!loading && BookingList.length > 0 ? (
        BookingList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
          <StyledTableRow key={item._id}>
            <StyledTableCell>{item.room.roomNumber}</StyledTableCell>
            <StyledTableCell>{item.totalPrice}</StyledTableCell>
            <StyledTableCell>{item.startDate.split("T")[0]}</StyledTableCell>
            <StyledTableCell>{item.endDate.split("T")[0]}</StyledTableCell>
            <StyledTableCell>{item.user.userName}</StyledTableCell>
            <StyledTableCell>
            
          <IconButton onClick={() => handleOpen(item)}>
          <VisibilityIcon color="primary" />
          </IconButton>


            </StyledTableCell>
          </StyledTableRow>
        ))
      ) : !loading ? (
        ""
      ) : null}
    </TableBody>
  </Table>
</TableContainer>

  <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={total} // comes from API response
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(e, newPage) => {
    setPage(newPage);
    getBookingList(token, newPage + 1, rowsPerPage); // API pages usually 1-based
  }}
  onRowsPerPageChange={(e) => {
    const newSize = parseInt(e.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    getBookingList(token, 1, newSize);
  }}
/>
     <Modal open={open} onClose={handleClose}>
  <Box
    sx={{
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 2,
      p: 4,
    }}
  >
 

    {selectedRow && (
      <>
        <TextField
          label="User"
          value={selectedRow.user.userName}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Room Number"
          value={selectedRow.room.roomNumber}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Price"
          value={`$${selectedRow.totalPrice}`}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Start Date"
          value={selectedRow.startDate.split("T")[0]}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="End Date"
          value={selectedRow.endDate.split("T")[0]}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
      </>
    )}

    <Box mt={3} textAlign="right">
      <Button variant="contained" onClick={handleClose}>
        Close
      </Button>
    </Box>
  </Box>
</Modal>

 {loading && (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
    <CircularProgress size={80} />
  </Box>
)}
</Container>

  

  );
}
