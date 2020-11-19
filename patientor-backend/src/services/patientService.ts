import patients from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatient)
  return newPatient
}

export default {
  getNonSensitiveEntries, addPatient
};
