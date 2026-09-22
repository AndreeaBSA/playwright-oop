import type { Keyboard, Locator, Page } from "@playwright/test";

export class SapTableBrowserPage {
  readonly page: Page;
  readonly commandInput: Locator;
  readonly btnOpen: Locator;
  readonly tableNameInput: Locator;
  readonly btnExecute: Locator;
  readonly btnClearFilters: Locator;
  readonly currentResults: Locator;
  readonly currentTableNameResults: Locator;
  readonly resultCount: Locator;
  readonly resultsTable: Locator;
  readonly helperTransaction: Locator;
  readonly helperCurrentTable: Locator;
  readonly statusPanel: Locator;
  readonly browserActive: Locator;
  readonly keyboard: Keyboard;
  readonly filtersSelection: Locator;
  readonly columnHeaderRow: Locator;
  readonly columnHeaders:Locator;

  constructor(page: Page) {
    this.page = page;
    this.keyboard = page.keyboard;
    this.resultCount = page.locator(".results-meta > span:not(.result-divider)").nth(1);
    this.resultsTable = page.locator(".results-table");
    this.commandInput = page.getByLabel("Transaction");
    this.btnOpen = this.page.getByRole("button", { name: "Open" });
    this.btnExecute = this.page.getByRole("button", { name: "Execute" });
    this.btnClearFilters = this.page.getByRole("button", { name: "Clear Filters" });
    this.tableNameInput = page.getByLabel("Table Name");
    this.currentResults = this.page.locator(".results-panel .results-meta > span:first-child");
    this.currentTableNameResults = this.page.locator('[data-testid="current-table-name"]');
    this.statusPanel = this.page.locator('[data-testid="status-message-area"]');
    this.browserActive = this.page.locator('[data-testid="browser-activation-state"]');
    this.helperCurrentTable = this.page.locator('[data-testid="helper-current-table"]');
    this.filtersSelection = this.page.locator('[data-testid="table-selection-area"]');
    this.columnHeaderRow = this.page.locator('[data-testid="table-header-row"]')
    this.columnHeaders=this.page.locator('data-column-name');



    this.helperTransaction = this.page
      .locator(".helper-row")
      .filter(({ hasText: 'Transaction' }))
      .locator('span')
      .last();

  }
  async goTo() {
    this.page.goto("/");

  }

  columnHeader(columnName: string) :Locator{
    return this.columnHeaderRow.locator(`[data-column-name="${columnName}"]`);
  }

  filterInput(key: string): Locator {
    return this.page.getByPlaceholder(new RegExp(`Filter by\\s+${key}$`, "i"));
  }

  async selectTable(tableName: string) {
    await this.tableNameInput.fill(tableName);
  }

  async executeTable(tableName: string, filters: Record<string, string> = {}) {
    await this.tableNameInput.fill(tableName);
    for (const [key, value] of Object.entries(filters)) {
      await this.filterInput(key).fill(value);
    }
    await this.btnExecute.click();
    await this.resultsTable.waitFor({ state: "visible" });
  }

  async navigateToTable(transaction: string, table: string, ){
    await this.goTo();
    await this.commandInput.fill(transaction);
    await this.keyboard.press('Enter');
    await this.tableNameInput.fill(table);
    await this.btnExecute.click();
  }

  async submitFilterWithEnter(key: string, value: string) {
    await this.filterInput(key).fill(value);
    await this.filterInput(key).press("Enter");
    await this.resultsTable.waitFor({ state: "visible" });
  }

  row(rowIndex: number): Locator {
    return this.page.locator(`tbody tr[data-row-index="${rowIndex}"]`);
  }

  cell(rowIndex: number, columnName: string): Locator {
    return this.row(rowIndex).locator(`[data-column-name="${columnName}"]`);
  }

  async getCellText(rowIndex: number, columnName: string): Promise<string> {
    return (await this.cell(rowIndex, columnName).innerText()).trim();
  }

  async getCellLines(rowIndex: number, columnName: string): Promise<string[]> {
    const rawText = await this.getCellText(rowIndex, columnName);
    return rawText.split("\n").map((line) => line.trim());
  }

  async getRowCount(): Promise<number> {
    return this.page.locator("tbody tr[data-row-index]").count();
  }

  async findFirstRowIndexByColumnValue(columnName: string, value: string): Promise<number> {
    const count = await this.getRowCount();
    for (let index = 0; index < count; index += 1) {
      const cellText = await this.getCellText(index, columnName);
      if (cellText.includes(value)) {
        return index;
      }
    }
    return -1;
  }








}
