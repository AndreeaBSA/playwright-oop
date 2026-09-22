export type CellValue = string | number;

export type GenericRow = Record<string, CellValue>;

export type FilterDefinition = {
  key: string;
  label: string;
  placeholder: string;
};

export type FilterMode = "contains" | "exact" | "startsWith";

export type SortDirection = "asc" | "desc";

export type TableVariant = {
  id: string;
  label: string;
  description: string;
  filters: Record<string, string>;
};

export type TableDefinition = {
  name: string;
  description: string;
  columns: string[];
  filterFields: FilterDefinition[];
  rows: GenericRow[];
  variants?: TableVariant[];
};
