type ExecutionHistoryItem = {
  id: string;
  transaction: string;
  tableName: string;
  filtersLabel: string;
  rowCount: number;
};

type HelperPanelProps = {
  transaction: string;
  currentTable: string;
  activeFilters: Record<string, string>;
  activeVariantLabel: string;
  filterMode: string;
  caseSensitive: boolean;
  maxRows: string;
  executionHistory: ExecutionHistoryItem[];
};

export function HelperPanel({
  transaction,
  currentTable,
  activeFilters,
  activeVariantLabel,
  filterMode,
  caseSensitive,
  maxRows,
  executionHistory,
}: HelperPanelProps) {
  const filterEntries = Object.entries(activeFilters).filter(([, value]) => value.trim() !== "");

  return (
    <aside className="panel helper-panel" data-testid="helper-panel">
      <div className="section-title">Context</div>
      <div className="helper-row">
        <span className="helper-label">Transaction</span>
        <span data-testid="helper-transaction">{transaction || "-"}</span>
      </div>
      <div className="helper-row">
        <span className="helper-label">Current Table</span>
        <span data-testid="helper-current-table">{currentTable || "-"}</span>
      </div>
      <div className="helper-row">
        <span className="helper-label">Variant</span>
        <span data-testid="helper-active-variant">{activeVariantLabel || "Default"}</span>
      </div>
      <div className="helper-row">
        <span className="helper-label">Search Profile</span>
        <div className="helper-stack" data-testid="helper-search-profile">
          <span>Mode: {filterMode}</span>
          <span>Case: {caseSensitive ? "Sensitive" : "Insensitive"}</span>
          <span>Max rows: {maxRows}</span>
        </div>
      </div>
      <div className="helper-row helper-filters">
        <span className="helper-label">Active Filters</span>
        <div data-testid="helper-active-filters">
          {filterEntries.length === 0
            ? "-"
            : filterEntries.map(([key, value]) => (
                <div className="filter-chip" key={key}>
                  {key}={value}
                </div>
              ))}
        </div>
      </div>
      <div className="helper-row helper-history-row">
        <span className="helper-label">Recent Executions</span>
        <div className="helper-history" data-testid="helper-execution-history">
          {executionHistory.length === 0 ? (
            <div className="history-card history-card-empty">No executions yet.</div>
          ) : (
            executionHistory.map((item) => (
              <div className="history-card" key={item.id} data-testid={`history-item-${item.id}`}>
                <div className="history-table">{item.transaction} / {item.tableName}</div>
                <div className="history-filters">{item.filtersLabel}</div>
                <div className="history-count">{item.rowCount} rows</div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
