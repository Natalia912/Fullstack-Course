import express from 'express';
import cors from 'cors';
import diagnosesRoutes from './src/routes/diagnoses';
import patientsRoutes from './src/routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoutes);
app.use('/api/patients', patientsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});