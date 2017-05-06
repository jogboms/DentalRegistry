export * from './auth.service';
export * from './patients.service';
export * from './patients.service';
export * from './operations.service';

import { AuthService } from './auth.service';
import { PatientsService } from './patients.service';
import { SessionsService } from './sessions.service';
import { OperationsService } from './operations.service';

export const SERVICES = [
  AuthService,
  SessionsService,
  PatientsService,
  OperationsService,
];
