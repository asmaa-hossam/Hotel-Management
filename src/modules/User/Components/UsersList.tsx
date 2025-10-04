
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  IconButton,
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
  Button,
  Chip,
  Stack
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Shield as ShieldIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { StyledTableCell, StyledTableRow, theme } from '../../../helperStyle/helperStyle';
import { ThemeProvider } from "@mui/material/styles";
import TablePagination from '@mui/material/TablePagination';
import { axiosinstance, ROOMS_URLS } from '../../../services/urls';
import type { User, UserRes } from '../../../services/interfaces';
import { toast } from 'react-toastify';
import nodata from '.././../../assets/images/nodata.jpg';

export default function UsersList() {
  // حالات الصفحة والجدول
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  
  // حالات الحوارات
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [loadingDetails, setLoadingDetails] = useState(false);

  /**
   * معالجة تغيير الصفحة
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    fetchUsers(newPage + 1, rowsPerPage);
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
    fetchUsers(1, newSize);
  };

  /**
   * عرض تفاصيل المستخدم
   */
  const handleView = (user: User) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  /**
   * إغلاق حوار عرض التفاصيل
   */
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedUser(null);
  };

  /**
   * تنسيق التاريخ
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * جلب جميع المستخدمين من الخادم
   */
  const fetchUsers = async (page: number, size: number) => {
    try {
      setLoading(true);
      const res = await axiosinstance.get<UserRes>(ROOMS_URLS.GETALLUSER, {
        params: { page, size }
      });
      setUsers(res.data.data.users);
      setTotalCount(res.data.totalCount);
      setPage(page - 1); // لأن pagination في الواجهة تبدأ من 0
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * تحميل البيانات عند تحميل المكون
   */
  useEffect(() => {
    fetchUsers(page + 1, rowsPerPage);
  }, []);

  return (
    <Box>
      {/* عنوان الصفحة */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h6" component="h6" fontWeight="bold" color="primary.main">
                  Users Table Details
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  You can check all details ({totalCount} users)
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* عرض تحميل البيانات الأولي */}
      {loading && users.length === 0 ? (
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
            User data is loading...
          </Typography>
        </Box>
      ) : (
        <>
          {/* جدول المستخدمين */}
          <ThemeProvider theme={theme}>
            <TableContainer sx={{ maxHeight: "520px" }} component={Paper}>
              <Table aria-label='Sticky table' stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='center'>Profile</StyledTableCell>
                    <StyledTableCell align='center'>Username</StyledTableCell>
                    <StyledTableCell align='center'>Email</StyledTableCell>
                    <StyledTableCell align='center'>Phone</StyledTableCell>
                    <StyledTableCell align='center'>Country</StyledTableCell>
                    <StyledTableCell align='center'>Role</StyledTableCell>
                    <StyledTableCell align='center'>Status</StyledTableCell>
                    <StyledTableCell align='center'>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users?.map((user, index) => (
                    <Fade in={true} timeout={300 + index * 100} key={user._id}>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          <Avatar
                            src={user.profileImage || nodata}
                            sx={{
                              width: 64,
                              height: 64,
                              mx: 'auto',
                              border: '2px solid #e0e0e0'
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Typography variant="body1" fontWeight="medium">
                            {user.userName}
                          </Typography>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <EmailIcon color="primary" fontSize="small" />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                              {user.email}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <PhoneIcon color="secondary" fontSize="small" />
                            <Typography variant="body2">
                              {user.phoneNumber}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                            <LocationIcon color="action" fontSize="small" />
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {user.country}
                            </Typography>
                          </Box>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Chip
                            icon={<ShieldIcon sx={{ fontSize: 16 }} />}
                            label={user.role}
                            color={user.role === 'admin' ? 'secondary' : 'primary'}
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </StyledTableCell>

                         <StyledTableCell align="center">
                          <Chip
                            icon={user.verified ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <CancelIcon sx={{ fontSize: 16 }} />}
                            label={user.verified ? 'Verified' : 'Not Verified'}
                            color={user.verified ? 'success' : 'error'}
                            variant="outlined"
                            size="small"
                          />
                        </StyledTableCell> 
                         
                        <StyledTableCell align="center">
                          <IconButton 
                            onClick={() => handleView(user)}
                            size="small"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'primary.lighter'
                              }
                            }}
                          >
                            <VisibilityIcon />
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
            labelRowsPerPage="عدد الصفوف:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
            }
          />
        </>
      )}

      {/* حوار عرض تفاصيل المستخدم */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: '60vh',
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            User Details
            {selectedUser?.userName && (
              <Typography component="span" variant="h6" color="text.secondary">
                {' '}- {selectedUser.userName}
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
          {selectedUser ? (
            <Box>
              {/* الصورة الشخصية */}
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 4
                }}
              >
                <Avatar
                  src={selectedUser.profileImage || nodata}
                  sx={{
                    width: 150,
                    height: 150,
                    border: '4px solid #e0e0e0',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <PersonIcon sx={{ fontSize: 80 }} />
                </Avatar>
              </Box>

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
                      Username
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {selectedUser.userName || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary.main" gutterBottom>
                      Role
                    </Typography>
                    {/* <Chip
                      icon={<ShieldIcon sx={{ fontSize: 16 }} />}
                      label={selectedUser.role}
                      color={selectedUser.role === 'admin' ? 'secondary' : 'primary'}
                      variant="filled"
                      sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}
                    /> */}
                  </Box>
                </Box>

                {/* الصف الثاني - معلومات الاتصال */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 3,
                  p: 3,
                  backgroundColor: 'grey.50',
                  borderRadius: 2
                }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      <EmailIcon sx={{ mr: 1, fontSize: 18, verticalAlign: 'middle' }} />
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.email || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      <PhoneIcon sx={{ mr: 1, fontSize: 18, verticalAlign: 'middle' }} />
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {selectedUser.phoneNumber || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                {/* الصف الثالث - الموقع والحالة */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 3,
                  p: 3,
                  backgroundColor: 'info.lighter',
                  borderRadius: 2
                }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      <LocationIcon sx={{ mr: 1, fontSize: 18, verticalAlign: 'middle' }} />
                      Country
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {selectedUser.country || "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Verification Status
                    </Typography>
                    <Chip
                      icon={selectedUser.verified ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <CancelIcon sx={{ fontSize: 16 }} />}
                      label={selectedUser.verified ? 'Verified' : 'Not Verified'}
                      color={selectedUser.verified ? 'success' : 'error'}
                      variant="filled"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Box>
                </Box>

                {/* معلومات إضافية */}
                <Box sx={{ 
                  p: 3,
                  backgroundColor: 'warning.lighter',
                  borderRadius: 2
                }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="warning.main">
                    Account Information
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Box sx={{ width: '50%' }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Created At:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedUser.createdAt ? 
                          formatDate(selectedUser.createdAt) : "N/A"
                        }
                      </Typography>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        User ID:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                        {selectedUser._id || "N/A"}
                      </Typography>
                    </Box>
                  </Stack>
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
                No user details available.
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
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
  );
}