import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class DataDao {
  constructor(private http: HttpClient) {}

  getData(page: number, pageSize: number): Observable<any> {
    let href = `/api/elements?currentPage=${page + 1}`;

    if(pageSize) {
      href = `${href}&itemsPerPage=${pageSize}`;
    }

    return this.http.get<any>(href);
  }
}
