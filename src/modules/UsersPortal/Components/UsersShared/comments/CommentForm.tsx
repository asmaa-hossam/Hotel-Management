import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';


TextareaBox.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  maxRows: PropTypes.number,
  label: PropTypes.string,
};


export default function TextareaBox({
  initialValue = '',
  onSubmit = (value:any) => console.log('submitted:', value),
  maxRows = 6,
  label = 'Message',
}) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e?.preventDefault();
    if (!value.trim()) return; 
    try {
      setLoading(true);
      await Promise.resolve(onSubmit(value)); 
      setValue('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 720,
        mx: 'auto',
        borderRadius: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
      aria-label="textarea-box-form"
    >
      <Stack spacing={1}>
        {label && (
          <Typography variant="subtitle1" component="label" sx={{ fontWeight: 600 }}>
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
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={loading || !value.trim()}
            aria-label="send-button"
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}



