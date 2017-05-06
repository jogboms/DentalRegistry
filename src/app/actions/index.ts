export * from './auth.action';
export * from './sort.action';
export * from './filter.action';
export * from './patient.action';
export * from './patients.action';
export * from './sessions.action';
export * from './searchs.action';

import { AuthActions } from './auth.action';
import { SortActions } from './sort.action';
import { FilterActions } from './filter.action';
import { SearchsActions } from './searchs.action';
import { PatientActions } from './patient.action';
import { PatientsActions } from './patients.action';
import { SessionsActions } from './sessions.action';

export const ACTIONS = [
  SortActions,
  FilterActions,
  PatientActions,
  PatientsActions,
  SessionsActions,
  SearchsActions,
  AuthActions,
];

