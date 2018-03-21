export interface Definition {
  name: string;
  type: string;
  filter: boolean;
  sort: boolean;
}

export interface GridOptions {
  columns: Definition[];
}
