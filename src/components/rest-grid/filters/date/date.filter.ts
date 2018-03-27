import {Component} from '@angular/core';

@Component({
  selector: 'rg-date-filter',
  styleUrls: ['./date.filter.css'],
  templateUrl: 'date.filter.html',
})
export class DateFilter {
  from: number;
  to: number;

  readFrom(event: any) {
    this.from = event.target.value;
  }

  readTo(event: any) {
    this.to = event.target.value;
  }
}
