import type { Locator, Page } from "@playwright/test";
import { TablePage  } from "./TablePage.js";

export class FrParentPage extends TablePage {
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
