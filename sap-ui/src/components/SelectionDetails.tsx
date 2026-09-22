import type { GenericRow } from "../types";

type SelectionDetailsProps = {
  tableName: string;
  selectedRow: GenericRow | null;
};

function buildSignals(row: GenericRow | null): string[] {
  if (!row) {
    return [];
  }

  const values = Object.values(row).map((value) => String(value));
  const signals: string[] = [];

  if (values.some((value) => value.includes("00000000000000000000000000000000"))) {
    signals.push("Contains empty-like GUID values.");
  }

  if (values.some((value) => value.includes("\n"))) {
    signals.push("Contains multiline text that requires innerText parsing.");
  }

  if (String(row.STATUS ?? row.ACTIVE ?? "").toLowerCase().includes("blocked")) {
    signals.push("Represents a blocked or inactive business state.");
  }

  if (String(row.PRIORITY ?? "").toLowerCase() === "critical") {
    signals.push("Critical operational note detected.");
  }

  return signals;
}

export function SelectionDetails({ tableName, selectedRow }: SelectionDetailsProps) {
  const signals = buildSignals(selectedRow);

  return (
    <section className="panel" data-testid="selection-details-panel">
      <div className="section-title">Selection Details</div>
      {!selectedRow ? (
        <div className="placeholder-copy" data-testid="selection-details-empty">
          Select a row in {tableName || "the results grid"} to inspect a production-like detail payload.
        </div>
      ) : (
        <div className="selection-details-body">
          <div className="selection-signals" data-testid="selection-signals">
            {signals.length === 0 ? (
              <div className="signal-chip">No special signals</div>
            ) : (
              signals.map((signal) => (
                <div className="signal-chip" key={signal}>
                  {signal}
                </div>
              ))
            )}
          </div>
          <dl className="selection-grid" data-testid="selection-details-grid">
            {Object.entries(selectedRow).map(([key, value]) => (
              <div className="selection-item" key={key} data-testid={`selection-detail-${key.toLowerCase()}`}>
                <dt>{key}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
