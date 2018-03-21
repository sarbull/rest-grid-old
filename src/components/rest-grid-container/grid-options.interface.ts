interface Definition {
  type: string;
  filter: boolean;
  sort: boolean;
}

interface Column {
  [key: string]: Definition;
}

export interface GridOptions {
  columns: Column[];
}
