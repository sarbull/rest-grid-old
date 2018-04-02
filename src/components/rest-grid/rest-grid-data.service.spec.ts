import {RestGridDataService} from './rest-grid-data.service';
import {
  TestBed,
  getTestBed
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('RestGridDataService', () => {
  let service: RestGridDataService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RestGridDataService
      ]
    });
    injector = getTestBed();
    service = injector.get(RestGridDataService);
    httpMock = injector.get(HttpTestingController);
    service.setUrl('/api/test');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set an url', () => {
    expect(service.getUrl()).toEqual('/api/test');
  });

  it('should retrieve an url with custom query params', () => {
    service.setQueryParam('query1', 'value1');
    service.setQueryParam('query2', 'value2');

    expect(service.getUrl()).toEqual('/api/test?query1=value1&query2=value2');
  });

  it('should ignore empty query params', () => {
    service.setQueryParam('query1', '');
    service.setQueryParam('query2', '');

    expect(service.getUrl()).toEqual('/api/test');
  });

  it('should add asc column sorter', () => {
    service.addSorter('asc', 'column1');

    expect(service.sorters.get('asc')).toEqual([
      'column1'
    ]);
  });

  it('should not add two identical asc column sorters', () => {
    service.addSorter('asc', 'column1');
    service.addSorter('asc', 'column1');

    expect(service.sorters.get('asc')).toEqual([
      'column1'
    ]);
  });

  it('should add four asc column sorters and remove one', () => {
    service.addSorter('asc', 'column1');
    service.addSorter('asc', 'column2');
    service.addSorter('asc', 'column3');
    service.addSorter('asc', 'column4');

    service.removeSorter('asc', 'column1');

    expect(service.sorters.get('asc').length).toBe(3);

    expect(service.sorters.get('asc')).toEqual([
      'column2',
      'column3',
      'column4'
    ]);
  });

  it('should add desc column sorter', () => {
    service.addSorter('desc', 'column1');

    expect(service.sorters.get('desc')).toEqual([
      'column1'
    ]);
  });

  it('should add four desc column sorters and remove one', () => {
    service.addSorter('desc', 'column1');
    service.addSorter('desc', 'column2');
    service.addSorter('desc', 'column3');
    service.addSorter('desc', 'column4');

    service.removeSorter('desc', 'column1');

    expect(service.sorters.get('desc').length).toBe(3);

    expect(service.sorters.get('desc')).toEqual([
      'column2',
      'column3',
      'column4'
    ]);
  });

  it('should add four desc column sorters and remove one', () => {
    service.addSorter('desc', 'column1');
    service.addSorter('desc', 'column2');
    service.addSorter('desc', 'column3');
    service.addSorter('desc', 'column4');

    service.removeSorter('desc', 'column1');

    expect(service.sorters.get('desc').length).toBe(3);

    expect(service.sorters.get('desc')).toEqual([
      'column2',
      'column3',
      'column4'
    ]);
  });

  it('should return the proper sorters url', () => {
    service.addSorter('asc', 'column1');
    service.addSorter('desc', 'column2');
    service.addSorter('asc', 'column3');
    service.addSorter('desc', 'column4');

    expect(service.getUrl()).toEqual('/api/test?sort=asc.column1,asc.column3,desc.column2,desc.column4');
  });

  it('should return the proper urlSorters', () => {
    service.addSorter('asc', 'column1');
    service.addSorter('desc', 'column2');
    service.addSorter('asc', 'column3');
    service.addSorter('desc', 'column4');

    expect(service.getUrlSorters()).toEqual('asc.column1,asc.column3,desc.column2,desc.column4');
  });


  it('should update filter with new value', () => {
    service.addFilter('column1', '>', 3);
    service.addFilter('column1', '>', 6);

    expect(service.filters.get('filters')).toEqual({
      'column1': {
        '>': 6
      }
    });
  });

  it('should add and remove a filter for a column', () => {
    service.addFilter('column1', '>', 3);
    service.removeFilter('column1', '>');

    expect(service.filters.get('filters')).toEqual({});
  });

  it('should add three filters and remove one', () => {
    service.addFilter('column1', '>', 3);
    service.addFilter('column1', '>', 4);
    service.addFilter('column1', '<', 5);
    service.removeFilter('column1', '>');

    expect(service.filters.get('filters')).toEqual({
      'column1': {
        '<': 5
      }
    });
  });

  it('should retrieve the proper urlFilters', () => {
    service.addFilter('column1', '>', 3);
    service.addFilter('column1', '<', 5);

    expect(service.getUrlFilters()).toEqual('column1>3,column1<5');
  });

  it('should add, remove a filter and generate the proper urlFilters', () => {
    service.addFilter('column1', '>', 3);
    service.addFilter('column1', '<', 5);
    service.addFilter('column2', '<', 7);
    service.removeFilter('column1', '>');
    service.removeFilter('column1', '<');

    expect(service.getUrlFilters()).toEqual('column2<7');
  });

  it('should return a full url', () => {
    service.addFilter('column1', '>', 3);
    service.addSorter('asc', 'column1');
    service.setQueryParam('currentPage', 1);
    service.setQueryParam('itemsPerPage', 10);

    expect(service.getUrl()).toEqual('/api/test?currentPage=1&itemsPerPage=10&sort=asc.column1&filter=column1>3');
  });

  it('should check if a column is in sorters', () => {
    service.doSort('column1');

    expect(service.isInAsc('column1')).toBe(true);
  });

  it('should switch asc desc sorter', () => {
    service.doSort('column1');

    expect(service.getUrlSorters()).toEqual('asc.column1');

    service.doSort('column1');

    expect(service.getUrlSorters()).toEqual('desc.column1');

    service.doSort('column1');

    expect(service.getUrlSorters()).toEqual('asc.column1');
  });

  it('should return an Observable<GridOptionsInterface> on get grid options', () => {
    const gridOptions = {
      columns: [
        {
          name: 'position',
          type: 'number',
          filter: false,
          sort: false
        }
      ]
    };

    service.getGridOptions().subscribe(data => {
      expect(gridOptions.columns.length).toBe(1);
      expect(data).toEqual(gridOptions);
    });

    const req = httpMock.expectOne(`${service.getUrl()}/options`);
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

    service.getElements().subscribe(data => {
      expect(elements.items.length).toBe(1);
      expect(elements.totalCount).toBe(1);
      expect(elements.itemsPerPage).toBe(10);
      expect(elements.currentPage).toBe(1);

      expect(data).toEqual(elements);
    });

    const req = httpMock.expectOne(service.getUrl());
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

    service.queryElements(1, 10).subscribe(data => {
      expect(elements.items.length).toBe(1);
      expect(elements.totalCount).toBe(1);
      expect(elements.itemsPerPage).toBe(10);
      expect(elements.currentPage).toBe(1);

      expect(data).toEqual(elements);
    });

    const req = httpMock.expectOne(service.getUrl());
    expect(req.request.method).toBe('GET');
    req.flush(elements);
  });
});
