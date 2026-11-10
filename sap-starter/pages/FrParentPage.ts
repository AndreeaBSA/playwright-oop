import type { Locator, Page } from "@playwright/test";
import { TablePage  } from "./TablePage.js";
import { tables } from "../utils/test-data.js";

export class FrParentPage extends TablePage {
  readonly tableName = tables.frParent; 
  readonly filterESID: Locator;
  readonly filterFRGUID: Locator;
  readonly filterSTATUS: Locator;
  

  constructor(page: Page) {
    super (page);
    this.filterESID = this.filterInput("ESID");
    this.filterFRGUID = this.filterInput("FR_GUID");
    this.filterSTATUS = this.filterInput("STATUS");
    
  }
  
}
