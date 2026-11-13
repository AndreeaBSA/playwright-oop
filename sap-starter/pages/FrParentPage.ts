import type { Locator, Page } from "@playwright/test";
import { TablePage  } from "./TablePage.js";
import { tables } from "../utils/test-data.js";
import type { FrParentRow } from "../models/FrParentRow.js"

export class FrParentPage extends TablePage {
  readonly tableName = tables.frParent; 
  readonly columns = ["ESID", "FR_GUID", "ENT_GUID", "STATUS", "DESCRIPTION"];
  readonly filterESID: Locator;
  readonly filterFRGUID: Locator;
  readonly filterSTATUS: Locator;
  

  constructor(page: Page) {
    super (page);
    this.filterESID = this.filterInput("ESID");
    this.filterFRGUID = this.filterInput("FR_GUID");
    this.filterSTATUS = this.filterInput("STATUS");
  }
  
  //pages/FrParentPage.ts
  async readRow(rowIndex: number): Promise<FrParentRow>
for (const [column, value] of Object.entries(testCase.expected)) {
  
  await this.getCellText(rowIndex, "<COLOANA>");
}
