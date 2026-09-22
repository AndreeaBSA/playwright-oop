import type { Page, Locator } from "@playwright/test";

export class EntitlementPage {
  readonly page: Page;
  readonly filterEntitlementGuid: Locator;
  readonly filterEntitlementType: Locator;
  readonly filterActive: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.filterEntitlementGuid = this.filterInput("ENT_GUID");
    this.filterEntitlementType = this.filterInput("ENT_TYPE");
    this.filterActive = this.filterInput("ACTIVE");
  }

  filterInput(key: string): Locator {
    return this.page.getByPlaceholder(new RegExp(`Filter by\\s+${key}$`, "i"));
  }

}
