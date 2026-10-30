import type { Page, Locator } from "@playwright/test";
import { TablePage } from "./TablePage.js";

export class CaseNotesPage extends TablePage {
    readonly filterREFERENCEID: Locator;
    readonly filterOWNER: Locator;
    readonly filterPRIORITY: Locator;

  constructor(page: Page) {
    super (page);
    this.filterREFERENCEID = this.filterInput("REFERENCE_ID");
    this.filterOWNER = this.filterInput("OWNER");
    this.filterPRIORITY = this.filterInput("PRIORITY");
  }
}