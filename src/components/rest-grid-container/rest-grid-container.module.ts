import { NgModule } from '@angular/core';
import { RestGridContainerComponent } from './rest-grid-container.component';
import { RestGridModule } from '../rest-grid/rest-grid.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  MatCheckboxModule,
  MatTableModule
} from '@angular/material';

import { RestGridContainerService } from './rest-grid-container.service';

@NgModule({
  declarations: [
    RestGridContainerComponent
  ],
  imports: [
    RestGridModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    RestGridContainerComponent
  ],
  providers: [
    RestGridContainerService
  ]
})
export class RestGridContainerModule {}
