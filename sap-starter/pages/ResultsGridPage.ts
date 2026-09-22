import type { Page } from "@playwright/test";

export class ResultsGridPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
