import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rg-date-filter',
  styleUrls: ['./date.filter.css'],
  templateUrl: 'date.filter.html',
})
export class DateFilter {
  @Input() entity;
  @Output() notify: EventEmitter<Array<Object>> = new EventEmitter<Array<Object>>();

  fromDate: any;
  toDate: any;

  getData(): Array<Object> {
    const fromDate = new Date(this.fromDate).getTime();
    const toDate = new Date(this.toDate).getTime();
    const fromDateIsTimestamp = fromDate.toString() !== 'NaN';
    const toDateIsTimestamp = toDate.toString() !== 'NaN';

    return [
      {
        column: this.entity.name,
        comparator: '>',
        value: fromDateIsTimestamp ? fromDate : null
      },
      {
        column: this.entity.name,
        comparator: '<',
        value: toDateIsTimestamp ? toDate : null
      }
    ];
  }

  clear(): void {
    delete this.fromDate;
    delete this.toDate;

    this.notify.emit(this.getData());
  }

  submit(): void {
    this.notify.emit(this.getData());
  }
}
