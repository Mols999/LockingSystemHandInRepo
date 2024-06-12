import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePatients } from './PatientContext';

const Monitor: React.FC = () => {
  const navigate = useNavigate();
  const { patients, fetchPatients, setPatients } = usePatients();
  const [drawerStatus, setDrawerStatus] = useState<{ [key: string]: boolean }>({});

   // Fetch patients 
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);


  // Handle logout and navigate to login page
  const handleLogout = () => {
    navigate('/login');
  };

  // Update the locker status
  const updateLockerStatus = (lockerNumber: string, isLocked: boolean) => {
    setDrawerStatus((prevStatus) => ({
      ...prevStatus,
      [lockerNumber]: isLocked,
    }));
  };

   // Handle lock/unlock actions
  const handleToggleLock = async (lockerNumber: string, action: 'on' | 'off') => {
    try {
      const response = await axios.post(`http://localhost:3001/api/drawer/${action === 'on' ? 'unlock' : 'lock'}`, { lockerNumber });
      updateLockerStatus(lockerNumber, action === 'off');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error toggling lock:', err.response?.data);
        alert(`Error: ${err.response?.data.message || err.message}`);
      } else {
        console.error('Error toggling lock:', err);
        alert(`Error: ${String(err)}`);
      }
    }
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
            Monitor Locker
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Locker Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.lockerNumber}>
                    <TableCell>{patient.lockerNumber}</TableCell>
                    <TableCell>{drawerStatus[patient.lockerNumber] ? 'Locked' : 'Unlocked'}</TableCell>
                    <TableCell>{patient.patientName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={drawerStatus[patient.lockerNumber] ? 'primary' : 'secondary'}
                        onClick={() => handleToggleLock(patient.lockerNumber, drawerStatus[patient.lockerNumber] ? 'on' : 'off')}
                      >
                        {drawerStatus[patient.lockerNumber] ? 'Unlock' : 'Lock'}
                      </Button>
                    </TableCell>
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

export default Monitor;
