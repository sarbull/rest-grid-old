import {Component, Input} from '@angular/core';

@Component({
  selector: 'rg-number-filter',
  styleUrls: ['./number.filter.css'],
  templateUrl: 'number.filter.html',
})
export class NumberFilter {
  @Input() entity;

  fromNumber: number;
  toNumber: number;

  clear(): void {
    delete this.fromNumber;
    delete this.toNumber;
  }
}
