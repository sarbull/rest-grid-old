import { RestGridService } from './rest-grid.service';

describe('AppComponent', () => {
  let service;

  beforeEach(() => {
    service = new RestGridService();
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

  it('should return the proper url', () => {
    service.addSorter('asc', 'column1');
    service.addSorter('desc', 'column2');
    service.addSorter('asc', 'column3');
    service.addSorter('desc', 'column4');

    expect(service.getUrl()).toEqual('?sort=asc.column1,asc.column3,desc.column2,desc.column4');
  });

  it('should return the proper urlSorters', () => {
    service.addSorter('asc', 'column1');
    service.addSorter('desc', 'column2');
    service.addSorter('asc', 'column3');
    service.addSorter('desc', 'column4');

    expect(service.getUrlSorters()).toEqual('sort=asc.column1,asc.column3,desc.column2,desc.column4');
  });


  it('should work', () => {
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

    // it('should have an initial endpoit', () => {
    //   service.setUrl('/api/test');
    //
    //   expect(service.getUrl()).toBe('/api/test');
    // });
  });
});
