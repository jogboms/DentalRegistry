import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState, getLogged } from 'app/reducers';

import { AuthActions } from 'app/actions/auth.action';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styles: [`
    :host { display: table-row-group; }
    input.form-control {
      border: rgb(96, 73, 85) solid 2pt;
      border-radius: 20pt;
      padding: 2rem 5rem;
      text-align: center;
      color: white;
      box-shadow: none;
      background: rgba(0, 0, 0, 0.37);
    }
  `]
})
export class LoginComponent {
  form: FormGroup;
  IS_LOGGED: boolean;
  Sub: Subscription;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private authActions: AuthActions
    ){

    this.Sub = store.let(getLogged()).subscribe(state => this.IS_LOGGED =!!state)
  }

  ngOnInit(){
    this.form = this._form.group({
      passkey: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  onSubmit(e){
    this.store.dispatch(this.authActions.login(this.form.value));

    e.preventDefault()
  }
}
