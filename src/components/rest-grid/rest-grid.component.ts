import {
  Component,
  OnInit,
  ViewChild,
  Input, Output, EventEmitter
} from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {ColumnInterface, DataModelInterface, GridOptionsInterface} from './options/grid-options.interface';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rg-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent implements OnInit {
  resultsLength = 0;
  isLoadingResults = true;
  @Input() endpoint: string;
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<DataModelInterface> = new MatTableDataSource<DataModelInterface>();

  @Output() onActionClick: EventEmitter<Object> = new EventEmitter<Object>();

  urlSubject: Subject<string> = new Subject<string>();

  columns: any = {};

  actions: string[] = [];

  filters: Map<String, Object> = new Map<String, Object>();
  sorters: Map<String, Array<String>> = new Map<String, Array<String>>();
  query: Map<String, any> = new Map<String, any>();
  url: string;


  constructor(private http: HttpClient) {
    this.filters.set('filters', []);
    this.sorters.set('asc', []);
    this.sorters.set('desc', []);
  }

  ngOnInit() {
    this.setUrl(this.endpoint);

    const merged = merge(
      this.paginator.page,
      this.urlSubject
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;

        this.setQueryParam('currentPage', this.paginator.pageIndex + 1);
        this.setQueryParam('itemsPerPage', this.paginator.pageSize);

        return this.getElements();
      }),
      map(data => {

        return data;
      })
    );

    const options = this.getGridOptions();

    combineLatest(
      options,
      merged
    ).subscribe(data => {
      const [optionsData, mergedData] = data;
      let columns;

      optionsData.columns.map((e: ColumnInterface) => {
        this.columns[e.name] = e;
      });

      columns = optionsData.columns.map((e) => e.name);

      if (optionsData.actions.length > 0) {
        columns.unshift('actions');

        this.columns['actions'] = {
          sort: false,
          filter: false,
          type: 'action',
          name: 'actions'
        };
      }

      this.actions = optionsData.actions;
      this.displayedColumns = columns;
      this.dataSource.data = mergedData.items;
      this.resultsLength = mergedData.totalCount;
      this.isLoadingResults = false;
    });
  }

  triggerAction(menuItem: String, row: any) {
    const data = {
      menuItem: menuItem,
      row: row
    };

    this.onActionClick.emit(data);
  }

  handleFilter(input: any): void {
    input.forEach((e) => {
      this.doFilter(e);
    });

    this.urlSubject.next();
  }

  triggerSort(column: string): void {
    this.doSort(column);

    this.urlSubject.next();
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

    if (data[column]) {
      delete data[column][comparator];

      if (Object.keys(data[column]).length === 0) {
        delete data[column];
      }
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
      console.log('add', entity.column, entity.value);
      this.addFilter(entity.column, entity.comparator, entity.value);
    } else {
      console.log('remove', entity.column, entity.value);
      this.removeFilter(entity.column, entity.comparator);
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
