import { Component, Input, Output, EventEmitter } from "@angular/core";
import { transition, animate, trigger, state, style } from "@angular/animations";

import { PatientModel } from 'app/model/patient.model';

@Component({
  moduleId: module.id,
  selector: 'patients-main',
  template: `
    <div *ngIf="!patients?.length; else patientsEl" class="text-center alert alert-warning" role="alert">
      No Patients exists.
    </div>
    
    <ng-template #patientsEl>
      <div class="clearfix">
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th>S/N<sup>o</sup></th>
                <th>Name</th>
                <th>Reg. N<sup>o</sup>.</th>
                <th>Reg. Date</th>
                <th>Cases</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let patient of patients; let i = index" @toggle>
                <td>
                  {{ i+1 }}
                </td>
                <td>
                  <a routerLink="view/{{ patient.id }}">
                    {{ patient.title+' '+patient.surname+' '+patient.names }}
                  </a>
                </td>
                <td>
                  <span class="label" [style.backgroundColor]="patient.color">
                    {{ patient.reg_id }}
                  </span>
                </td>
                <td>{{ patient.created | date }}</td>
                <td>({{ patient.sessions.length }}) Cases</td>
              </tr>
            </tbody>
          </table>
        </div>      
      </div>
    </ng-template>
  `,
  animations: [
    trigger('toggle', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        }),
        animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
          opacity: 1,
          transform: 'translateY(0%)',
        }))
      ]),
      transition(':leave', [
        animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
          opacity: 0,
          transform: 'translateY(-100%)',
        }))
      ]),
    ])
  ],
  styles: [`
    td { 
      border-top: none;
      border-bottom: 5px solid #E0E0E0;
      background-color: white; 
    }
    .label {
      font-size: 15px;
      font-weight: 400;
    }
  `]
})
export class PatientsMain {
  @Input() patients: PatientModel[];
  @Output() delete = new EventEmitter<number>();
}
