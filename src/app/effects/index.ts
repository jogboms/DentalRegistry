import { EffectsModule } from '@ngrx/effects';

import { PatientEffects } from './patient.effect';
import { SessionsEffects } from './sessions.effect';
import { PatientsEffects } from './patients.effect';
import { SearchsEffects } from './searchs.effect';
import { AuthEffects } from './auth.effect';

export const EFFECTS = [
  EffectsModule.run(PatientEffects),
  EffectsModule.run(SessionsEffects),
  EffectsModule.run(PatientsEffects),
  EffectsModule.run(SearchsEffects),
  EffectsModule.run(AuthEffects),
];
