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
  

  async readRow(rowIndex: number): Promise<FrParentRow>{
    return {
            esid: await this.getCellText(rowIndex, "ESID"),
            frGuid: await this.getCellText(rowIndex, "FR_GUID"),
            entGuid: await this.getCellText(rowIndex, "ENT_GUID"),
            status: await this.getCellText(rowIndex, "STATUS"),
    }
  }
}
