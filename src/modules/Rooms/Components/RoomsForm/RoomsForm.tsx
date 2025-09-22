import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { RoomAs, CreatRoomRes, Fasilites } from '../../../../services/interfaces';
import { axiosinstance, ROOMS_URLS } from '../../../../services/urls';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import  {Grid} from '@mui/material'
import { 
  Box, 
  Chip, 
  FormControl, 
  FormHelperText, 
  InputLabel, 
  MenuItem, 
  Paper, 
  Select, 
  TextField,
  Button,
  Typography,
  IconButton,

  CircularProgress,
 
} from '@mui/material';

// الواجهات المطلوبة
// interface RoomToEdit {
//   _id: string;
//   name: string;
//   price: number;
//   capacity: number;
//   discount: number;
//   category: string;
//   image: string;
// }

export default function RoomsForm() {
  // حالات المكون الأساسية
  const [facilities, setFacilities] = useState<Fasilites[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // المراجع والتنقل
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // بيانات الغرفة للتعديل (إن وجدت)
  const roomToEdit = location.state?.roomToEdit ;

  // إعداد النموذج باستخدام react-hook-form
  const { 
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    control,
    reset
  } = useForm<RoomAs>({
    defaultValues: {
      imgs: undefined,
      roomNumber: "",
      price: "",
      capacity: "",
      discount: "",
      facilities: [],
    }
  });

  // تحديد نوع العملية (إضافة أو تعديل)
  let text = "";
  if (params.id) {
    text = "Edit Room";
  } else {
    text = "Add New Room";
  }

  /**
   * دالة تحضير البيانات للإرسال - تحويل البيانات إلى FormData
   * @param data - بيانات النموذج
   * @returns FormData جاهز للإرسال
   */
  const appendFormData = (data: RoomAs) => {
    const formdata = new FormData();
    formdata.append("roomNumber", data.roomNumber);
    
    // إضافة الصور المحددة
    if (selectedFiles && selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formdata.append('imgs', file);
      });
    }
    
    // إضافة البيانات الأساسية
    if (data.price !== null && data.price !== "") {
      formdata.append("price", data.price.toString());
    }
    if (data.capacity !== null && data.capacity !== "") {
      formdata.append("capacity", data.capacity.toString());
    }
    if (data.discount !== null && data.discount !== "") {
      formdata.append("discount", data.discount.toString());
    }
    
    // إضافة المرافق
    if (data.facilities.length > 0) {
      data.facilities.forEach((id) => formdata.append('facilities[]', id));
    }

    return formdata;
  };

  /**
   * جلب جميع المرافق من الخادم
   */
  const GetAllFacilites = async () => {
    try {
      const res = await axiosinstance.get(ROOMS_URLS.GETFACILITES);
      setFacilities(res.data.data.facilities);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch facilities.');
    }
  };

  /**
   * فتح نافذة اختيار الملفات
   */
  const handleChooseImageClick = () => {
    if (selectedFiles.length < 5) {
      fileInputRef.current?.click();
    }
  };

  /**
   * معالجة تغيير الملفات المحددة
   * @param event - حدث تغيير الملف
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const maxFiles = 5;
      
      if (selectedFiles.length + fileArray.length > maxFiles) {
        toast.warning(`يمكن رفع ${maxFiles} صور كحد أقصى`);
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...fileArray]);
    }
  };

  /**
   * حذف صورة محددة من القائمة
   * @param indexToRemove - فهرس الصورة المراد حذفها
   */
  const removeImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  /**
   * معالجة السحب فوق منطقة الرفع
   * @param event - حدث السحب
   */
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  /**
   * معالجة إسقاط الملفات في منطقة الرفع
   * @param event - حدث الإسقاط
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && selectedFiles.length < 5) {
      const files = Array.from(event.dataTransfer.files);
      const maxFiles = 5;
      
      if (selectedFiles.length + files.length > maxFiles) {
        toast.warning(`يمكن رفع ${maxFiles} صور كحد أقصى`);
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  /**
   * معالجة إرسال النموذج
   * @param data - بيانات النموذج
   */
  const OnSubmit = async (data: RoomAs) => {
    const formdata = appendFormData(data);
    
    try {
      setLoading(true);
      
      if (params.id ) {
        // تحديث غرفة موجودة
        const roomId = params.id 
        await axiosinstance.put(ROOMS_URLS.UBDATEROOM(roomId), formdata, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Room updated successfully!');
      } else {
        // إضافة غرفة جديدة
        await axiosinstance.post(ROOMS_URLS.CREATEROOM, formdata, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Room added successfully!');
      }
      
      // إعادة التوجيه وتنظيف النموذج
      navigate('/rooms');
      reset();
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error occurred!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * تحميل المرافق عند تحميل المكون
   */
  useEffect(() => {
    GetAllFacilites();
  }, []);

  /**
   * ملء النموذج ببيانات الغرفة عند التعديل
   */
  useEffect(() => {
    if (roomToEdit && facilities.length > 0) {
      // تحويل أسماء المرافق إلى معرفات
      const facilityIds = roomToEdit.category
        ?.split(',')
        .map((name: string) => {
          const found = facilities.find((f) => f.name.trim() === name.trim());
          return found?._id ?? null;
        })
        .filter((id:string) => id !== null) as string[];

      // ملء النموذج بالبيانات
      reset({
        roomNumber: roomToEdit.name || '',
        price: roomToEdit.price?.toString() || '',
        capacity: roomToEdit.capacity?.toString() || '',
        discount: roomToEdit.discount?.toString() || '',
        facilities: facilityIds,
        imgs: undefined,
      });
    }
  }, [roomToEdit, facilities, reset]);

  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1, 
        p: 3, 
        backgroundColor: '#f4f6f8',
        maxWidth: 1200, 
        mx: 'auto' 
      }}
    >
      {/* عنوان الصفحة */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        {text}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: 'white' }}>
        <form onSubmit={handleSubmit(OnSubmit)}>
          
          {/* رقم الغرفة */}
          <Box sx={{ mb: 3 }}>
            <Controller
              name="roomNumber"
              control={control}
              rules={{ required: 'Room Number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Room Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.roomNumber}
                  helperText={errors.roomNumber?.message}
                />
              )}
            />
          </Box>

          {/* شبكة للسعر والسعة والخصم */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            
            {/* السعر */}
            <Grid container columns={{xs:12,md:4}} >
              <Controller
                name="price"
                control={control}
                rules={{
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be positive' },
                  validate: (value) => value !== null && !isNaN(Number(value)) || 'Invalid price',
                }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <TextField
                    {...restField}
                    label="Price (SAR)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={value === null ? '' : value}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      onChange(isNaN(val) ? null : val);
                    }}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    inputProps={{ step: '0.01' }}
                  />
                )}
              />
            </Grid>

            {/* السعة */}
            <Grid >
              <Controller
                name="capacity"
                control={control}
                rules={{
                  required: 'Capacity is required',
                  min: { value: 1, message: 'Must be at least 1' },
                  validate: (v) =>
                    (v !== null && Number.isInteger(Number(v))) || 'Capacity must be an integer',
                }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <TextField
                    {...restField}
                    label="Capacity (Persons)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={value === null ? '' : value}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      onChange(isNaN(val) ? null : val);
                    }}
                    error={!!errors.capacity}
                    helperText={errors.capacity?.message}
                    inputProps={{ min: '1' }}
                  />
                )}
              />
            </Grid>

            {/* الخصم */}
            <Grid >
              <Controller
                name="discount"
                control={control}
                rules={{
                  required: 'Discount is required',
                  min: { value: 0, message: 'Cannot be negative' },
                  max: { value: 100, message: 'Cannot exceed 100%' },
                  validate: (value) => value !== null && !isNaN(Number(value)) || 'Invalid discount',
                }}
                render={({ field: { onChange, value, ...restField } }) => (
                  <TextField
                    {...restField}
                    label="Discount (%)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={value === null ? '' : value}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      onChange(isNaN(val) ? null : val);
                    }}
                    error={!!errors.discount}
                    helperText={errors.discount?.message}
                    inputProps={{ step: '0.01', min: '0', max: '100' }}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* المرافق */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth error={!!errors.facilities}>
              <InputLabel id="facilities-label">Facilities</InputLabel>
              <Controller
                name="facilities"
                control={control}
                rules={{
                  validate: (value) =>
                    (Array.isArray(value) && value.length > 0) ||
                    'At least one facility is required',
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    labelId="facilities-label"
                    label="Facilities"
                    variant="outlined"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((val: string) => {
                          const f = facilities.find((f) => f._id === val);
                          return (
                            <Chip 
                              key={val} 
                              label={f?.name || val} 
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {facilities.map((f) => (
                      <MenuItem key={f._id} value={f._id}>
                        {f.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.facilities?.message}</FormHelperText>
            </FormControl>
          </Box>

          {/* عرض الصورة الحالية عند التعديل */}
          {roomToEdit && roomToEdit.image && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Current Image:
              </Typography>
              <Paper elevation={1} sx={{ p: 2, display: 'inline-block' }}>
                <img
                  src={roomToEdit.image}
                  alt="Current Room"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Paper>
            </Box>
          )}

          {/* قسم رفع الصور */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Room Images (Max 5 images)
            </Typography>
            
            {/* منطقة رفع الصور */}
            <Box
              sx={{
                p: 4,
                border: `2px dashed ${selectedFiles.length >= 5 ? '#ccc' : errors.imgs ? '#f44336' : '#1976d2'}`,
                borderRadius: 2,
                textAlign: 'center',
                backgroundColor: selectedFiles.length >= 5 
                  ? '#f5f5f5' 
                  : errors.imgs 
                    ? '#ffebee' 
                    : '#f8f9ff',
                cursor: selectedFiles.length >= 5 ? 'not-allowed' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '150px',
                opacity: selectedFiles.length >= 5 ? 0.6 : 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: selectedFiles.length >= 5 
                    ? '#f5f5f5' 
                    : errors.imgs 
                      ? '#ffcdd2' 
                      : '#e3f2fd',
                }
              }}
              onClick={selectedFiles.length < 5 ? handleChooseImageClick : undefined}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* حقل رفع الملفات المخفي */}
              <input
                type="file"
                multiple
                accept="image/*"
                ref={(e) => {
                  if (fileInputRef) {
                    fileInputRef.current = e;
                  }
                }}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              
              <CloudUploadIcon 
                sx={{ 
                  fontSize: 50, 
                  color: selectedFiles.length >= 5 
                    ? '#ccc' 
                    : errors.imgs 
                      ? '#f44336' 
                      : '#1976d2',
                  mb: 2 
                }} 
              />
              
              <Typography variant="body1" color={
                selectedFiles.length >= 5 
                  ? 'text.disabled' 
                  : errors.imgs 
                    ? 'error' 
                    : 'primary'
              }>
                {selectedFiles.length >= 5 
                  ? 'Maximum 5 images reached' 
                  : 'Drag & Drop or Choose Room Images'
                }
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {selectedFiles.length}/5 images selected
              </Typography>
            </Box>

            {/* معاينة الصور المحددة */}
            {selectedFiles.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Selected Images:
                </Typography>
                <Grid container spacing={2}>
                  {selectedFiles.map((file, index) => (
                    <Grid  key={index}>
                      <Paper elevation={2} sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            backgroundColor: 'rgba(244, 67, 54, 0.9)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 1)',
                            }
                          }}
                          onClick={() => removeImage(index)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>

          {/* أزرار العمليات */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard/rooms')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || isSubmitting}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                minWidth: 120,
              }}
            >
              {loading || isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                params.id ? 'Update Room' : 'Save Room'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}