import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import client from '../services/redisClient';
import { logEvent } from '../utility/logger';

const router = Router();

// Register a Patient
router.post('/patients', async (req, res) => {
  const { lockerNumber, patientName } = req.body;
  const id = uuidv4();
  const patient = {
    id,
    lockerNumber,
    patientName
  };

  try {
    await client.hSet(`patient:${id}`, patient);
    await logEvent(`Patient registered: ${patientName}`, 'Patient Registration');
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Patients
router.get('/patients', async (req, res) => {
  try {
    const keys = await client.keys('patient:*');
    const patients = [];

    for (const key of keys) {
      const patient = await client.hGetAll(key);
      patients.push(patient);
    }

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
