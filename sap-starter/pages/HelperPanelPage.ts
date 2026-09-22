import type { Page } from "@playwright/test";

export class HelperPanelPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
