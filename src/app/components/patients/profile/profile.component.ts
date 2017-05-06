import { Component, Input, Output, EventEmitter } from "@angular/core";

import { transition, animate, trigger, state, style } from "@angular/animations";
import { Router } from "@angular/router";
import { PatientModel } from 'app/model/patient.model';

@Component({
  selector: 'patient-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        }),
        animate('250ms ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0%)',
        }))
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({
          opacity: 0,
          transform: 'translateX(-100%)',
        }))
      ]),
    ])
  ],
})
export class PatientsProfile {
  @Input() patient: PatientModel;
  @Output() actions = new EventEmitter<Object>();

  onDelete(){
    if(confirm(`Are you sure you wish to remove all records of ${this.patient.surname} including Payments & Sessions?`)){
      this.actions.emit({type: 'delete_patient', payload: this.patient.id});
    }
  }
}

