import {Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {RestGridContainerService} from './rest-grid-container.service';
import {GridOptions} from '../rest-grid/grid-options.interface';
import {ElementInterface} from './element.interface';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-rest-grid-container',
  templateUrl: 'rest-grid-container.component.html',
})
export class RestGridContainerComponent implements OnInit {
  // gridOptions: Observable<GridOptions> = new Observable<GridOptions>();
  // dataObservable: Observable<ElementInterface[]> = new Observable<ElementInterface[]>();

  constructor(private _restGridContainerService: RestGridContainerService) {}

  ngOnInit() {
    // this.dataObservable = this._restGridContainerService.getElements();

    // this.gridOptions = this._restGridContainerService.getGridOptions();
  }
}
