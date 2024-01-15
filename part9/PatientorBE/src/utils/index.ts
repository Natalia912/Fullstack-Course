import {NewPatient, Gender} from '../types/main-types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name:unknown): string => {
  if (isString(name)) return name;
  else {
    throw new Error('Incorrect or missing name');
  }
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn:unknown): string => {
  if (isString(ssn)) return ssn;
  else {
    throw new Error('Incorrect or missing ssn');
  }
};

const parseOccupation = (occupation:unknown): string => {
  if (isString(occupation)) return occupation;
  else {
    throw new Error('Incorrect or missing occupation');
  }
};

const isGender = (gender:string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};


const toNewPatient = (body: unknown): NewPatient => {
  if ( !body || typeof body !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in body && 'dateOfBirth' in body && 'ssn' in body && 'gender' in body && 'occupation' in body) {
    const newEntry: NewPatient = {
      name: parseName(body.name),
      dateOfBirth: parseDateOfBirth(body.dateOfBirth),
      ssn: parseSsn(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseOccupation(body.occupation)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export {toNewPatient};