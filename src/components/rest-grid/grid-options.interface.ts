export interface ColumnInterface {
  name: String;
  type: String;
  filter: boolean;
  sort: boolean;
}

export class Column implements ColumnInterface {
  name: String;
  type: String;
  filter: boolean;
  sort: boolean;

  constructor(name: String, type: String, filter: boolean, sort: boolean) {
    this.name = name;
    this.type = type;
    this.filter = filter;
    this.sort = sort;
  }
}

export interface GridOptions {
  columns: ColumnInterface[];
}
