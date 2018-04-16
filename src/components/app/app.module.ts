import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RestGridModule} from '../rest-grid/rest-grid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RestGridModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
