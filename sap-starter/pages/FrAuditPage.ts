import type { Page, Locator } from "@playwright/test";
import { TablePage } from "./TablePage.js";

export class FrAuditPage extends TablePage {
    readonly filterFRGUID: Locator;
    readonly filterEVENTTYPE: Locator;
    readonly filterCHANGEDBY: Locator;

  constructor(page: Page) {
    super (page);
    this.filterFRGUID = this.filterInput("FR_GUID");
    this.filterEVENTTYPE = this.filterInput("EVENT_TYPE");
    this.filterCHANGEDBY = this.filterInput("CHANGED_BY");
  }

}