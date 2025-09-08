import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

const LinkCard = ({ link }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const shortUrl = `http://localhost:3000/${link.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // --- FIX IS HERE ---
  // The 'expiryDate' from localStorage is a string.
  // We need to convert it into a Date object to format it correctly.
  const expiryDisplayDate = new Date(link.expiryDate).toLocaleString();
  // --- END OF FIX ---

  return (
    <>
      <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Original: {link.longUrl}
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {shortUrl}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Expires: {expiryDisplayDate}
          </Typography>
        </Box>
        <Button variant="contained" onClick={handleCopy}>
          Copy
        </Button>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Short URL copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LinkCard;

