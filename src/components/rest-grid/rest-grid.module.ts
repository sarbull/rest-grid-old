import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatCheckboxModule,
    CommonModule
  ],
  exports: [
    RestGridComponent
  ]
})
export class RestGridModule {}
