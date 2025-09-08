import React from 'react';
import { useLinks } from '../context/LinksContext';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StatisticsPage = () => {
  const { links } = useLinks();

  const getExpiryDate = (createdAt, expiryMinutes) => {
    const expiry = new Date(createdAt.getTime() + expiryMinutes * 60000);
    return expiry.toLocaleString();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{mt: 4, mb: 4}}>
        URL Statistics
      </Typography>
      {links.length === 0 ? (
        <Paper sx={{padding: 4, textAlign: 'center'}}>
            <Typography variant="h6">No shortened links yet.</Typography>
            <Typography>Go to the main page to create some!</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="statistics table">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Short URL</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Original URL</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Clicks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Expires At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Click Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.shortCode}>
                  <TableCell component="th" scope="row">
                    <Typography color="primary" sx={{fontWeight: 'medium'}}>
                        {`${window.location.origin}/${link.shortCode}`}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {link.longUrl}
                  </TableCell>
                  <TableCell align="right">{link.clicks.length}</TableCell>
                  <TableCell>{link.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{getExpiryDate(link.createdAt, link.expiryMinutes)}</TableCell>
                  <TableCell>
                    {link.clicks.length > 0 ? (
                      <Accordion elevation={0} sx={{ '&.Mui-expanded': { margin: 0 } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                           <Typography variant="body2">View Clicks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            {link.clicks.map((click, index) => (
                              <Typography key={index} variant="caption" display="block">
                                {index+1}: {click.timestamp.toLocaleString()}
                              </Typography>
                            ))}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ) : (
                      'No clicks'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default StatisticsPage;
