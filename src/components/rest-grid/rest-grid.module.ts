import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestGridComponent} from './rest-grid.component';
import {
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';

import {RestGridService} from './rest-grid.service';

@NgModule({
  declarations: [
    RestGridComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    RestGridComponent
  ],
  providers: [
    RestGridService
  ]
})
export class RestGridModule {
}
