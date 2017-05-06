import { Store as S, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as Patient from './patient';
import * as Sessions from './sessions';
import * as Patients from './patients';
import * as Searchs from './searchs';
import * as Sorts from './sort';
import * as Filters from './filter';
import * as Auth from './auth';

import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'app/../environments/environment';

export const reducers = {
  sort: Sorts.sort,
  filter: Filters.filter,
  sessions: Sessions.sessions,
  patients: Patients.patients,
  searchs: Searchs.searchs,
  auth: Auth.auth,
};

export interface AppState {
  sort: Sorts.SortState;
  filter: Filters.FilterState;
  sessions: Sessions.SessionsState;
  patients: Patients.PatientsState;
  searchs: Searchs.SearchsState;
  auth: Auth.AuthState;
  operations: any;
};

const prod = combineReducers(reducers);
// const dev = compose(logger, combineReducers)(reducers);
const dev = compose(storeLogger({ collapsed: true }), combineReducers)(reducers);
export function redux(state: any, action: any) {
  return environment.production ? prod(state, action) : dev(state, action);
}

export const STORE = [
  StoreModule.provideStore(redux),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  // StoreDevtoolsModule.instrumentStore(),
];

// Selectors
export function getLogged() {
  return (state$: S<AppState>) => state$.select(s => s.auth.logged);
}
export function getAdmin() {
  return (state$: S<AppState>) => state$.select(s => s.auth.admin);
}
export function getPatient() {
  return (state$: S<AppState>) => state$
    .let(compose(Patients.getSelected(), getPatients())).filter(p => !!p);
}
export function getSessions() {
  return (state$: S<AppState>) => state$.select(s => s.sessions);
}
export function getPatients() {
  return (state$: S<AppState>) => state$.select(s => s.patients);
}
export function getSorts() {
  return (state$: S<AppState>) => state$.select(s => s.sort);
}
export function getSorter() {
  return compose(Sorts.getSort(), getSorts());
}
export function getSessionsIds() {
  return compose(Sessions.getIds(), getSessions());
}
export function getSessionsData() {
  return (state$: S<AppState>) => state$
    .let(getSessionsIds())
    .switchMap(ids => state$.let(compose(Sessions.getData(ids), getSessions())));
}
// export function getSessionsMonthData(month, year) {
//   return compose(Sessions.getMonthData(month, year), getSessionsData())
// }
export function getPatientsIds() {
  return compose(Patients.getIds(), getPatients());
}
export function getPatientsRawData() {
  return (state$: S<AppState>) => state$
    .switchMap(() => state$.let(compose(Patients.getRawData(), getPatients())));
}
export function getPatientsData() {
  return (state$: S<AppState>) => state$
    .let(getPatientsIds())
    .switchMap(ids => state$.let(compose(Patients.getData(ids), getPatients())));
}
export function getPatientsStatus() {
  return compose(Patients.getStatus(), getPatients());
}
export function getPatientsIdsSorted() {
  return (state$: S<AppState>) => state$
    .let(getPatientsIds())
    .combineLatest(state$.let(getSorts()))
    // .map(([id, sort]) => id.sort(sort.alpha).sort(sort.date));
}
export function getPatientsDataSorted() {
  return (state$: S<AppState>) => state$
    .let(getPatientsData())
    .combineLatest(state$.let(getSorts()))
    // .map(([data, sort]) => data.sort(sort.alpha).sort(sort.date));
}

