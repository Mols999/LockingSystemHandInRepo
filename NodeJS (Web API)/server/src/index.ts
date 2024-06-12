import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './routes/authRouter';
import patientsRouter from './routes/patientsRouter';
import logsRouter from './routes/logsRouter';
import drawerRouter from './routes/drawerRouter';

//Initialize the Express application
const app = express();
const port = process.env.PORT || 3001;

// Setup routes for the application
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api', patientsRouter);
app.use('/api/logs', logsRouter);
app.use('/api/drawer', drawerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
