import { SessionModel } from './session.model';

export interface PatientModel {
  i: number;
  title: string;
  surname: string;
  names: string;
  reg_id: string;
  telephone: string;
  address: string;
  age: number;
  occupation: string;
  created: Date;
  updated: Date;
  sessions: SessionModel[];
  id: string;
  length: number;
}

