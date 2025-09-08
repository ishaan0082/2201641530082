import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLinks } from '../context/LinksContext';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const { loading, getLinkByShortcode, recordClick } = useLinks();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Finding your link...');

  useEffect(() => {
    // This effect runs when the page loads and when the links data is ready.
    if (loading) {
      // If links are still loading from storage, we wait.
      return;
    }

    const link = getLinkByShortcode(shortCode);

    if (link) {
      const now = new Date();
      const expiry = new Date(link.expiryDate);

      if (now > expiry) {
        setError('This shortened link has expired.');
        setMessage('');
      } else {
        // Link is valid and not expired.
        setMessage('Link found! Redirecting you now...');
        
        // 1. Record the click. This updates the state.
        recordClick(shortCode);
        
        // 2. Prepare the final URL, ensuring it has a protocol.
        let finalUrl = link.longUrl;
        if (!/^https?:\/\//i.test(finalUrl)) {
          finalUrl = 'https://' + finalUrl;
        }
        
        // 3. Schedule the redirect. Using a timeout ensures the state update
        //    from recordClick completes before the browser navigates away.
        setTimeout(() => {
          window.location.href = finalUrl;
        }, 100); // A small delay is sufficient.

      }
    } else {
      // If the link is not found after the data has loaded.
      setError('The requested URL was not found.');
      setMessage('');
    }

  }, [loading, shortCode, getLinkByShortcode, recordClick]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Affordmed URL Shortener
      </Typography>
      {message && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ mr: 2 }} />
          <Typography variant="h6">{message}</Typography>
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default RedirectPage;

