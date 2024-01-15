import express from 'express';
import diagnosesServices from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const list = diagnosesServices.getEntries();
  res.json(list);
});

router.post('/', (_req, res) => {
  res.send('Saving!');
});

export default router;