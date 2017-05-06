import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

const PRIVATE_AUTH_KEY = 'nosa';
declare const sessionStorage;

@Injectable()
export class AuthService {

  is_logged(): Observable<{ logged: boolean, admin: boolean }> {
    return Observable.of({ logged: sessionStorage.hasOwnProperty('login'), admin: sessionStorage.hasOwnProperty('admin') });
  }

  login({ username, passkey }): Observable<{ logged: boolean, admin: boolean }> {
    const res = passkey == PRIVATE_AUTH_KEY ? [{ admin: true }] : [];
    
    if(res.length == 0) {
      return Observable.of({ logged: false, admin: false });
    }

    if(res[0].admin == true) {
      sessionStorage.setItem('admin', true);
    }

    sessionStorage.setItem('login', true);
    return Observable.of({ logged: true, admin: res[0].admin == true });
  }

  logout(): void {
    delete sessionStorage.login;
    delete sessionStorage.admin;
  }
}
