import type { KeyboardEvent } from "react";

type CommandBarProps = {
  command: string;
  onCommandChange: (value: string) => void;
  onSubmit: () => void;
};

export function CommandBar({ command, onCommandChange, onSubmit }: CommandBarProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSubmit();
    }
  }

  return (
    <section className="panel" data-testid="command-bar">
      <div className="section-title">Command</div>
      <div className="command-row">
        <label className="field">
          <span className="field-label">Transaction</span>
          <input
            data-testid="command-input"
            className="sap-input transaction-input"
            value={command}
            onChange={(event) => onCommandChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="SE16 or SE16N"
          />
        </label>
        <button
          type="button"
          className="sap-button primary"
          data-testid="transaction-submit"
          onClick={onSubmit}
        >
          Open
        </button>
      </div>
    </section>
  );
}
