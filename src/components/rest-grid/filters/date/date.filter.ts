import {Component} from '@angular/core';

@Component({
  selector: 'rg-date-filter',
  styleUrls: ['./date.filter.css'],
  templateUrl: 'date.filter.html',
})
export class DateFilter {
  fromDate: any;
  toDate: any;

  clear(): void {
    delete this.fromDate;
    delete this.toDate;
  }
}
