import { Component } from '@angular/core';

@Component({
  selector: 'rg-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  endpoint: String = '/api/elements';

  onActionClick(data): void {
    console.log('parent', data);
  }
}
