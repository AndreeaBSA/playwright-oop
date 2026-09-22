import type { KeyboardEvent } from "react";
import type { FilterDefinition } from "../types";

type FilterFormProps = {
  browserActive: boolean;
  tableName: string;
  onTableNameChange: (value: string) => void;
  filterFields: FilterDefinition[];
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onExecute: () => void;
  onClear: () => void;
  availableTables: string[];
};

export function FilterForm({
  browserActive,
  tableName,
  onTableNameChange,
  filterFields,
  filters,
  onFilterChange,
  onExecute,
  onClear,
  availableTables,
}: FilterFormProps) {
  function handleEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onExecute();
    }
  }

  return (
    <section className="panel" data-testid="table-selection-area">
      <div className="section-title">Table Selection</div>
      <div className="form-grid">
        <label className="field table-name-field">
          <span className="field-label">Table Name</span>
          <input
            list="sap-table-options"
            disabled={!browserActive}
            className="sap-input"
            data-testid="table-name-input"
            value={tableName}
            onChange={(event) => onTableNameChange(event.target.value)}
            onKeyDown={handleEnter}
            placeholder="/CFF/FR_PARENT"
          />
          <datalist id="sap-table-options">
            {availableTables.map((table) => (
              <option key={table} value={table} />
            ))}
          </datalist>
        </label>

        {filterFields.map((field) => (
          <label className="field" key={field.key}>
            <span className="field-label">{field.label}</span>
            <input
              disabled={!browserActive}
              className="sap-input"
              data-testid={`filter-input-${field.key.toLowerCase()}`}
              value={filters[field.key] ?? ""}
              onChange={(event) => onFilterChange(field.key, event.target.value)}
              onKeyDown={handleEnter}
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>

      <div className="action-row">
        <button
          type="button"
          className="sap-button primary"
          data-testid="execute-button"
          onClick={onExecute}
          disabled={!browserActive}
        >
          Execute
        </button>
        <button
          type="button"
          className="sap-button"
          data-testid="clear-filters-button"
          onClick={onClear}
          disabled={!browserActive}
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
}
