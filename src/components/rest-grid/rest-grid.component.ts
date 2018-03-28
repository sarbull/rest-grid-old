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
import {RestGridDataService} from './rest-grid-data.service';
import {DataModelInterface} from './options/grid-options.interface';

@Component({
  selector: 'rg-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent implements OnInit {
  resultsLength = 0;
  isLoadingResults = true;
  @Input() endpoint: string;
  displayedColumns: String[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<DataModelInterface> = new MatTableDataSource<DataModelInterface>();


  constructor(private restGridDataService: RestGridDataService) {
  }

  ngOnInit() {
    this.restGridDataService.setUrl(this.endpoint);

    zip(
      this.restGridDataService.getGridOptions(),
      this.restGridDataService.getElements(),
      (gridOptions: any, elements: any) => ({gridOptions, elements})
    ).subscribe(data => {
      this.displayedColumns = data.gridOptions.columns.map((e) => e.name);
      this.dataSource.data = data.elements.items;
      this.resultsLength = data.elements.totalCount;
      this.isLoadingResults = false;
    });

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.restGridDataService.queryElements(
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
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }
}
