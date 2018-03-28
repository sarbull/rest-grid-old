import {RestGridDataService} from './rest-grid-data.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

describe('RestGridDataService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        RestGridDataService
      ]
    });

    service = TestBed.get(RestGridDataService);
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
});
