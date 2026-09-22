import type { Page, Locator } from "@playwright/test";

export class CaseNotesPage {
  readonly page: Page;
    readonly filterREFERENCEID: Locator;
    readonly filterOWNER: Locator;
    readonly filterPRIORITY: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterREFERENCEID = this.filterInput("REFERENCE_ID");
    this.filterOWNER = this.filterInput("OWNER");
    this.filterPRIORITY = this.filterInput("PRIORITY");
  }

filterInput(key: string): Locator {
    return this.page.getByPlaceholder(new RegExp(`Filter by\\s+${key}$`, "i"));
}

}