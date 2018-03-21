import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {RestGridContainerService} from './rest-grid-container.service';
import {GridOptions} from './grid-options.interface';
import { ElementInterface } from './element.interface';

@Component({
  selector: 'app-rest-grid-container',
  templateUrl: 'rest-grid-container.component.html',
})
export class RestGridContainerComponent implements OnInit {
  displayedColumns = [
    'select',
    'position',
    'name',
    'weight',
    'symbol'
  ];

  dataSource = new MatTableDataSource<ElementInterface>();
  selection = new SelectionModel<ElementInterface>(true, []);

  gridOptions: GridOptions = null;

  constructor(private _restGridContainerService: RestGridContainerService) {}

  ngOnInit() {
    this._restGridContainerService.getElements().subscribe((data: ElementInterface[]) => {
      data.forEach((e) => {
        this.dataSource.data.push(e);
      });
    });


    this._restGridContainerService.getGridOptions().subscribe((data: GridOptions) => {
      this.gridOptions = data;
    });
  }
}
