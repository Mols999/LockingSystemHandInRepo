import { Router } from 'express';
import client from '../services/redisClient';

const router = Router();

// Log an Event
router.post('/', async (req, res) => {
  try {
    const { timestamp, event, eventType, message } = req.body;
    if (!timestamp || !event || !eventType || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const logMessage = JSON.stringify({ timestamp, event, eventType, message });
    await client.rPush('logs', logMessage);
    
    res.status(200).json({ success: true, message: 'Log received' });
  } catch (error) {
    console.error('Error logging event:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Fetch Logs
router.get('/', async (req, res) => {
  try {
    const logs = await client.lRange('logs', 0, -1);
    const parsedLogs = logs.map(log => {
      try {
        return JSON.parse(log);
      } catch (e) {
        return log; 
      }
    });
    res.json(parsedLogs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
