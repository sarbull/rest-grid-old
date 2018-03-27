import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class DataDao {
  constructor(private http: HttpClient) {}

  getData(sort: string, order: string, page: number, pageSize: number): Observable<any> {
    // itemsPerPage
    // currentPage  => 2
    // nextPage     => false
    // previousPage => true

    console.log('sort=', sort);
    console.log('order=', order);
    console.log('page=', page);

    const href = `/api/elements?page=${page + 1}&pageSize=${pageSize}`;

    return this.http.get<any>(href);
  }
}
