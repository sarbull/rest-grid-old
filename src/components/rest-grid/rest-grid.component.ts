import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-rest-grid',
  templateUrl: 'rest-grid.component.html',
})
export class RestGridComponent {
  @Input() name: string;
  @Input() displayedColumns: Array<String>;
  @Input() dataSource: MatTableDataSource<any>;
  @Input() selection: SelectionModel<any>;

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
