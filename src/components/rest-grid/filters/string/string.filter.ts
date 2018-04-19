import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rg-string-filter',
  styleUrls: ['./string.filter.css'],
  templateUrl: 'string.filter.html',
})
export class StringFilter {
  @Input() entity;
  @Output() notify: EventEmitter<Array<Object>> = new EventEmitter<Array<Object>>();

  data: string;

  getData(): Array<Object> {
    return [
      {
        column: this.entity.name,
        comparator: '~',
        value: this.data
      }
    ];
  }

  clear(): void {
    delete this.data;

    this.notify.emit(this.getData());
  }

  submit(): void {
    this.notify.emit(this.getData());
  }
}
