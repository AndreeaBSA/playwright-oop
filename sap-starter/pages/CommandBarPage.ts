import type { Locator, Page } from "@playwright/test";

export class CommandBarPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  
  }
}
