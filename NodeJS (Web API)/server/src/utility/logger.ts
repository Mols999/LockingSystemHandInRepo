import client from '../services/redisClient';

// Function to log events to Redis
export const logEvent = async (event: string, eventType: string) => {
  const timestamp = new Date().toISOString();
  try {
    const logEntry = JSON.stringify({ timestamp, event, eventType });
    await client.lPush('logs', logEntry);
  } catch (error) {
    console.error('Error logging event:', error);
  }
};
