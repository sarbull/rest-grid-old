export interface ColumnInterface {
  name: string;
  type: String;
  filter: boolean;
  sort: boolean;
}

export class Column implements ColumnInterface {
  name: string;
  type: String;
  filter: boolean;
  sort: boolean;

  constructor(name: string, type: String, filter: boolean, sort: boolean) {
    this.name = name;
    this.type = type;
    this.filter = filter;
    this.sort = sort;
  }
}

export interface GridOptionsInterface {
  columns: ColumnInterface[];
  actions: string[];
}

export interface DataModelInterface {
  totalCount: number;
  items: any[];
}
