import { NgModule } from '@angular/core';
import { RestGridContainerComponent } from './rest-grid-container.component';
import { RestGridModule } from '../rest-grid/rest-grid.module';

import { CommonModule } from '@angular/common';
import {
  MatCheckboxModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [
    RestGridContainerComponent
  ],
  imports: [
    RestGridModule,
    MatTableModule,
    MatCheckboxModule,
    CommonModule
  ],
  exports: [
    RestGridContainerComponent
  ]
})
export class RestGridContainerModule {}
