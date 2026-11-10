import type { Page, Locator } from "@playwright/test";
import { TablePage } from "./TablePage.js";
import { tables } from "../utils/test-data.js";

export class FrAuditPage extends TablePage {
    readonly tableName = tables.frAudit;
    readonly columns = ["FR_GUID", "EVENT_TYPE", "CHANGED_BY"];
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