import express from 'express';
import patientServices from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const list = patientServices.getNSPatients();
  res.json(list);
});

router.post('/', (req, res) => {
  try {
  // const {name, dateOfBirth, ssn, gender, occupation} = req.body
  const checkedNewPatient = toNewPatient(req.body);
  const addedPatient = patientServices.addPatient(checkedNewPatient);
  res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  } 
});

export default router;