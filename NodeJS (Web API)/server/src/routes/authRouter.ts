import { Router } from 'express';
import client from '../services/redisClient';

const router = Router();

// User Registration with Logging
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await client.hExists(`user:${username}`, 'username');
    if (userExists) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }
    await client.hSet(`user:${username}`, { username, password });
    res.json({ success: true, message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// User Login with Logging
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const storedPassword = await client.hGet(`user:${username}`, 'password');
    if (storedPassword === password) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Validate Password
router.post('/validate-password', async (req, res) => {
  const { username, password } = req.body;
  try {
    const storedPassword = await client.hGet(`user:${username}`, 'password');
    if (storedPassword === password) {
      res.json({ success: true, message: 'Password validated successfully' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
