import {Component} from '@angular/core';

@Component({
  selector: 'rg-string-filter',
  styleUrls: ['./string.filter.css'],
  templateUrl: 'string.filter.html',
})
export class StringFilter {
  data: string;

  readData(event: any) {
    this.data = event.target.value;
  }
}
