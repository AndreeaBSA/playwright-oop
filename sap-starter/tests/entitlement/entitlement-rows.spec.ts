import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";

test("ENTITLEMENT - fiecare rand are ACTIVE = N", async ({ entitlementPage }) => {
  await openBrowserTransaction(entitlementPage);
  await entitlementPage.executeTable(entitlementPage.tableName, { ACTIVE: "N" });

  await expect.poll(() => entitlementPage.getRowCount()).toBe(10);
  const rowCount = await entitlementPage.getRowCount();
  for (let i = 0; i < rowCount; i++) {
    await expect(entitlementPage.tableCell(i, "ACTIVE")).toHaveText("N");
  }
});

test("ENTITLEMENT - fiecare rand are ENT_TYPE = Premium", async ({ entitlementPage }) => {
  await openBrowserTransaction(entitlementPage);
  await entitlementPage.executeTable(entitlementPage.tableName, { ENT_TYPE: "Premium" });

  await expect.poll(() => entitlementPage.getRowCount()).toBe(7);
  const rowCount = await entitlementPage.getRowCount();
  for (let i = 0; i < rowCount; i++) {
    await expect(entitlementPage.tableCell(i, "ENT_TYPE")).toHaveText("Premium");
  }
});
