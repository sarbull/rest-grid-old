import {
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {zip} from 'rxjs/observable/zip';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {DataDao} from './dao/data.dao';
import {RestGridDataService} from './rest-grid-data.service';
import {DataModelInterface} from './options/grid-options.interface';

@Component({
  selector: 'rg-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent implements OnInit {
  @Input() endpoint: String;

  displayedColumns: String[] = [
    // 'position',
    // 'name',
    // 'weight',
    // 'symbol'
  ];

  dataSource: MatTableDataSource<DataModelInterface> = new MatTableDataSource<DataModelInterface>();
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private database: DataDao, private restGridDataService: RestGridDataService) {}

  ngOnInit() {
    this.restGridDataService.setUrl(this.endpoint);

    zip(
      this.restGridDataService.getElements(),
      this.restGridDataService.getGridOptions()
    ).subscribe((data) => {
      this.resultsLength = data[0].totalCount;
      this.dataSource.data = data[0].items;
      this.displayedColumns = data[1].columns.map(e => e.name);

      this.isLoadingResults = false;
    });

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.database.getData(
            this.paginator.pageIndex,
            this.paginator.pageSize
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
