import { expect } from "@playwright/test";
import type { SapTableBrowserPage } from "../pages/SapTableBrowserPage.js";
import { transactions } from "./test-data.js";

export async function openBrowserTransaction(sapPage: SapTableBrowserPage, transaction = transactions.se16) {
  await sapPage.goTo();
  await expect(sapPage.commandInput).toBeVisible();
  await sapPage.commandInput.fill(transaction);
  await sapPage.commandInput.press("Enter");
  await expect(sapPage.tableNameInput).toBeEnabled();
}
