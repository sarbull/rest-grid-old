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
import {DataModelInterface, GridOptionsInterface} from './options/grid-options.interface';
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

    // const elements = this.restGridDataService.getElements();

    combineLatest(
      options,
      merged
      // elements
    ).subscribe(data => {
      const [optionsData, mergedData] = data;

      console.log(data);

      this.displayedColumns = optionsData.columns.map((e) => e.name);
      this.dataSource.data = mergedData.items;
      this.resultsLength = mergedData.totalCount;
      this.isLoadingResults = false;
    });






    // const options = this.restGridDataService.getGridOptions();
    //
    // const elements = merge(
    //   this.paginator.page
    // ).pipe(
    //   startWith({}),
    //   switchMap(() => {
    //     this.isLoadingResults = true;
    //
    //     return this.restGridDataService.queryElements(
    //       this.paginator.pageIndex,
    //       this.paginator.pageSize
    //     );
    //   }),
    //   map(data => {
    //     return data;
    //   })
    // );
    //
    // combineLatest(
    //   options,
    //   elements
    // ).subscribe((data) => {
    //   this.displayedColumns = data[0].columns.map((e) => e.name);
    //   this.dataSource.data = data[1].items;
    //   this.resultsLength = data[1].totalCount;
    //   this.isLoadingResults = false;
    // });
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
