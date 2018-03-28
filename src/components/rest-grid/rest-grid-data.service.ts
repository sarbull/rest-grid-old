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
  gridOptions: Observable<GridOptionsInterface> = null;
  elements: Observable<DataModelInterface> = null;

  url: String;

  constructor(private http: HttpClient) {
  }

  setUrl(url: String): void {
    this.url = url;
  }

  getUrl(): String {
    return this.url;
  }

  getElements(): Observable<DataModelInterface> {
    if (!this.elements) {
      this.elements = this.http.get(`${this.url}`).map((response: any) => {
        return response;
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
