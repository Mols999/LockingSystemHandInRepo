import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Interface for logs 
interface Log {
  timestamp: string;
  event: string;
  eventType: string;
}

// Logs Component
const Logs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [eventType, setEventType] = useState<string>('All');
  const navigate = useNavigate();

  // Fetch logs  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        console.log('Fetching logs...');
        const response = await axios.get('http://localhost:3001/api/logs');
        console.log('Raw logs fetched:', response.data);

        const logsData = response.data.map((log: any) => {
          if (typeof log === 'string') {
            try {
              const parsedLog = JSON.parse(log);
              return {
                timestamp: parsedLog.timestamp || new Date().toISOString(),
                event: parsedLog.event || log,
                eventType: parsedLog.eventType || 'Unknown'
              };
            } catch (e) {
              const eventType = log.includes("Tampering detected on locker") ? "Tampering Detected" : "Unknown";
              return {
                timestamp: new Date().toISOString(),
                event: log,
                eventType: eventType
              };
            }
          }
          return log;
        });

        console.log('Parsed logs:', logsData);
        setLogs(logsData);
        setFilteredLogs(logsData);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    fetchLogs();
  }, []);


  const handleEventTypeChange = (event: SelectChangeEvent) => {
    const selectedEventType = event.target.value;
    setEventType(selectedEventType);
    if (selectedEventType === 'All') {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => log.eventType === selectedEventType));
    }
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Logs Viewer
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
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" minHeight="calc(100vh - 64px)" mt={2}>
          <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 4 }}>
            <InputLabel>Event Type</InputLabel>
            <Select value={eventType} onChange={handleEventTypeChange} label="Event Type">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="User Login">User Login</MenuItem>
              <MenuItem value="User Registration">User Registration</MenuItem>
              <MenuItem value="Drawer Control">Drawer Control</MenuItem>
              <MenuItem value="Tampering Detected">Tampering Detected</MenuItem>
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Event Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.event}</TableCell>
                    <TableCell>{log.eventType}</TableCell>
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

export default Logs;
