import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor, secondaryAnchor } from "../../utils/test-data.js";

const cases = [
  {
    title: "ancora B777",
    filters: {
      ENT_GUID: automationAnchor.expectedValues.entGuid,
    },
    expected: {
      ENT_GUID: automationAnchor.expectedValues.entGuid,
      ENT_TYPE: "Premium",
      ACTIVE: "N",
      CREATED_AT: "2025-06-06 05:35",
    },
  },
  {
    title: "ancora B778",
    filters: {
      ENT_GUID: secondaryAnchor.expectedValues.entGuid,
    },
    expected: {
      ENT_GUID: secondaryAnchor.expectedValues.entGuid,
      ENT_TYPE: "Migration",
      ACTIVE: "Y",
      CREATED_AT: "2025-01-10 00:33",
    },
  },
];

for (const c of cases) {
  test(`ENTITLEMENT - ${c.title}`, async ({ entitlementPage }) => {
    await openBrowserTransaction(entitlementPage);
    await entitlementPage.executeTable(entitlementPage.tableName, c.filters);

    await expect.poll(() => entitlementPage.getRowCount()).toBe(1);
    await expect(entitlementPage.tableCell(0, "ENT_GUID")).toHaveText(c.expected.ENT_GUID);
    await expect(entitlementPage.tableCell(0, "ENT_TYPE")).toHaveText(c.expected.ENT_TYPE);
    await expect(entitlementPage.tableCell(0, "ACTIVE")).toHaveText(c.expected.ACTIVE);
    await expect(entitlementPage.tableCell(0, "CREATED_AT")).toHaveText(c.expected.CREATED_AT);
  });
}
