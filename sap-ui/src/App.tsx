import { useEffect, useMemo, useState } from "react";
import { CommandBar } from "./components/CommandBar";
import { FilterForm } from "./components/FilterForm";
import { HeaderBar } from "./components/HeaderBar";
import { HelperPanel } from "./components/HelperPanel";
import { QueryOptions } from "./components/QueryOptions";
import { ResultsGrid } from "./components/ResultsGrid";
import { SelectionDetails } from "./components/SelectionDetails";
import { StatusBar } from "./components/StatusBar";
import { mockTables, tableNames } from "./data/mockTables";
import type { FilterMode, GenericRow, SortDirection, TableDefinition, TableVariant } from "./types";
import { filterRows, limitRows, sortRows } from "./utils/filtering";

const SUPPORTED_TRANSACTIONS = new Set(["SE16", "SE16N"]);
const LOAD_DELAY_MS = 850;
const DEFAULT_VARIANT: TableVariant = {
  id: "default",
  label: "Default",
  description: "No preset filters.",
  filters: {},
};

type ExecutionHistoryItem = {
  id: string;
  transaction: string;
  tableName: string;
  filtersLabel: string;
  rowCount: number;
};

function getTableDefinition(tableName: string): TableDefinition | null {
  return mockTables[tableName.toUpperCase()] ?? null;
}

function buildFilterRecord(tableDefinition: TableDefinition | null, source: Record<string, string>): Record<string, string> {
  if (!tableDefinition) {
    return {};
  }

  return tableDefinition.filterFields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = source[field.key] ?? "";
    return acc;
  }, {});
}

function getMaxRowsValue(rawValue: string): number | null {
  return rawValue === "ALL" ? null : Number(rawValue);
}

function summarizeFilters(filters: Record<string, string>): string {
  const entries = Object.entries(filters).filter(([, value]) => value.trim() !== "");
  return entries.length === 0 ? "No filters" : entries.map(([key, value]) => `${key}=${value}`).join(" | ");
}

export default function App() {
  const [commandInput, setCommandInput] = useState("SE16");
  const [activeTransaction, setActiveTransaction] = useState("");
  const [browserActive, setBrowserActive] = useState(false);
  const [tableNameInput, setTableNameInput] = useState("/CFF/FR_PARENT");
  const [activeTable, setActiveTable] = useState<TableDefinition | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [results, setResults] = useState<GenericRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Enter a transaction to begin.");
  const [warningMessage, setWarningMessage] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>("contains");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [maxRows, setMaxRows] = useState("50");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [variantId, setVariantId] = useState("default");
  const [matchedCount, setMatchedCount] = useState(0);
  const [isTruncated, setIsTruncated] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<ExecutionHistoryItem[]>([]);

  const pendingTableDefinition = useMemo(
    () => getTableDefinition(tableNameInput.trim().toUpperCase()),
    [tableNameInput],
  );

  const availableVariants = pendingTableDefinition?.variants?.length
    ? pendingTableDefinition.variants
    : [DEFAULT_VARIANT];

  const activeVariant = availableVariants.find((variant) => variant.id === variantId) ?? availableVariants[0];
  const selectedRow = selectedRowIndex === null ? null : results[selectedRowIndex] ?? null;

  useEffect(() => {
    if (!pendingTableDefinition) {
      setFilters({});
      setSortColumn("");
      setVariantId(DEFAULT_VARIANT.id);
      return;
    }

    const initialVariant = pendingTableDefinition.variants?.[0] ?? DEFAULT_VARIANT;
    setVariantId(initialVariant.id);
    setSortColumn(pendingTableDefinition.columns[0] ?? "");
    setSortDirection("asc");
    setFilters(buildFilterRecord(pendingTableDefinition, initialVariant.filters));
  }, [pendingTableDefinition]);

  function handleTransactionSubmit() {
    const normalized = commandInput.trim().toUpperCase();

    if (!SUPPORTED_TRANSACTIONS.has(normalized)) {
      setBrowserActive(false);
      setActiveTransaction("");
      setWarningMessage("");
      setStatusMessage(`Transaction ${normalized || "-"} not supported. Use SE16 or SE16N.`);
      return;
    }

    setBrowserActive(true);
    setActiveTransaction(normalized);
    setWarningMessage("Use variants, sort actions and selection details to simulate production-style validation flows.");
    setStatusMessage(`Transaction ${normalized} opened. Enter a table name and execute.`);
  }

  function handleFilterChange(key: string, value: string) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleVariantChange(nextVariantId: string) {
    if (!pendingTableDefinition) {
      setVariantId(nextVariantId);
      return;
    }

    const nextVariant = (pendingTableDefinition.variants ?? [DEFAULT_VARIANT]).find((variant) => variant.id === nextVariantId) ?? DEFAULT_VARIANT;
    setVariantId(nextVariant.id);
    setFilters(buildFilterRecord(pendingTableDefinition, nextVariant.filters));
    setStatusMessage(`Variant ${nextVariant.label} applied for ${pendingTableDefinition.name}.`);
    setWarningMessage(nextVariant.description);
  }

  function handleClearFilters() {
    if (!pendingTableDefinition) {
      setFilters({});
      setVariantId(DEFAULT_VARIANT.id);
      setStatusMessage("Filters cleared.");
      setWarningMessage("");
      return;
    }

    setVariantId(DEFAULT_VARIANT.id);
    setFilters(buildFilterRecord(pendingTableDefinition, {}));
    setStatusMessage(`Filters cleared for ${pendingTableDefinition.name}.`);
    setWarningMessage("Variant reset to Default.");
  }

  function handleSortChange(column: string) {
    if (sortColumn === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortColumn(column);
    setSortDirection("asc");
  }

  function handleExecute() {
    if (!browserActive) {
      setStatusMessage("Open SE16 or SE16N before executing a table search.");
      setWarningMessage("");
      return;
    }

    const normalizedTableName = tableNameInput.trim().toUpperCase();
    const tableDefinition = getTableDefinition(normalizedTableName);

    if (!tableDefinition) {
      setLoading(false);
      setResults([]);
      setMatchedCount(0);
      setActiveTable(null);
      setSelectedRowIndex(null);
      setHasExecuted(true);
      setWarningMessage("Try one of the available mock tables from the datalist suggestions.");
      setStatusMessage(`Table ${normalizedTableName || "-"} was not found.`);
      return;
    }

    const effectiveSortColumn = sortColumn || tableDefinition.columns[0] || "";

    setLoading(true);
    setHasExecuted(false);
    setSelectedRowIndex(null);
    setWarningMessage("");
    setStatusMessage(`Executing ${tableDefinition.name}...`);

    window.setTimeout(() => {
      const filtered = filterRows(tableDefinition.rows, filters, {
        mode: filterMode,
        caseSensitive,
      });
      const sorted = effectiveSortColumn ? sortRows(filtered, effectiveSortColumn, sortDirection) : filtered;
      const limited = limitRows(sorted, getMaxRowsValue(maxRows));
      const truncationApplied = limited.length < sorted.length;
      const warnings: string[] = [];

      if (truncationApplied) {
        warnings.push(`Result list truncated to ${maxRows} rows.`);
      }

      if (filtered.some((row) => String(row.STATUS ?? row.ACTIVE ?? "").match(/Blocked|Archived|N/i))) {
        warnings.push("Result set contains exceptional business states such as blocked, archived or inactive rows.");
      }

      setActiveTable(tableDefinition);
      setResults(limited);
      setMatchedCount(filtered.length);
      setIsTruncated(truncationApplied);
      setLoading(false);
      setHasExecuted(true);
      setStatusMessage(
        filtered.length > 0
          ? `${tableDefinition.name} returned ${filtered.length} matched row(s) with ${limited.length} displayed.`
          : `${tableDefinition.name} returned no rows.`,
      );
      setWarningMessage(warnings.join(" "));
      setExecutionHistory((current) => [
        {
          id: `${Date.now()}`,
          transaction: activeTransaction || commandInput.trim().toUpperCase(),
          tableName: tableDefinition.name,
          filtersLabel: summarizeFilters(filters),
          rowCount: limited.length,
        },
        ...current,
      ].slice(0, 6));
    }, LOAD_DELAY_MS);
  }

  const activeFilters = useMemo(() => buildFilterRecord(pendingTableDefinition, filters), [filters, pendingTableDefinition]);

  return (
    <div className="app-shell">
      <HeaderBar browserActive={browserActive} />

      <main className="layout">
        <div className="main-column">
          <CommandBar
            command={commandInput}
            onCommandChange={setCommandInput}
            onSubmit={handleTransactionSubmit}
          />

          <FilterForm
            browserActive={browserActive}
            tableName={tableNameInput}
            onTableNameChange={setTableNameInput}
            filterFields={pendingTableDefinition?.filterFields ?? []}
            filters={activeFilters}
            onFilterChange={handleFilterChange}
            onExecute={handleExecute}
            onClear={handleClearFilters}
            availableTables={tableNames}
          />

          <QueryOptions
            filterMode={filterMode}
            onFilterModeChange={setFilterMode}
            caseSensitive={caseSensitive}
            onCaseSensitiveChange={setCaseSensitive}
            maxRows={maxRows}
            onMaxRowsChange={setMaxRows}
            variantId={activeVariant.id}
            variants={availableVariants}
            onVariantChange={handleVariantChange}
          />

          <StatusBar
            loading={loading}
            message={statusMessage}
            isEmpty={hasExecuted && !loading && results.length === 0}
            warningMessage={warningMessage}
          />

          {activeTable && !loading && results.length > 0 ? (
            <>
              <ResultsGrid
                tableName={activeTable.name}
                tableDescription={activeTable.description}
                columns={activeTable.columns}
                rows={results}
                matchedCount={matchedCount}
                selectedRowIndex={selectedRowIndex}
                onSelectRow={setSelectedRowIndex}
                sortColumn={sortColumn || activeTable.columns[0]}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
                isTruncated={isTruncated}
              />
              <SelectionDetails tableName={activeTable.name} selectedRow={selectedRow} />
            </>
          ) : (
            <section className="panel placeholder-panel">
              <div className="section-title">Results</div>
              <div className="placeholder-copy">
                {loading ? "Waiting for table data..." : "Execute a table search to display results."}
              </div>
            </section>
          )}
        </div>

        <HelperPanel
          transaction={activeTransaction}
          currentTable={activeTable?.name ?? pendingTableDefinition?.name ?? ""}
          activeFilters={activeFilters}
          activeVariantLabel={activeVariant.label}
          filterMode={filterMode}
          caseSensitive={caseSensitive}
          maxRows={maxRows}
          executionHistory={executionHistory}
        />
      </main>
      <footer className="system-bar">
        <span>SAP ERP Mock | QAS 100 | EN</span>
        <span>{new Date().toLocaleTimeString("de-DE")}</span>
      </footer>
    </div>
  );
}
