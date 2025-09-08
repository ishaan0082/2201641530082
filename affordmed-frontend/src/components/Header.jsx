import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Affordmed URL Shortener
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Shorten URL
          </Button>
          <Button color="inherit" component={RouterLink} to="/statistics">
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
    