import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getLogged } from 'app/reducers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'menu-bar',
  templateUrl: 'menubar.html',
  styleUrls: ['./menubar.scss'],
})
export class Menubar {
  @Input() title: string;
  @Output() logout = new EventEmitter<boolean>();
  IS_LOGGED: boolean = false;
  Sub: Subscription;

  constructor(_store: Store<AppState>) {
    this.Sub = _store.let(getLogged()).subscribe(state => this.IS_LOGGED =!!state)
  }

  onLogout() {
    this.logout.emit(true);
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }
}
