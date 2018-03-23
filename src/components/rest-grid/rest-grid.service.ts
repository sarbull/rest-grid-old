import {Injectable} from '@angular/core';

@Injectable()
export class RestGridService {
  sorters: Map<String, Array<String>> = new Map<String, Array<String>>();

  constructor() {
    this.sorters.set('asc', []);
    this.sorters.set('desc', []);
  }

  // addSorter('asc', 'column1');
  addSorter(key: String, value: String): void {
    const data = this.sorters.get(key);

    // check if value is in array
    if (data.indexOf(value)) {
      data.push(value);

      this.sorters.set(key, data);
    }
  }

  // removeSorter('asc', 'column1');
  removeSorter(key: String, value: String): void {
    let data = this.sorters.get(key);

    data = data.filter((v) => {
      return v !== value;
    });

    this.sorters.set(key, data);
  }
}
