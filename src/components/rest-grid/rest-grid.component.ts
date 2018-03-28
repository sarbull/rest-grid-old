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

    const options = this.restGridDataService.getGridOptions();

    const elements = merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.restGridDataService.queryElements(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map(data => {
          return data;
        })
      );

    combineLatest(
      options,
      elements
    ).subscribe((data) => {
      this.displayedColumns = data[0].columns.map((e) => e.name);
      this.dataSource.data = data[1].items;
      this.resultsLength = data[1].totalCount;
      this.isLoadingResults = false;
    });
  }
}
