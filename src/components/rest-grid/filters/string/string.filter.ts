import {Component, Input} from '@angular/core';

@Component({
  selector: 'rg-string-filter',
  styleUrls: ['./string.filter.css'],
  templateUrl: 'string.filter.html',
})
export class StringFilter {
  @Input() entity;

  data: string;

  clear(): void {
    delete this.data;
  }
}
