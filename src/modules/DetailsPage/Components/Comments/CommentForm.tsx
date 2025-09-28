import  { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
 import axios from 'axios';
import { toast } from "react-toastify";
import {SUBMITCOMENT_URL} from '../../../../services/urls'
interface TextareaBoxProps {
  initialValue?: string;
  placeholder?: string;
  id: string ;
  maxRows?: number;
  label?: string;
}

export default function TextareaBox({
  initialValue = '',
  id,
  maxRows = 6,
  label = 'Add Your Comment',
}: TextareaBoxProps)  {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e?.preventDefault();
  if (!value.trim()) return;

  try {
    setLoading(true);

    const token = localStorage.getItem('token');

    const response = await axios.post(
      SUBMITCOMENT_URL.SUBMITCOMMIT,
      {
        roomId: id,       
        comment: value,   
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `${token}` }),
        },
      }
    );
    toast.success("Your comment have been submitted!")
    console.log('Response:', response.data);
    setValue('');
  } catch (error: any) {
    toast.error("Error submitting comment")
    console.error('Error submitting comment:', error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      aria-label="textarea-box-form"
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 720,
        mx: 'auto',
        borderRadius: 2,
        border: 1,
        borderColor: '#ffff',
        mr:"500"

      }}
    >
      <Stack spacing={10}>
        {label && (
<Typography
  variant="subtitle1"
  component="label"
  sx={{
    fontWeight: 500,
    color: '#152C5B',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '20px',
    lineHeight: '100%',
    letterSpacing: 0,
  
  }}
>
  {label}
</Typography>

        )}

        <Box>
        <TextField
  value={value}
  onChange={(e) => setValue(e.target.value)}
  multiline
  fullWidth
  minRows={3}
  maxRows={maxRows}
  variant="outlined"
  inputProps={{ 'aria-label': 'message-textarea' }}
  sx={{
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    fontSize: '20px',
    lineHeight: '100%',
    letterSpacing: 0,

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'primary.main', 
      },
      '&:hover fieldset': {
        borderColor: 'primary.dark', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main', 
      },
    },
  }}
/>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            aria-label="send-button"
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

TextareaBox.propTypes = {
  initialValue: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  maxRows: PropTypes.number,
  label: PropTypes.string,
};