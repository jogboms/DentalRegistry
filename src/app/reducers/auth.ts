import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { AuthActions } from '../actions/auth.action';

export interface AuthState {
  logged: boolean;
  admin: boolean;
}

const initialState: AuthState = {
  logged: false,
  admin: false,
}

export function auth(state = initialState, { type, payload }: Action): AuthState {
  switch (type) {
    case AuthActions.INIT:
    case AuthActions.LOGIN_COMPLETE: {
      return { ...state, logged: payload.logged, admin: payload.admin };
    }

    case AuthActions.LOGOUT_COMPLETE: {
      return { ...state, logged: false, admin: false };
    }

    default: return state;
  }
}
