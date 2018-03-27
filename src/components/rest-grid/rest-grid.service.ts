import {Injectable} from '@angular/core';
import {
  ColumnInterface,
  GridOptionsInterface
} from './options/grid-options.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestGridService {
  filters: Map<String, Object> = new Map<String, Object>();
  sorters: Map<String, Array<String>> = new Map<String, Array<String>>();

  gridOptions: Observable<GridOptionsInterface> = null;
  elements: Observable<ColumnInterface[]> = null;

  url: '/api/elements';

  constructor(private http: HttpClient) {
    this.filters.set('filters', []);
    this.sorters.set('asc', []);
    this.sorters.set('desc', []);
  }

  getElements(): Observable<ColumnInterface[]> {
    if (!this.elements) {
      this.elements = this.http.get(`${this.url}`).map((response: ColumnInterface[]) => {
        const elements: ColumnInterface[] = [];

        response.forEach((e: ColumnInterface) => {
          elements.push(e);
        });

        return elements;
      });
    }

    return this.elements;
  }

  getGridOptions(): Observable<GridOptionsInterface> {
    if (!this.gridOptions) {
      this.gridOptions = this.http.get(`${this.url}/options`).map((response: GridOptionsInterface) => {
        return response;
      });
    }

    return this.gridOptions;
  }

  // addFilter('column1', '>', 2)
  // addFilter('column1', '<', 5)
  // addFilter('column2', '->', [1, 2, 3])
  // addFilter('column3', '==', 5)
  // addFilter('column4', '~', 'example')
  addFilter(column: string, comparator: string, value: any): void {
    const data = this.filters.get('filters');

    const newData = {
      ...data,
      [column]: {
        ...data[column],
        [comparator]: value
      }
    };

    this.filters.set('filters', newData);
  }

  // addFilter('column1', '>', 2)
  // addFilter('column1', '<', 5)
  // addFilter('column2', '->', [1, 2, 3])
  // addFilter('column3', '==', 5)
  // addFilter('column4', '~', 'example')
  removeFilter(column: string, comparator: string): void {
    const data = this.filters.get('filters');

    delete data[column][comparator];

    if (Object.keys(data[column]).length === 0) {
      delete data[column];
    }

    this.filters.set('filters', data);
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

  getUrl(): String {
    let url = '?';
    const urlSorters = this.getUrlSorters();

    url = `${url}${urlSorters}`;

    return url;
  }

  getUrlSorters(): String {
    const ascending = this.sorters.get('asc').map((e) => {
      return `asc.${e}`;
    }).join();

    const descending = this.sorters.get('desc').map((e) => {
      return `desc.${e}`;
    }).join();

    return `sort=${ascending},${descending}`;
  }
}
