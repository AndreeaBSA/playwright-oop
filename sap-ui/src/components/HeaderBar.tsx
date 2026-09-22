type HeaderBarProps = {
  browserActive: boolean;
};

export function HeaderBar({ browserActive }: HeaderBarProps) {
  return (
    <header className="header-bar" data-testid="header-bar">
      <div>
        <div className="sap-shell-title">SAP Data Browser</div>
        <div className="sap-shell-subtitle">SE16 / SE16N | Client 100 | QAS System</div>
      </div>
      <div className={`shell-pill ${browserActive ? "is-active" : ""}`} data-testid="browser-activation-state">
        {browserActive ? "Browser Ready" : "Awaiting Transaction"}
      </div>
    </header>
  );
}
