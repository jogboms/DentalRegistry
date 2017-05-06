import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { generateId } from 'app/utils/generateId';
import { generateHexColor } from "app/utils/generateHexColor";

import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { PatientActions } from 'app/actions/patient.action';
import { PatientModel } from 'app/model/patient.model';
import { getPatient } from 'app/reducers';


@Component({
  moduleId: module.id,
  selector: 'patients-create',
  templateUrl: './create.html',
  styles: [`
    :host { 
      display: block; 
      background: white;
      padding: 1rem .25rem;
      margin-left: -15px;
      margin-right: -15px;

    }
    @media screen and (min-width: 990px) {
      :host { 
        margin-left: 0;
      }
    }
    h1 {
      color: #26a69a;
      margin: 1rem 0;
    }
    .form-control {
      box-shadow: inset 0 -1px 0 #ffffff;
      background: whitesmoke;
      padding: 0 1rem;
    }
  `],
})
export class PatientsCreate {
  id$: Observable<string>;
  form: FormGroup;
  create_success: boolean = false;
  create_submitted: boolean = false;
  create_invalid: boolean = false;
  Sub: Subscription;

  constructor(
    private _form: FormBuilder,
    private store: Store<AppState>,
    private patientActions: PatientActions,
    ) {}

  ngOnInit() {
    this.id$ = this.store.let(getPatient()).map((p: PatientModel) => p.id)
      .do(id => this.create_success = this.create_submitted ? !!id : false)

    this.form = this._form.group({
      reg_id: ['', Validators.required],
      title: ['', Validators.required],
      surname: ['', Validators.required],
      names: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      occupation: ['', Validators.required],
      age: ['', Validators.required],
      created: [new Date()],
    });

    this.Sub = this.form.valueChanges.debounceTime(1500).subscribe(() => this.create_submitted = false);
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  onSubmit(e) {
    this.create_submitted = true;

    if(!this.form.valid) {
      this.create_invalid = true;
      return;
    }

    const insert = Object.assign({}, this.form.value, {
      color: generateHexColor()
    });

    this.store.dispatch(this.patientActions.create(insert));

    setTimeout(() => {
      this.form.patchValue({
        surname: '',
        names: '',
        telephone: '',
        address: '',
      });
    }, 2500);

    e.preventDefault();
  }
}
