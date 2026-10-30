import type { Page, Locator } from "@playwright/test";
import { TablePage } from "./TablePage.js";

export class ItmDetailsPage extends TablePage {
  readonly filterPARENTID: Locator;
  readonly filterREGION: Locator;

  constructor(page: Page) {
    super(page);
    this.filterPARENTID = this.filterInput("PARENT_ID");
    this.filterREGION = this.filterInput("REGION");
  }
}
