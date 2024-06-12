import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import Dashboard from './components/Dashboard';
import Support from './components/Support';
import Monitor from './components/Monitor';
import RegisterPatient from './components/RegisterPatient';
import { PatientProvider } from './components/PatientContext'; 
import Logs from './components/Logs'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PatientProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/register" element={<AdminRegister />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support" element={<Support />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/register-patient" element={<RegisterPatient />} />
            <Route path="/logs" element={<Logs />} /> 
            <Route path="/" element={<AdminLogin />} /> {}
          </Routes>
        </Router>
      </PatientProvider>
    </ThemeProvider>
  );
};

export default App;
