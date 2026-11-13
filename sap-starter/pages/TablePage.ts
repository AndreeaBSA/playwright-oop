import type { Locator } from "@playwright/test";
import { SapTableBrowserPage } from "./SapTableBrowserPage.js";
import { transactions } from "../utils/test-data.js";

export abstract class TablePage extends SapTableBrowserPage {

  abstract readonly tableName: string;
  abstract readonly columns: string[];

  async open() {
    await this.goTo();
    await this,this.commandInput.fill(transactions.se16);
    await this.btnOpen.click();
    await this.tableNameInput.fill(this.tableName);
    await this.btnExecute.click();
  }

async readColumnNames(): Promise<string[]> {
  return this.columnHeaderRow
    .locator("[data-column-name]")
    .evaluateAll((headers) =>
      headers.map((header) =>
        header.getAttribute("data-column-name") ?? ""));
}
  
  tableCell(rowIndex: number, columnName: string): Locator {
    return this.cell(rowIndex, columnName);
  }

  async columnName(column: string[]) {
    return this.page.locator(`[data-column-name="${column}"]`)
  }

}