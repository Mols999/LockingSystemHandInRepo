import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Interface for Patient data
interface Patient {
  id: string;
  lockerNumber: string;
  patientName: string;
}

// Interface for the PatientContext
interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  fetchPatients: () => void;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  // Fetch patients from the backend
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Add a new patient 
  const addPatient = (patient: Patient) => {
    setPatients((prevPatients) => [...prevPatients, patient]);
  };

    // Fetch patients
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientContext.Provider value={{ patients, addPatient, fetchPatients, setPatients }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};
