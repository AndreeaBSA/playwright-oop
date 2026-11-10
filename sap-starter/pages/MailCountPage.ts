import type { Page, Locator} from "@playwright/test";
import { TablePage } from "./TablePage.js";
import { tables } from "../utils/test-data.js";

export class MailCountPage extends TablePage {
  readonly tableName = tables.mailCount;
  readonly columns = ["PARENT_ID", "OWNER", "CHANGED_BY"];
  readonly filterPARENTID: Locator;
  readonly filterOWNER: Locator;
  readonly filterSTATUS: Locator;
  readonly filterESID: Locator;
  readonly filterFRGUID: Locator;

  constructor(page: Page) {
    super(page);
    this.filterPARENTID = this.filterInput("PARENT_ID");
    this.filterOWNER = this.filterInput("OWNER");
    this.filterSTATUS = this.filterInput("STATUS");
    this.filterESID = this.filterInput("ESID");
    this.filterFRGUID = this.filterInput("FR_GUID")
  }

}
