import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {DataDao} from './dao/data.dao';

@Component({
  selector: 'rg-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol'
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private database: DataDao) {}

  ngOnInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.database.getData(
            this.paginator.pageIndex
          );
        }),
        map(data => {
          this.isLoadingResults = false;

          this.resultsLength = data.totalCount;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;

          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}
