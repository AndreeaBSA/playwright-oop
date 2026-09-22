import type { Page, Locator} from "@playwright/test";

export class MailCountPage {
  readonly page: Page;
  readonly filterPARENTID: Locator;
  readonly filterOWNER: Locator;
  readonly filterSTATUS: Locator;
  readonly filterESID: Locator;
  readonly filterFRGUID: Locator;


  constructor(page: Page) {
    this.page = page;
    this.filterPARENTID = this.filterInput("PARENT_ID");
    this.filterOWNER = this.filterInput("OWNER");
    this.filterSTATUS = this.filterInput("STATUS");
    this.filterESID = this.filterInput("ESID");
    this.filterFRGUID = this.filterInput("FR_GUID")
  }

  filterInput(key: string): Locator {
    return this.page.getByPlaceholder(new RegExp(`Filter by\\s+${key}$`, "i"));
  }


}
