import {Injectable} from '@angular/core';
import {
  ColumnInterface,
  GridOptionsInterface
} from './options/grid-options.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestGridDataService {
  gridOptions: Observable<GridOptionsInterface> = null;
  elements: Observable<ColumnInterface[]> = null;

  url: '/api/elements';

  constructor(private http: HttpClient) {
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
}
