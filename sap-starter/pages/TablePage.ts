import type { Page, Locator} from "@playwright/test";


export class TablePage{
    readonly page: Page;

constructor(page:Page) {
    this.page = page;
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