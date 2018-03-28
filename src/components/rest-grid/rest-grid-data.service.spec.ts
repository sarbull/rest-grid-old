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
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set an url', () => {
    service.setUrl('/api/test');

    expect(service.getUrl()).toEqual('/api/test');
  });

  it('should retrieve an url with custom query params', () => {
    service.setUrl('/api/test');
    service.setQueryParam('query1', 'value1');
    service.setQueryParam('query2', 'value2');

    expect(service.getUrl()).toEqual('/api/test?query1=value1&query2=value2');
  });

  it('should ignore empty query params', () => {
    service.setUrl('/api/test');
    service.setQueryParam('query1', '');
    service.setQueryParam('query2', '');

    expect(service.getUrl()).toEqual('/api/test');
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

    service.setUrl('/api/test');

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

    service.setUrl('/api/test');

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

    service.setUrl('/api/test');

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
