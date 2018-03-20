import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RestGridModule } from '../rest-grid/rest-grid.module';

import { RestGridContainerModule } from '../rest-grid-container/rest-grid-container.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RestGridModule,
    RestGridContainerModule,
    MatCardModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
