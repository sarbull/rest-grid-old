import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestGridComponent} from './rest-grid.component';
import {
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import {NumberFilter} from './filters/number/number.filter';
import {DateFilter} from './filters/date/date.filter';
import {StringFilter} from './filters/string/string.filter';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RestGridDataService} from './rest-grid-data.service';

@NgModule({
  declarations: [
    RestGridComponent,
    NumberFilter,
    DateFilter,
    StringFilter
  ],
  imports: [
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    RestGridComponent
  ],
  providers: [
    RestGridDataService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'}
  ]
})
export class RestGridModule {
}
