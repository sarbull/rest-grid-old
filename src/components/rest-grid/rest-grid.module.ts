import { NgModule } from '@angular/core';

import { RestGridComponent } from './rest-grid.component';
import {
  MatCheckboxModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [
    RestGridComponent
  ],
  imports: [
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    RestGridComponent
  ]
})
export class RestGridModule {}
