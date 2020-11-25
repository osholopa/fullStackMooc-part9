import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getPublicEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === id);

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPublicEntries,
  addPatient,
  findById,
  addEntry,
};
