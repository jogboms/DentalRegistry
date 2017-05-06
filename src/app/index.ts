import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { STORE } from './reducers';
import { SERVICES } from './services';
import { EFFECTS } from './effects';
import { ACTIONS } from './actions';

import { AppComponent } from './components/app/app.component';
import { Protected } from './components/shared/protected.component';
import { NwSaveAs } from './components/shared/nwsaveas.directive';
import { MainModule } from './components/shared-module/main';

const routes:Routes = [
  { path: '', component: Protected, children:
    [
      { path: '', pathMatch: 'full', redirectTo: '/patients' },
      { path: 'patients', loadChildren: 'app/components/patients#PatientsModule' }
    ]
  },
  { path: 'login', loadChildren: 'app/components/login#LoginModule' },
]

@NgModule({
  imports: [
    BrowserModule,
    MainModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
    ReactiveFormsModule,
    ...STORE,
    ...EFFECTS,
  ],
  declarations: [
    AppComponent,
    Protected,
    NwSaveAs,
  ],
  providers: [
    ...SERVICES,
    ...ACTIONS,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
