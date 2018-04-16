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
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {RestGridDataService} from './rest-grid-data.service';
import {ColumnInterface, DataModelInterface} from './options/grid-options.interface';
import {Subject} from 'rxjs/Subject';

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

  url: Subject<string> = new Subject<string>();

  columns: any = {};


  constructor(private restGridDataService: RestGridDataService) {
  }

  ngOnInit() {
    this.restGridDataService.setUrl(this.endpoint);

    const merged = merge(
      this.paginator.page,
      this.url
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;

        this.restGridDataService.setQueryParam('currentPage', this.paginator.pageIndex + 1);
        this.restGridDataService.setQueryParam('itemsPerPage', this.paginator.pageSize);

        return this.restGridDataService.getElements();
      }),
      map(data => {

        return data;
      })
    );

    const options = this.restGridDataService.getGridOptions();

    combineLatest(
      options,
      merged
      // elements
    ).subscribe(data => {
      const [optionsData, mergedData] = data;

      this.displayedColumns = optionsData.columns.map((e) => e.name);

      optionsData.columns.map((e: ColumnInterface) => {
        this.columns[e.name] = e;
      });

      this.dataSource.data = mergedData.items;
      this.resultsLength = mergedData.totalCount;
      this.isLoadingResults = false;
    });
  }

  doSort(column: string): void {
    this.restGridDataService.doSort(column);

    this.url.next();
  }

  isInAsc(column: string): boolean {
    return this.restGridDataService.isInAsc(column);
  }

  isInDesc(column: string): boolean {
    return this.restGridDataService.isInDesc(column);
  }
}
