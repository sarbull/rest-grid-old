import { Component } from '@angular/core';

@Component({
  selector: 'rg-contextual-menu',
  templateUrl: './contextual-menu.component.html'
})
export class ContextualMenuComponent {
  isOpen: Boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  open(): void {
    this.isOpen = true;
  }
}
