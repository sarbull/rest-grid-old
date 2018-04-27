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
  MAT_DATE_LOCALE,
  MatSelectModule, MatButtonModule
} from '@angular/material';

import {NumberFilter} from './filters/number/number.filter';
import {DateFilter} from './filters/date/date.filter';
import {StringFilter} from './filters/string/string.filter';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ContextualMenuModule} from './contextual-menu/contextual-menu.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RestGridComponent,
    NumberFilter,
    DateFilter,
    StringFilter
  ],
  imports: [
    ContextualMenuModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    RestGridComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'}
  ]
})
export class RestGridModule {
}
