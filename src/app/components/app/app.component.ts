import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';

import { Window } from 'app/nw/main';

window['NW'] = Window; // node-webkit window object

@Component({
  selector: 'main',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  Window = Window;
  name: string = Window.App.name;
  title: string = Window.App.title;
  version: string = Window.App.version;

  onBack = () => this._location.back();

  onForward = () => this._location.forward();

  constructor(
    private store: Store<AppState>,
    private _location: Location,
    private router: Router,
    ) {

      this.store.let(getLogged()).filter(state => state == false)
        .subscribe(state => this.router.navigate(['/login']))
    // this.store.let(getLogged()).subscribe(state => {
    //   this.IS_LOGGED = !!state;
    //   if(!!state == false) {
    //     this._location.go('login');
    //   }
    // })
  }

  ngOnInit() {
  }
}
