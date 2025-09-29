import React, { useEffect, useState } from 'react'
import { axiosinstance, ROOMS_URLS } from '../../../../services/urls'
import type { RoomsData, ResRoomData } from '../../../../services/interfaces'
import { 
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CircularProgress, 
  Fade, 
  IconButton, 
  Menu, 
  MenuItem, 
  Paper, 
  Table, 
  TableBody, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Chip, 
  Stack 
} from '@mui/material'
import { StyledTableCell, StyledTableRow, theme } from '../../../../helperStyle/helperStyle'

import { ThemeProvider } from "@mui/material/styles";
import nodata from '.././../../../assets/images/nodata.jpg'
import { AttachMoney, MoreVert, Hotel, Add, Edit, Delete, Visibility } from '@mui/icons-material'
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DeleteConfirmationDialog from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation'

export default function RoomsList() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [AllRooms, setAllRooms] = useState<RoomsData[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<RoomsData | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const navigate = useNavigate();

  /**
   * التنقل لإضافة غرفة جديدة
   */
  const handleAddRoom = () => {
    navigate('/roomsForm')
  };

  /**
   * معالجة تغيير الصفحة
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    GetAllRooms(newPage + 1, rowsPerPage);
    console.log(event);
    
  };

  /**
   * معالجة تغيير عدد الصفوف في الصفحة
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    GetAllRooms(1, newSize);
  };

  /**
   * فتح قائمة الخيارات مع حفظ معرف الغرفة المحددة
   */
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, roomId: string) => {
    console.log("Opening menu for room ID:", roomId);
    setAnchorEl(event.currentTarget);
    setSelectedRoomId(roomId);
  };

  /**
   * إغلاق قائمة الخيارات
   */
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRoomId('');
  };

  /**
   * التنقل لتعديل الغرفة مع تمرير البيانات
   */
  const handleEdit = () => {
    const roomToEdit = AllRooms?.find(room => room._id === selectedRoomId);
    if (roomToEdit) {
      navigate('/roomsForm', {
        state: {
          roomToEdit: {
            _id: roomToEdit._id,
            name: roomToEdit.roomNumber,
            price: roomToEdit.price,
            capacity: roomToEdit.capacity,
            discount: roomToEdit.discount,
            category: roomToEdit.facilities?.map(f => f.name).join(',') || '',
            image: roomToEdit.images?.[0] || ''
          }
        }
      });
    }
    handleCloseMenu();
  };

  /**
   * فتح حوار تأكيد الحذف
   */
  const handleOpenDeleteDialog = () => {
    console.log("Opening delete dialog for room ID:", selectedRoomId);
    setOpenDeleteDialog(true);
    // لا نقفل الـ menu هنا ولا نمسح الـ selectedRoomId
    setAnchorEl(null); // فقط نقفل الـ menu
  };

  /**
   * إغلاق حوار تأكيد الحذف
   */
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedRoomId('');
  };

  /**
   * تأكيد حذف الغرفة
   */
  const handleConfirmDelete = async () => {
    console.log("handleConfirmDelete called with selectedRoomId:", selectedRoomId);
    
    if (!selectedRoomId) {
      console.error("No selectedRoomId found");
      toast.error("No room selected for deletion.");
      handleCloseDeleteDialog();
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting to delete room with URL:", ROOMS_URLS.DELETEROOM(selectedRoomId));
      
      const response = await axiosinstance.delete(ROOMS_URLS.DELETEROOM(selectedRoomId));
      console.log("Delete response:", response);
      
      toast.success("Room deleted successfully.");
      
      // إعادة تحميل القائمة
      await GetAllRooms(page + 1, rowsPerPage);
      
      handleCloseDeleteDialog();
    } catch (error: any) {
      console.error("Error deleting room:", error);
      console.error("Error response:", error.response);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to delete the room.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * جلب جميع الغرف من الخادم
   */
  const GetAllRooms = async (page: number, size: number) => {
    try {
      setLoading(true);
      const res = await axiosinstance.get<ResRoomData>(ROOMS_URLS.GETALLROOMS, {
        params: { page, size }
      });
      setAllRooms(res?.data?.data?.rooms);
      setTotalCount(res?.data?.data?.totalCount);
      setPage(page - 1); // لأن pagination في الواجهة تبدأ من 0
    } catch (error: any) {
      console.error('Error fetching rooms:', error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setAllRooms([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * جلب تفاصيل الغرفة حسب المعرف
   */
  const GetRoomDetails = async (id: string) => {
    try {
      setLoadingDetails(true);
      const response = await axiosinstance.get(ROOMS_URLS.GET_ROOM_BY_ID(id));
      setSelectedRoom(response.data.data.room);
    } catch (error: any) {
      console.error("Error fetching room details:", error);
      toast.error(error.response?.data?.message || "Failed to load room details.");
      setOpenViewDialog(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  /**
   * عند الضغط على View: فتح المودال وجلب التفاصيل
   */
  const handleView = () => {
    setOpenViewDialog(true);
    GetRoomDetails(selectedRoomId);
    handleCloseMenu();
  };

  /**
   * إغلاق مودال التفاصيل
   */
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedRoom(null);
  };

  /**
   * تحميل البيانات عند تحميل المكون
   */
  useEffect(() => {
    GetAllRooms(page + 1, rowsPerPage);
  }, []);

  return (
    <Box>
      {/* عنوان الصفحة وزر الإضافة */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Hotel sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h6" component="h6" fontWeight="bold" color="primary.main">
                  Rooms Table Details
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  You can check all details ({totalCount} rooms)
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                borderRadius: 3,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(33, 150, 243, 0.6)',
                }
              }}
              onClick={handleAddRoom}
            >
              Add New Room
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* عرض تحميل البيانات الأولي */}
      {loading && AllRooms.length === 0 ? (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress size={80} thickness={4} />
          <Typography variant="h6" color="textSecondary">
            Room data is loading...
          </Typography>
        </Box>
      ) : (
        <>
          {/* جدول الغرف */}
          <ThemeProvider theme={theme}>
            <TableContainer sx={{ maxHeight: "520px" }} component={Paper}>
              <Table aria-label='Sticky table' stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Room Number</StyledTableCell>
                    <StyledTableCell align='center'>Image</StyledTableCell>
                    <StyledTableCell align='center'>Price</StyledTableCell>
                    <StyledTableCell align='center'>Discount</StyledTableCell>
                    <StyledTableCell align='center'>Capacity</StyledTableCell>
                    <StyledTableCell align='center'>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {AllRooms?.map((room, index) => (
                    <Fade in={true} timeout={300 + index * 100} key={room._id}>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          <Typography variant="body1" fontWeight="medium">
                            {room.roomNumber}
                          </Typography>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Avatar
                            variant='rounded'
                            src={room.images[0] ? room.images[0] : nodata}
                            sx={{
                              width: 64,
                              height: 64,
                              mx: 'auto',
                              border: '2px solid #e0e0e0'
                            }}
                          />
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <AttachMoney color="success" fontSize="small" />
                            <Typography variant="body1" fontWeight="medium" color="success.main">
                              {room.price} 
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Chip
                            label={`${room.discount}%`}
                            color={room.discount > 0 ? "secondary" : "default"}
                            size="small"
                            variant={room.discount > 0 ? "filled" : "outlined"}
                          />
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Typography variant="body1">
                            {room.capacity} persons
                          </Typography>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <IconButton 
                            onClick={(e) => handleOpenMenu(e, room._id)}
                            size="small"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'primary.lighter'
                              }
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ThemeProvider>

          {/* ترقيم الصفحات */}
          <TablePagination
            component="div"
            count={totalCount || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="number of raws"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} from ${count !== -1 ? count : ` more than ${to}`}`
            }
          />
        </>
      )}

      {/* قائمة الخيارات */}
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleCloseMenu}
        disableAutoFocus
        disableEnforceFocus
        PaperProps={{
          sx: {
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: 2,
            mt: 1
          }
        }}
      >
        <MenuItem onClick={handleView} disabled={loading}>
          <Visibility sx={{ mr: 1 }} fontSize="small" />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {/* حوار تأكيد الحذف */}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        loading={loading}
        title="Delete Room?"
        message="Are you sure you want to delete this room? This action cannot be undone."
      />

      {/* مودال عرض تفاصيل الغرفة المحسن */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: '70vh',
            maxHeight: '85vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            Room Details
            {selectedRoom?.roomNumber && (
              <Typography component="span" variant="h6" color="text.secondary">
                {' '}- {selectedRoom.roomNumber}
              </Typography>
            )}
          </Typography>
        </DialogTitle>

        <DialogContent 
          dividers 
          sx={{ 
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          {loadingDetails ? (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              minHeight={300}
              flexDirection="column"
              gap={2}
            >
              <CircularProgress size={60} />
              <Typography variant="body1" color="text.secondary">
                Loading room details...
              </Typography>
            </Box>
          ) : selectedRoom ? (
            <Box>
              {/* الصورة الرئيسية - تحسين الحجم والموقع */}
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <img
                    src={selectedRoom.images?.[0] || nodata}
                    alt="Room"
                    style={{
                      width: "400px",
                      height: "280px",
                      objectFit: "cover",
                      display: 'block'
                    }}
                  />
                </Box>
              </Box>

              {/* جميع الصور في شريط صغير */}
              {selectedRoom.images && selectedRoom.images.length > 1 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="text.primary">
                    All Images:
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    flexWrap: 'wrap', 
                    justifyContent: 'center',
                    p: 2,
                    backgroundColor: 'grey.50',
                    borderRadius: 2
                  }}>
                    {selectedRoom.images.slice(0, 5).map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #ddd',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            transition: 'transform 0.2s ease'
                          }
                        }}
                      >
                        <img
                          src={image}
                          alt={`Room ${index + 1}`}
                          style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            cursor: 'pointer'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* التفاصيل في تخطيط محسن */}
              <Stack spacing={3}>
                {/* الصف الأول - المعلومات الأساسية */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 3,
                  p: 3,
                  backgroundColor: 'primary.lighter',
                  borderRadius: 2
                }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary.main" gutterBottom>
                      Room Number
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {selectedRoom.roomNumber || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="success.main" gutterBottom>
                      Price
                    </Typography>
                    <Typography variant="h6" color="success.main" fontWeight="medium">
                      {selectedRoom.price || "N/A"} EGP
                    </Typography>
                  </Box>
                </Box>

                {/* الصف الثاني */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 3,
                  p: 3,
                  backgroundColor: 'grey.50',
                  borderRadius: 2
                }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="secondary.main" gutterBottom>
                      Discount
                    </Typography>
                    <Typography variant="body1">
                      {selectedRoom.discount || "0"}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Capacity
                    </Typography>
                    <Typography variant="body1">
                      {selectedRoom.capacity || "N/A"} persons
                    </Typography>
                  </Box>
                </Box>

                {/* المرافق */}
                <Box sx={{ 
                  p: 3,
                  backgroundColor: 'info.lighter',
                  borderRadius: 2
                }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="info.main">
                    Facilities
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                    {selectedRoom.facilities?.length > 0 ? (
                      selectedRoom.facilities.map((facility) => (
                        <Chip
                          key={facility._id}
                          label={facility.name}
                          color="info"
                          variant="outlined"
                          size="small"
                          sx={{ 
                            borderRadius: 2,
                            fontWeight: 'medium'
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No facilities available
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              minHeight={300}
            >
              <Typography variant="body1" color="text.secondary">
                No room details available.
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1, borderTop: '1px solid #e0e0e0' }}>
          <Button 
            onClick={handleCloseViewDialog} 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
         
        </DialogActions>
      </Dialog>
    </Box>
  )
}