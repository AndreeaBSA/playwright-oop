import type { FilterMode, GenericRow, SortDirection } from "../types";

export const EMPTY_GUID = "00000000000000000000000000000000";

export type FilterOptions = {
  mode: FilterMode;
  caseSensitive: boolean;
};

function normalizeSearchValue(value: string, caseSensitive: boolean): string {
  const trimmed = value.trim();
  return caseSensitive ? trimmed : trimmed.toLowerCase();
}

function matchesValue(rowValue: string, filterValue: string, mode: FilterMode): boolean {
  if (mode === "exact") {
    return rowValue === filterValue;
  }

  if (mode === "startsWith") {
    return rowValue.startsWith(filterValue);
  }

  return rowValue.includes(filterValue);
}

export function filterRows(
  rows: GenericRow[],
  filters: Record<string, string>,
  options: FilterOptions,
): GenericRow[] {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => normalizeSearchValue(value, options.caseSensitive) !== "",
  );

  if (activeFilters.length === 0) {
    return rows;
  }

  return rows.filter((row) =>
    activeFilters.every(([key, rawValue]) => {
      const filterValue = normalizeSearchValue(rawValue, options.caseSensitive);
      const rowValue = normalizeSearchValue(String(row[key] ?? ""), options.caseSensitive);
      return matchesValue(rowValue, filterValue, options.mode);
    }),
  );
}

function compareValues(left: string, right: string): number {
  const leftNumber = Number(left);
  const rightNumber = Number(right);

  if (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber)) {
    return leftNumber - rightNumber;
  }

  return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
}

export function sortRows(rows: GenericRow[], column: string, direction: SortDirection): GenericRow[] {
  return [...rows].sort((leftRow, rightRow) => {
    const leftValue = String(leftRow[column] ?? "");
    const rightValue = String(rightRow[column] ?? "");
    const comparison = compareValues(leftValue, rightValue);
    return direction === "asc" ? comparison : comparison * -1;
  });
}

export function limitRows(rows: GenericRow[], maxRows: number | null): GenericRow[] {
  if (maxRows === null) {
    return rows;
  }

  return rows.slice(0, maxRows);
}

export function sanitizeColumnName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
