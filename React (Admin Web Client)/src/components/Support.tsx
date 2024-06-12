import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Interface for ticket data
interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: string;
}

// Support Component
const Support = () => {
  const [tickets] = useState<Ticket[]>([
    { id: 1, subject: 'Locker Issue', message: 'I cannot open locker 101, it seems to be stuck.', status: 'Open' },
    { id: 2, subject: 'Registration Problem', message: 'I am having trouble registering my account.', status: 'Closed' },
  ]);
  const navigate = useNavigate();

  // Handle logout and navigate to login page
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Support Tickets
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/logs')}>View Logs</Button>
          <Button color="inherit" onClick={() => navigate('/support')}>Support</Button>
          <Button color="inherit" onClick={() => navigate('/monitor')}>Monitor Locker</Button>
          <Button color="inherit" onClick={() => navigate('/register-patient')}>Register New Patient</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="calc(100vh - 64px)" textAlign="center">
          <Typography variant="h4" gutterBottom>
            Support Tickets
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.message}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default Support;
