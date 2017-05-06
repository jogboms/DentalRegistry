import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState, getAdmin } from 'app/reducers';
import { PatientActions } from 'app/actions/patient.action';
import { SessionsActions } from 'app/actions/sessions.action';
import { PatientModel } from 'app/model/patient.model';
import { getPatient } from 'app/reducers';

@Component({
  selector: 'patient-profile-container',
  template: `
    <div class="container-fluid contain">
      <div *ngIf="!fetched" class="container add-top add-bottom">
        <br /><br /><br />
        <progress-bar></progress-bar>
      </div>
  
      <div *ngIf="fetched && !valid" class="container add-top add-bottom">
        <div class="alert alert-info" role="alert">
          <strong>Ooops!</strong>
          It appears this patient does not exist on our database
        </div>
      </div>
  
  
      <patient-profile
        (actions)="dispatch($event)"
        [patient]="patient$ | async">
      </patient-profile>
    </div>
  `,
})
export class PatientsProfileContainer {
  patient$: Observable<PatientModel>;
  fetched = false;
  valid = false;

  constructor(
    private store: Store<AppState>,
    private patientActions: PatientActions,
    private sessionsActions: SessionsActions,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(){
    const params$ = this.route.params;

    this.patient$ = params$.do(params => this.store.dispatch(this.patientActions.fetch(params['id'])))
      .switchMap(() => this.store.let(getPatient()))
      .do(() => this.fetched = this.valid = true)
  }

  actions({type, payload}) {
    switch (type) {
      case 'session_create':
        return this.sessionsActions.create(payload);
      case 'session_remove':
        return this.sessionsActions.remove(payload);
      case 'session_edit':
        return this.sessionsActions.edit(payload);
      case 'edit_patient':
        return this.patientActions.edit(payload);
      case 'delete_patient': {
        this.router.navigate(['/patients'])
        return this.patientActions.delete(payload);
      }
    }
  }

  dispatch = (action) => this.store.dispatch(this.actions(action));
}

