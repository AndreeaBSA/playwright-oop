import type { Page, Locator } from "@playwright/test";
import { TablePage } from "./TablePage.js";
import { tables } from "../utils/test-data.js";

export class EntitlementPage extends TablePage{
  readonly tableName = tables.entitlement;
  readonly columns = ["ENT_GUID", "ENT_TYPE", "ACTIVE", "CREATED_AT"];
  readonly filterEntitlementGuid: Locator;
  readonly filterEntitlementType: Locator;
  readonly filterActive: Locator;
  
  constructor(page: Page) {
    super(page);
    this.filterEntitlementGuid = this.filterInput("ENT_GUID");
    this.filterEntitlementType = this.filterInput("ENT_TYPE");
    this.filterActive = this.filterInput("ACTIVE");
  }
}

