import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Menubar } from '../../shared/menubar.component';
import { Alert } from '../../shared/alert.component';
import { ProgressBar } from '../../shared/progressbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Alert,
    ProgressBar,
    Menubar,
  ],
  exports: [
    Alert,
    ProgressBar,
    Menubar,
  ],
})
export class MainModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MainModule,
      providers: []
    };
  };
}
