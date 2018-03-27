import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class DataDao {
  constructor(private http: HttpClient) {}

  getData(page: number): Observable<any> {
    const href = `/api/elements?page=${page + 1}`;

    return this.http.get<any>(href);
  }
}
