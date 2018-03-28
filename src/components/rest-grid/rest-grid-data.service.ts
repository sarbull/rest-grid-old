import {Injectable} from '@angular/core';
import {
  GridOptionsInterface,
  DataModelInterface
} from './options/grid-options.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestGridDataService {
  query: Map<String, Object> = new Map<String, Object>();
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

  queryElements(currentPage: number, itemsPerPage: number): Observable<DataModelInterface> {
    this.query.set('currentPage', currentPage + 1);
    this.query.set('itemsPerPage', itemsPerPage);

    return this.getElements();
  }

  getElements(): Observable<DataModelInterface> {
    return this.http.get<DataModelInterface>(this.getUrl());
  }

  getGridOptions(): Observable<GridOptionsInterface> {
    return this.http.get<GridOptionsInterface>(`${this.url}/options`);
  }
}
