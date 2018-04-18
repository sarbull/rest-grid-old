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

  clear(): void {
    delete this.fromDate;
    delete this.toDate;
  }

  submit(): void {
    const t = [
      {
        column: this.entity.name,
        comparator: '>',
        value: this.fromDate
      },
      {
        column: this.entity.name,
        comparator: '<',
        value: this.toDate
      },
    ];

    this.notify.emit(t);
  }
}
