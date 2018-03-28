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
  query: Map<String, any> = new Map<String, any>();
  url: string;

  constructor(private http: HttpClient) {
  }

  setUrl(url: string): void {
    this.url = url;
  }

  getUrl(): string {
    const query = [];
    let url = this.url;

    this.query.forEach((value, key) => {
      if (value) {
        query.push(`${key}=${value}`);
      }
    });

    if (query.length) {
      url = `${url}?${query.join('&')}`;
    }

    return url;
  }

  setQueryParam(key: String, value: any): void {
    this.query.set(key, value);
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
