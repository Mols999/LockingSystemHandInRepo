import { createClient } from 'redis';

// Create Redis Client
const client = createClient({
  password: 'D5VENZXKv5u2PVTMhhRpCbxdvP4dJUTm',
  socket: {
    host: 'redis-10149.c55.eu-central-1-1.ec2.redns.redis-cloud.com',
    port: 10149
  }
});
client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect to Redis Server
(async () => {
  await client.connect();
})();

export default client;
