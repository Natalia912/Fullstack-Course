import diagnosesData from '../data/diagnoses';
import {Diagnoses} from '../types/main-types';

const getEntries = (): Diagnoses[] => {
  return diagnosesData;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses
};