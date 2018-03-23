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
});
