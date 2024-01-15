import patientsData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { NSPatient, NewPatient, Patient } from '../types/main-types';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNSPatients = (): NSPatient[] => {
  return patientsData.map(({id,name,dateOfBirth,gender,occupation}) => ({id,name,dateOfBirth,gender,occupation }));
};

const addPatient = (newPatient: NewPatient) => {
  const patient = {
    id: uuid(),
    ...newPatient
  };
  patientsData.push(patient);
  return patient;
};

export default {
  getPatients,
  getNSPatients,
  addPatient
};