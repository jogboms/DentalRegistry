import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientsMainContainer } from './main/main-container.component';
import { PatientsMain } from './main/main.component';
import { PatientsSearchBar } from './searchbar/searchbar.component';
import { PatientsCreate } from './create/create.component';
import { PatientsProfile } from './profile/profile.component';
import { PatientsProfileContainer } from './profile/profile-container.component';
import { PatientsSessionCreate } from './sessions/create.component';
import { PatientsSessionList } from './sessions/list.component';
import { PatientsSessions } from './sessions/sessions.component';

import { MainModule } from '../shared-module/main/index';

const routes:Routes = [
  { path: '', component: PatientsComponent, children:
    [
      { path: '', component: PatientsMainContainer, },
      { path: 'view/:id', component: PatientsProfileContainer },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PatientsMain,
    PatientsMainContainer,
    PatientsComponent,
    PatientsProfileContainer,
    PatientsProfile,
    PatientsCreate,
    PatientsSessions,
    PatientsSessionCreate,
    PatientsSessionList,
    PatientsSearchBar,
  ]
})
export class PatientsModule {}
