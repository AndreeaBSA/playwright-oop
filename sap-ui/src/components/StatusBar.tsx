type StatusBarProps = {
  loading: boolean;
  message: string;
  isEmpty: boolean;
  warningMessage: string;
};

export function StatusBar({ loading, message, isEmpty, warningMessage }: StatusBarProps) {
  return (
    <section className="panel status-panel" data-testid="status-message-area">
      <div className="section-title">Status</div>
      {loading ? (
        <div className="status-loading" data-testid="loading-indicator">
          Loading table data...
        </div>
      ) : isEmpty ? (
        <div className="status-empty" data-testid="empty-state">
          No data found
        </div>
      ) : (
        <>
          <div className="status-message">{message}</div>
          {warningMessage ? (
            <div className="status-warning" data-testid="status-warning">
              {warningMessage}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
