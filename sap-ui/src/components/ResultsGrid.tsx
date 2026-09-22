import type { GenericRow, SortDirection } from "../types";
import { sanitizeColumnName } from "../utils/filtering";

type ResultsGridProps = {
  tableName: string;
  tableDescription: string;
  columns: string[];
  rows: GenericRow[];
  matchedCount: number;
  selectedRowIndex: number | null;
  onSelectRow: (rowIndex: number) => void;
  sortColumn: string;
  sortDirection: SortDirection;
  onSortChange: (column: string) => void;
  isTruncated: boolean;
};

export function ResultsGrid({
  tableName,
  tableDescription,
  columns,
  rows,
  matchedCount,
  selectedRowIndex,
  onSelectRow,
  sortColumn,
  sortDirection,
  onSortChange,
  isTruncated,
}: ResultsGridProps) {
  return (
    <section className="panel results-panel">
      <div className="results-header">
        <div>
          <div className="section-title">Results</div>
          <div className="results-meta">
            <span data-testid="current-table-name">{tableName || "-"}</span>
            <span className="result-divider">|</span>
            <span data-testid="result-count">{rows.length} rows</span>
            <span className="result-divider">|</span>
            <span data-testid="matched-count">{matchedCount} matched</span>
          </div>
          <div className="results-description" data-testid="current-table-description">
            {tableDescription}
          </div>
        </div>
        <div className="sort-state" data-testid="sort-state">
          Sorted by {sortColumn} ({sortDirection})
          {isTruncated ? " | Display limited" : ""}
        </div>
      </div>

      <div className="table-wrapper" data-testid="results-table">
        <table className="results-table">
          <thead>
            <tr data-testid="table-header-row">
              <th className="selector-column">Sel</th>
              {columns.map((column) => {
                const safeName = sanitizeColumnName(column);
                const isSorted = sortColumn === column;

                return (
                  <th
                    key={column}
                    data-testid={`table-header-${safeName}`}
                    data-column-name={column}
                    data-sort-direction={isSorted ? sortDirection : "none"}
                  >
                    <button
                      type="button"
                      className="header-button"
                      data-testid={`sort-header-${safeName}`}
                      onClick={() => onSortChange(column)}
                    >
                      <span>{column}</span>
                      <span className="header-sort-indicator">{isSorted ? (sortDirection === "asc" ? "▲" : "▼") : "·"}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${tableName}-${index}`}
                data-testid={`table-row-${index}`}
                data-row-index={index}
                className={selectedRowIndex === index ? "is-selected" : ""}
                onClick={() => onSelectRow(index)}
              >
                <td className="selector-column">
                  <input
                    type="radio"
                    name="selected-row"
                    readOnly
                    checked={selectedRowIndex === index}
                    data-testid={`row-selector-${index}`}
                  />
                </td>
                {columns.map((column) => {
                  const safeName = sanitizeColumnName(column);
                  const shouldWrap = ["DESCRIPTION", "COMMENTS", "DETAILS", "NOTE_TEXT"].includes(column);

                  return (
                    <td
                      key={column}
                      data-testid={`cell-${index}-${safeName}`}
                      data-column-name={column}
                      className={shouldWrap ? "wrap-cell" : ""}
                    >
                      {String(row[column] ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
