import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import * as _ from 'lodash';

import { SessionModel } from 'app/model/session.model';
import { SessionsActions } from '../actions/sessions.action';
import { PatientActions } from '../actions/patient.action';

export type SessionData = { [id: number]: SessionModel };
export interface SessionsState {
  selected: string;
  status: boolean;
  ids: string[];
  data: SessionData;
}

const initialState: SessionsState = {
  selected: '',
  status: false,
  ids: [],
  data: null
}


// Reducer
export function sessions(state: SessionsState = initialState, {type, payload}: Action): SessionsState {
  switch (type) {

    case PatientActions.REMOVE_SUCCESS: {
      const data = _.omitBy(state.data, p => p.reg_id == payload) as SessionData;
      const ids = _.values(data).map(data => data['id']);
      return { ...state, ids, data };
    }

    case SessionsActions.EDIT_SUCCESS: {
      return { ...state, data: { ...state.data, [payload.id]: payload } };
    }

    case SessionsActions.CREATE_SUCCESS: {
      const data = { ...state.data, [payload.id]: payload } as SessionData;
      const ids = [payload.id, ...state.ids];
      return { selected: payload.id, status: true, ids , data };
    }

    case SessionsActions.REMOVE_SUCCESS: {
      const ids = state.ids.filter(ids => ids !== payload.id);
      const data = _.omit(state.data, payload.id) as SessionData;
      return { ...state, ids, data };
    }

    case SessionsActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as SessionData;

      return { ...state, status: false, ids, data };
    }

    default: return state;
  }
};

// Selectors
export function getIds() {
  return (sessions$: Observable<SessionsState>) => sessions$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (sessions$: Observable<SessionsState>) => sessions$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getStatus() {
  return (sessions$: Observable<SessionsState>) => sessions$.map(t => t.status);
}
export function getSelectedId() {
  return (sessions$: Observable<SessionsState>) => sessions$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelected() {
  return (sessions$: Observable<SessionsState>) => sessions$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}
