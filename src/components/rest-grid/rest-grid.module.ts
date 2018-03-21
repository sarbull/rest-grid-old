import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestGridComponent } from './rest-grid.component';
import {
  MatCheckboxModule, MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [
    RestGridComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    CommonModule
  ],
  exports: [
    RestGridComponent
  ]
})
export class RestGridModule {}
