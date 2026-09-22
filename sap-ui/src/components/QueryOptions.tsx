import type { FilterMode, TableVariant } from "../types";

type QueryOptionsProps = {
  filterMode: FilterMode;
  onFilterModeChange: (value: FilterMode) => void;
  caseSensitive: boolean;
  onCaseSensitiveChange: (value: boolean) => void;
  maxRows: string;
  onMaxRowsChange: (value: string) => void;
  variantId: string;
  variants: TableVariant[];
  onVariantChange: (value: string) => void;
};

export function QueryOptions({
  filterMode,
  onFilterModeChange,
  caseSensitive,
  onCaseSensitiveChange,
  maxRows,
  onMaxRowsChange,
  variantId,
  variants,
  onVariantChange,
}: QueryOptionsProps) {
  return (
    <section className="panel" data-testid="query-options-panel">
      <div className="section-title">Query Options</div>
      <div className="form-grid query-options-grid">
        <label className="field">
          <span className="field-label">Variant</span>
          <select
            className="sap-input sap-select"
            data-testid="variant-select"
            value={variantId}
            onChange={(event) => onVariantChange(event.target.value)}
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.label}
              </option>
            ))}
          </select>
          <span className="field-hint" data-testid="variant-description">
            {variants.find((variant) => variant.id === variantId)?.description ?? "No preset filters."}
          </span>
        </label>

        <label className="field">
          <span className="field-label">Match Mode</span>
          <select
            className="sap-input sap-select"
            data-testid="filter-mode-select"
            value={filterMode}
            onChange={(event) => onFilterModeChange(event.target.value as FilterMode)}
          >
            <option value="contains">Contains</option>
            <option value="exact">Exact</option>
            <option value="startsWith">Starts With</option>
          </select>
        </label>

        <label className="field">
          <span className="field-label">Max Rows</span>
          <select
            className="sap-input sap-select"
            data-testid="max-rows-select"
            value={maxRows}
            onChange={(event) => onMaxRowsChange(event.target.value)}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="ALL">All</option>
          </select>
        </label>

        <div className="field checkbox-field">
          <span className="field-label">Case Sensitive</span>
          <label className="sap-checkbox-row">
            <input
              type="checkbox"
              data-testid="case-sensitive-toggle"
              checked={caseSensitive}
              onChange={(event) => onCaseSensitiveChange(event.target.checked)}
            />
            <span>Use exact casing during search</span>
          </label>
        </div>
      </div>
    </section>
  );
}
