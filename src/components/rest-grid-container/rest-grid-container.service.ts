import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ElementInterface} from './element.interface';
import {GridOptions} from '../rest-grid/grid-options.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class RestGridContainerService {
  private _elements: Observable<ElementInterface[]> = null;
  private _gridOptions: Observable<GridOptions> = null;

  constructor(private _http: HttpClient) {
  }

  getElements(): Observable<ElementInterface[]> {
    if (!this._elements) {
      this._elements = this._http.get('/api/elements').map((response: ElementInterface[]) => {
        const e: ElementInterface[] = [];

        response.forEach((element: ElementInterface) => {
          e.push(element);
        });

        return e;
      });
    }

    return this._elements;
  }

  getGridOptions(): Observable<GridOptions> {
    if (!this._gridOptions) {
      this._gridOptions = this._http.get('/api/elements/grid').map((response: GridOptions) => {
        return response;
      });
    }

    return this._gridOptions;
  }
}
