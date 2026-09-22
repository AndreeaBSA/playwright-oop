export interface TableQuery {
  transaction: string;
  tableName: string;
  filters?: Record<string, string>;
}
