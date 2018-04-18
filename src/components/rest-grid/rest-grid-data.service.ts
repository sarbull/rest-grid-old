import {Injectable} from '@angular/core';
import {
  GridOptionsInterface,
  DataModelInterface
} from './options/grid-options.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';

@Injectable()
export class RestGridDataService {
  filters: Map<String, Object> = new Map<String, Object>();
  sorters: Map<String, Array<String>> = new Map<String, Array<String>>();
  query: Map<String, any> = new Map<String, any>();
  url: string;

  constructor(private http: HttpClient) {
    this.filters.set('filters', []);
    this.sorters.set('asc', []);
    this.sorters.set('desc', []);
  }

  setUrl(url: string): void {
    this.url = url;
  }

  getUrl(): string {
    const query = [];

    const urlSorters = this.getUrlSorters();
    const urlFilters = this.getUrlFilters();

    let url = this.url;

    this.query.forEach((value, key) => {
      if (value) {
        query.push(`${key}=${value}`);
      }
    });

    if (urlSorters) {
      query.push(`sort=${urlSorters}`);
    }

    if (urlFilters) {
      query.push(`filter=${urlFilters}`);
    }

    if (query.length) {
      url = `${url}?${query.join('&')}`;
    }

    return url;
  }

  setQueryParam(key: String, value: any): void {
    this.query.set(key, value);
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

  isInAsc(column: string): boolean {
    return this.sorters.get('asc').indexOf(column) !== -1;
  }

  isInDesc(column: string): boolean {
    return this.sorters.get('desc').indexOf(column) !== -1;
  }

  doFilter(entity): void {
    if (entity.value != null) {
      this.addFilter(entity.column, entity.comparator, entity.value);
    }
  }

  // doSort('column1'); initialise and switch asc to desc
  doSort(column: string): void {
    const isInAsc = this.isInAsc(column);
    const isInDesc = this.isInDesc(column);

    if (!isInAsc && !isInDesc) {
      this.addSorter('asc', column);
    }

    if (isInAsc && !isInDesc) {
      this.removeSorter('asc', column);

      this.addSorter('desc', column);
    } else {
      this.removeSorter('desc', column);

      this.addSorter('asc', column);
    }
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

  getUrlSorters(): String {
    const ascending = this.sorters.get('asc').map((e) => {
      return `asc.${e}`;
    });

    const descending = this.sorters.get('desc').map((e) => {
      return `desc.${e}`;
    });

    return `${ascending.concat(descending).join()}`;
  }

  // filter=column1>5,column1<7
  getUrlFilters(): String {
    const url = '';
    const flatQueryParams = [];

    const filters: Object = this.filters.get('filters');

    Object.keys(filters).forEach((column) => {
      Object.keys(filters[column]).forEach((comparator) => {
        const value = filters[column][comparator];

        flatQueryParams.push(`${column}${comparator}${value}`);
      });
    });

    return `${flatQueryParams.join()}`;
  }

  queryElements(currentPage: number, itemsPerPage: number): Observable<DataModelInterface> {
    this.setQueryParam('currentPage', currentPage + 1);
    this.setQueryParam('itemsPerPage', itemsPerPage);

    return this.getElements();
  }

  getElements(): Observable<DataModelInterface> {
    return this.http.get<DataModelInterface>(this.getUrl());
  }

  getGridOptions(): Observable<GridOptionsInterface> {
    return this.http.get<GridOptionsInterface>(`${this.url}/options`);
  }
}
