import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';
import { AuthActions } from 'app/actions/auth.action';
import { Observable } from 'rxjs/Observable';
import { Window } from 'app/nw/main';

window['NW'] = Window; // node-webkit window object

@Component({
  selector: 'patients',
  template: `
    <div>
      <menu-bar [title]="title" (logout)="onLogout()"></menu-bar>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./patients.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class PatientsComponent {
  title: string = Window.App.title;

  onLogout = () => this.store.dispatch(this.authActions.logout());

  constructor(
    private store: Store<AppState>,
    private authActions: AuthActions,
    private router: Router,
    ) {

      this.store.let(getLogged()).filter(state => state == false)
        .subscribe(state => this.router.navigate(['/login']))
    }
}
