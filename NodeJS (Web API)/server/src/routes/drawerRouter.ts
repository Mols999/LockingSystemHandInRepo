import { Router } from 'express';
import { logEvent } from '../utility/logger';
import axios from 'axios';

const router = Router();
const RASPBERRY_PI_URL = 'http://192.168.87.115:5000';

// Lock Drawer
router.post('/lock', async (req, res) => {
  const { lockerNumber } = req.body;
  try {
    const response = await axios.post(`${RASPBERRY_PI_URL}/drawer`, { action: 'off', lockerNumber });
    await logEvent(`Drawer ${lockerNumber} locked`, 'Drawer Control');
    res.status(200).json({ success: true, message: response.data.message });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      await logEvent(`Error locking drawer ${lockerNumber}: ${error.message}`, 'Drawer Control');
      console.error('Error locking drawer:', error.response?.data);
      res.status(500).json({ success: false, message: error.response?.data.message || 'Internal server error' });
    } else {
      await logEvent(`Error locking drawer ${lockerNumber}: ${String(error)}`, 'Drawer Control');
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});

// Unlock Drawer
router.post('/unlock', async (req, res) => {
  const { lockerNumber } = req.body;
  try {
    const response = await axios.post(`${RASPBERRY_PI_URL}/drawer`, { action: 'on', lockerNumber });
    await logEvent(`Drawer ${lockerNumber} unlocked`, 'Drawer Control');
    res.status(200).json({ success: true, message: response.data.message });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      await logEvent(`Error unlocking drawer ${lockerNumber}: ${error.message}`, 'Drawer Control');
      console.error('Error unlocking drawer:', error.response?.data);
      res.status(500).json({ success: false, message: error.response?.data.message || 'Internal server error' });
    } else {
      await logEvent(`Error unlocking drawer ${lockerNumber}: ${String(error)}`, 'Drawer Control');
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});

export default router; 
