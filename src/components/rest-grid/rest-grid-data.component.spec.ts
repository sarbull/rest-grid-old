import {
  TestBed,
  getTestBed
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {RestGridComponent} from './rest-grid.component';

describe('RestGridDataService', () => {
  let component: RestGridComponent;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RestGridComponent
      ]
    });
    injector = getTestBed();
    component = injector.get(RestGridComponent);
    httpMock = injector.get(HttpTestingController);
    component.setUrl('/api/test');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set an url', () => {
    expect(component.getUrl()).toEqual('/api/test');
  });

  it('should retrieve an url with custom query params', () => {
    component.setQueryParam('query1', 'value1');
    component.setQueryParam('query2', 'value2');

    expect(component.getUrl()).toEqual('/api/test?query1=value1&query2=value2');
  });

  it('should ignore empty query params', () => {
    component.setQueryParam('query1', '');
    component.setQueryParam('query2', '');

    expect(component.getUrl()).toEqual('/api/test');
  });

  it('should add asc column sorter', () => {
    component.addSorter('asc', 'column1');

    expect(component.sorters.get('asc')).toEqual([
      'column1'
    ]);
  });

  it('should not add two identical asc column sorters', () => {
    component.addSorter('asc', 'column1');
    component.addSorter('asc', 'column1');

    expect(component.sorters.get('asc')).toEqual([
      'column1'
    ]);
  });

  it('should add four asc column sorters and remove one', () => {
    component.addSorter('asc', 'column1');
    component.addSorter('asc', 'column2');
    component.addSorter('asc', 'column3');
    component.addSorter('asc', 'column4');

    component.removeSorter('asc', 'column1');

    expect(component.sorters.get('asc').length).toBe(3);

    expect(component.sorters.get('asc')).toEqual([
      'column2',
      'column3',
      'column4'
    ]);
  });

  it('should add desc column sorter', () => {
    component.addSorter('desc', 'column1');

    expect(component.sorters.get('desc')).toEqual([
      'column1'
    ]);
  });

  it('should add four desc column sorters and remove one', () => {
    component.addSorter('desc', 'column1');
    component.addSorter('desc', 'column2');
    component.addSorter('desc', 'column3');
    component.addSorter('desc', 'column4');

    component.removeSorter('desc', 'column1');

    expect(component.sorters.get('desc').length).toBe(3);

    expect(component.sorters.get('desc')).toEqual([
      'column2',
      'column3',
      'column4'
    ]);
  });

  it('should add four desc column sorters and remove one', () => {
    component.addSorter('desc', 'column1');
    component.addSorter('desc', 'column2');
    component.addSorter('desc', 'column3');
    component.addSorter('desc', 'column4');

    component.removeSorter('desc', 'column1');

    expect(component.sorters.get('desc').length).toBe(3);

    expect(component.sorters.get('desc')).toEqual([
      'column2',
      'column3',
      'column4'
    ]);
  });

  it('should return the proper sorters url', () => {
    component.addSorter('asc', 'column1');
    component.addSorter('desc', 'column2');
    component.addSorter('asc', 'column3');
    component.addSorter('desc', 'column4');

    expect(component.getUrl()).toEqual('/api/test?sort=asc.column1,asc.column3,desc.column2,desc.column4');
  });

  it('should return the proper urlSorters', () => {
    component.addSorter('asc', 'column1');
    component.addSorter('desc', 'column2');
    component.addSorter('asc', 'column3');
    component.addSorter('desc', 'column4');

    expect(component.getUrlSorters()).toEqual('asc.column1,asc.column3,desc.column2,desc.column4');
  });


  it('should update filter with new value', () => {
    component.addFilter('column1', '>', 3);
    component.addFilter('column1', '>', 6);

    expect(component.filters.get('filters')).toEqual({
      'column1': {
        '>': 6
      }
    });
  });

  it('should add and remove a filter for a column', () => {
    component.addFilter('column1', '>', 3);
    component.removeFilter('column1', '>');

    expect(component.filters.get('filters')).toEqual({});
  });

  it('should add three filters and remove one', () => {
    component.addFilter('column1', '>', 3);
    component.addFilter('column1', '>', 4);
    component.addFilter('column1', '<', 5);
    component.removeFilter('column1', '>');

    expect(component.filters.get('filters')).toEqual({
      'column1': {
        '<': 5
      }
    });
  });

  it('should retrieve the proper urlFilters', () => {
    component.addFilter('column1', '>', 3);
    component.addFilter('column1', '<', 5);

    expect(component.getUrlFilters()).toEqual('column1>3,column1<5');
  });

  it('should add, remove a filter and generate the proper urlFilters', () => {
    component.addFilter('column1', '>', 3);
    component.addFilter('column1', '<', 5);
    component.addFilter('column2', '<', 7);
    component.removeFilter('column1', '>');
    component.removeFilter('column1', '<');

    expect(component.getUrlFilters()).toEqual('column2<7');
  });

  it('should return a full url', () => {
    component.addFilter('column1', '>', 3);
    component.addSorter('asc', 'column1');
    component.setQueryParam('currentPage', 1);
    component.setQueryParam('itemsPerPage', 10);

    expect(component.getUrl()).toEqual('/api/test?currentPage=1&itemsPerPage=10&sort=asc.column1&filter=column1>3');
  });

  it('should check if a column is in sorters', () => {
    component.doSort('column1');

    expect(component.isInAsc('column1')).toBe(true);
  });

  it('should switch asc desc sorter', () => {
    component.doSort('column1');

    expect(component.getUrlSorters()).toEqual('asc.column1');

    component.doSort('column1');

    expect(component.getUrlSorters()).toEqual('desc.column1');

    component.doSort('column1');

    expect(component.getUrlSorters()).toEqual('asc.column1');
  });

  it('should do filter properly', () => {
    component.doFilter({
      column: 'column1',
      comparator: '>',
      value: 4
    });

    expect(component.getUrlFilters()).toEqual('column1>4');
  });

  it('should return an Observable<GridOptionsInterface> on get grid options', () => {
    const gridOptions = {
      actions: [
        'EDIT_ACTION',
        'DELETE_ACTION'
      ],
      columns: [
        {
          name: 'position',
          type: 'number',
          filter: false,
          sort: false
        }
      ]
    };

    component.getGridOptions().subscribe(data => {
      expect(gridOptions.columns.length).toBe(1);
      expect(data).toEqual(gridOptions);
    });

    const req = httpMock.expectOne(`${component.getUrl()}/options`);
    expect(req.request.method).toBe('GET');
    req.flush(gridOptions);
  });

  it('should return an Observable<DataModelInterface> on get elements', () => {
    const elements = {
      items: [
        {
          position: 1,
          name: 'Hydrogen',
          weight: 1.0079,
          symbol: 'H'
        }
      ],
      totalCount: 1,
      itemsPerPage: 10,
      currentPage: 1
    };

    component.getElements().subscribe(data => {
      expect(elements.items.length).toBe(1);
      expect(elements.totalCount).toBe(1);
      expect(elements.itemsPerPage).toBe(10);
      expect(elements.currentPage).toBe(1);

      expect(data).toEqual(elements);
    });

    const req = httpMock.expectOne(component.getUrl());
    expect(req.request.method).toBe('GET');
    req.flush(elements);
  });

  it('should return an Observable<DataModelInterface> on query elements', () => {
    const elements = {
      items: [
        {
          position: 1,
          name: 'Hydrogen',
          weight: 1.0079,
          symbol: 'H'
        }
      ],
      totalCount: 1,
      itemsPerPage: 10,
      currentPage: 1
    };

    component.queryElements(1, 10).subscribe(data => {
      expect(elements.items.length).toBe(1);
      expect(elements.totalCount).toBe(1);
      expect(elements.itemsPerPage).toBe(10);
      expect(elements.currentPage).toBe(1);

      expect(data).toEqual(elements);
    });

    const req = httpMock.expectOne(component.getUrl());
    expect(req.request.method).toBe('GET');
    req.flush(elements);
  });
});
