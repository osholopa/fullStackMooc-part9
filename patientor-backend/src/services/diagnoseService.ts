import diagnoseData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getAll = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getAll,
};
