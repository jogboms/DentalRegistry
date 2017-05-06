import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class AuthActions {
  static INIT = '[ADMIN] INIT';
  init(state): Action {
    return { type: AuthActions.INIT, payload: state }
  }

  static LOGIN = '[ADMIN] LOGIN';
  login(auth): Action {
    return { type: AuthActions.LOGIN, payload: auth }
  }

  static LOGOUT = '[ADMIN] LOGOUT';
  logout(): Action {
    return { type: AuthActions.LOGOUT, payload: null }
  }

  static LOGIN_COMPLETE = '[ADMIN] LOGIN COMPLETE';
  login_complete(state): Action {
    return { type: AuthActions.LOGIN_COMPLETE, payload: state }
  }

  static LOGOUT_COMPLETE = '[ADMIN] LOGOUT COMPLETE';
  logout_complete(): Action {
    return { type: AuthActions.LOGOUT_COMPLETE, payload: null }
  }
}

