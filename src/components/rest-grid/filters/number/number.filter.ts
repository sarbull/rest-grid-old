import {Component} from '@angular/core';

@Component({
  selector: 'rg-number-filter',
  styleUrls: ['./number.filter.css'],
  templateUrl: 'number.filter.html',
})
export class NumberFilter {
  from: number;
  to: number;

  readFrom(event: any) {
    this.from = event.target.value;
  }

  readTo(event: any) {
    this.to = event.target.value;
  }
}
