import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {GridOptions} from './grid-options.interface';
import {Observable} from 'rxjs/Observable';
import { Definition } from './grid-options.interface';

@Component({
  selector: 'app-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent implements OnInit {
  displayedColumns: Array<String> = [
    'select'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @Input() gridOptions: Observable<GridOptions>;
  @Input() dataObservable: Observable<any>;
  @Input() selection: SelectionModel<any>;

  ngOnInit() {
    this.dataObservable.subscribe((data: any) => {
      data.forEach((e) => {
        this.dataSource.data.push(e);
      });
    });

    this.gridOptions.subscribe((g: GridOptions) => {
      this.displayedColumns = this.displayedColumns.concat(g.columns.map((c: Definition) => {
        return c.name;
      }));
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
