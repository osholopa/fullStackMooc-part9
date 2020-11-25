import { NewPatient, NewEntry, Gender, NewBaseEntry, EntryType, HealthCheckRating, Discharge } from './types';

/* eslint-disable */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employerName: ${name}`);
  }
  return name;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseEntryDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseType = (type: any): EntryType => {
  if (!Object.values(EntryType).includes(type)) {
    throw new Error(`Incorrect or missing entry type: ${type}`);
  }
  return type;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
  return newPatient;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseType(object.type),
    date: parseEntryDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = object.diagnosisCodes;
  }

  return newBaseEntry;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).includes(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

const parseDischarge = (discharge: any): Discharge => {
  if(!discharge || !isDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`);
  }
  return discharge
}

const toNewEntry = (object: any): NewEntry => {

  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {

    case EntryType.OccupationalHealthcare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseEmployerName(object.employerName),
      }
      if(object.sickLeave) {
        newEntry.sickLeave = object.sickLeave
      };
      return newEntry;
    case EntryType.Hospital:
      return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      }
    default:
      throw new Error('');
      
  }

};

export default { toNewEntry, toNewPatient };
