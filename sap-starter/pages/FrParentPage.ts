import type { Locator, Page } from "@playwright/test";

export class FrParentPage {
  readonly page: Page;
  readonly filterESID: Locator;
  readonly filterFRGUID: Locator;
  readonly filterSTATUS: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.filterESID = this.filterInput("ESID");
    this.filterFRGUID = this.filterInput("FR_GUID");
    this.filterSTATUS = this.filterInput("STATUS");
    
  }

  filterInput(key: string): Locator {
    return this.page.getByPlaceholder(new RegExp(`Filter by\\s+${key}$`, "i"));
  }

  tableCell(rowIndex: number, columnName: string): Locator {
    return this.page
      .locator(`tbody tr[data-row-index="${rowIndex}"]`)
      .locator(`[data-column-name="${columnName}"]`);
  }

  async getRowCount(): Promise<number> {
    return this.page.locator("tbody tr[data-row-index]").count();
  }

  async columnName(column: string[]){
    return this.page.locator(`[data-column-name="${column}"]`)
  }
}
