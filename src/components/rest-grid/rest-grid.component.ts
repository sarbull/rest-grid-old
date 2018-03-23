import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {GridOptions} from './grid-options.interface';
import {Observable} from 'rxjs/Observable';
import {Column, ColumnInterface} from './grid-options.interface';

@Component({
  selector: 'app-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent implements OnInit {
  displayedColumns: Array<String> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @Input() gridOptions: Observable<GridOptions>;
  @Input() dataObservable: Observable<any>;

  ngOnInit() {
    this.dataObservable.subscribe((data: any) => {
      if (data.length) {
        data.forEach((e) => {
          this.dataSource.data.push(e);
        });
      }
    });

    this.gridOptions.subscribe((g: GridOptions) => {
      if (g) {
        this.displayedColumns = this.displayedColumns.concat(g.columns.map((c: Column) => {
          return c.name;
        }));
      }
    });
  }

  dataIsReady(): boolean {
    return this.dataSource.data.length > 0 &&
      this.displayedColumns.length > 0;
  }
}
