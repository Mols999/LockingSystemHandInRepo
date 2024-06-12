import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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
            Dashboard
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="calc(100vh - 64px)" 
          >
          <Typography variant="h3" gutterBottom>
            Locking System
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
