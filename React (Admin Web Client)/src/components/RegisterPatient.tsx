import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePatients } from './PatientContext';

const RegisterPatient = () => {
  const [name, setName] = useState('');
  const [lockerNumber, setLockerNumber] = useState('');
  const navigate = useNavigate();
  const { addPatient } = usePatients();

   // Handle patient registration form submission
  const handlePatientRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPatient = { lockerNumber, patientName: name };

    try {
      const response = await axios.post('http://localhost:3001/api/patients', newPatient);
      addPatient(response.data);
      console.log('Patient registered:', response.data);
      setName('');
      setLockerNumber('');
    } catch (error) {
      console.error('Error registering patient:', error);
    }
  };

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
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="calc(100vh - 64px)" textAlign="center">
          <Typography variant="h4" gutterBottom>
            Register New Patient
          </Typography>
          <Box component="form" onSubmit={handlePatientRegister} sx={{ mt: 3, width: '100%', maxWidth: 600 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Locker Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lockerNumber}
              onChange={(e) => setLockerNumber(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register Patient
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPatient;
