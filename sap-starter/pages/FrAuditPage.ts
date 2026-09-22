import type { Page, Locator } from "@playwright/test";

export class FrAuditPage {
  readonly page: Page;
    readonly filterFRGUID: Locator;
    readonly filterEVENTTYPE: Locator;
    readonly filterCHANGEDBY: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterFRGUID = this.filterInput("FR_GUID");
    this.filterEVENTTYPE = this.filterInput("EVENT_TYPE");
    this.filterCHANGEDBY = this.filterInput("CHANGED_BY");
  }

filterInput(key: string): Locator {
    return this.page.getByPlaceholder(new RegExp(`Filter by\\s+${key}$`, "i"));
}

}