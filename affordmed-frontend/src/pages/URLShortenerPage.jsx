import React, { useState } from 'react';
import { useLinks } from '../context/LinksContext';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Alert,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LinkCard from '../components/LinkCard';
import { sendLog } from '../services/logger';

const URLShortenerPage = () => {
  const { addLinks, links } = useLinks();
  const [inputs, setInputs] = useState([{ url: '', shortcode: '' }]);
  const [validity, setValidity] = useState(30);
  const [error, setError] = useState('');

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', shortcode: '' }]);
    }
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index][event.target.name] = event.target.value;
    setInputs(newInputs);
  };

  const generateShortCode = (length = 6) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const isValidUrl = (string) => {
     try {
        new URL(string);
        return true;
     } catch (_) {
        // A simple regex fallback for URLs without a protocol like 'google.com'
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return urlRegex.test(string);
     }
  };


  const handleSubmit = () => {
    setError('');
    const validUrls = inputs.filter(input => isValidUrl(input.url));

    if (validUrls.length === 0) {
        setError('Please enter at least one valid URL to shorten.');
        sendLog('warn', 'component', 'User submitted form with no valid URLs.');
        return;
    }

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + (parseInt(validity, 10) || 30));

    const newLinks = validUrls.map((urlData) => {
      const finalShortcode = urlData.shortcode || generateShortCode();
      return {
        longUrl: urlData.url,
        shortCode: finalShortcode,
        createdAt: new Date().toISOString(),
        expiryDate: expiry.toISOString(),
        // --- FIX IS HERE ---
        // Initialize every new link with an empty 'clicks' array.
        clicks: [], 
        // --- END OF FIX ---
      };
    });

    addLinks(newLinks);
    setInputs([{ url: '', shortcode: '' }]); // Reset form
    sendLog('info', 'component', `User successfully shortened ${newLinks.length} URLs.`);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Short URLs
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {inputs.map((input, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <TextField
              name="url"
              label="Original URL"
              variant="outlined"
              fullWidth
              value={input.url}
              onChange={(e) => handleInputChange(index, e)}
              sx={{ mr: 1 }}
            />
            <TextField
              name="shortcode"
              label="Custom Shortcode (Optional)"
              variant="outlined"
              value={input.shortcode}
              onChange={(e) => handleInputChange(index, e)}
              sx={{ width: '250px', mr: 1 }}
            />
            {inputs.length > 1 && (
              <IconButton onClick={() => handleRemoveInput(index)} color="error">
                <RemoveCircleIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Box display="flex" alignItems="center" mb={2}>
          <Button
            variant="outlined"
            onClick={handleAddInput}
            disabled={inputs.length >= 5}
            startIcon={<AddCircleIcon />}
          >
            Add URL
          </Button>
        </Box>

        <TextField
            label="Validity Period (in minutes, default 30)"
            variant="outlined"
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
        />

        <Button variant="contained" size="large" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Paper>

       {links && links.length > 0 && (
         <Box mt={5}>
            <Typography variant="h5" component="h2" gutterBottom>
               Your Shortened Links
            </Typography>
            {links.map((link) => (
               <LinkCard key={link.shortCode} link={link} />
            ))}
         </Box>
       )}
    </Container>
  );
};

export default URLShortenerPage;

