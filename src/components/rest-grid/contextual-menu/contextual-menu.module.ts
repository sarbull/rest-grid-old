import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextualMenuComponent} from './contextual-menu.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    ContextualMenuComponent
  ],
  entryComponents: [
    ContextualMenuComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ContextualMenuComponent
  ]
})
export class ContextualMenuModule {
}
