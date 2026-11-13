import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor } from "../../utils/test-data.js";

const cases = [
  {
    title: "eroarea ancorei A555",
    filters: {
      FR_GUID: automationAnchor.expectedValues.frGuid,
      EVENT_TYPE: "ERROR",
    },
    expected: {
      AUDIT_ID: "AUD-4011",
      FR_GUID: automationAnchor.expectedValues.frGuid,
      EVENT_TYPE: "ERROR",
      CHANGED_BY: "SUPPORT_B",
      CHANGED_AT: "2025-06-06 17:10",
    },
  },
  {
    title: "restaurarea randului arhivat",
    filters: {
      FR_GUID: "FR00000000000000000000000000A558",
      EVENT_TYPE: "RESTORE",
    },
    expected: {
      AUDIT_ID: "AUD-ANCHOR-780",
      FR_GUID: "FR00000000000000000000000000A558",
      EVENT_TYPE: "RESTORE",
      CHANGED_BY: "OPS_USER",
      CHANGED_AT: "2025-12-18 21:45",
    },
  },
];

for (const c of cases) {
  test(`FR_AUDIT - ${c.title}`, async ({ frAuditPage }) => {
    await openBrowserTransaction(frAuditPage);
    await frAuditPage.executeTable(frAuditPage.tableName, c.filters);

    await expect.poll(() => frAuditPage.getRowCount()).toBe(1);
    await expect(frAuditPage.tableCell(0, "AUDIT_ID")).toHaveText(c.expected.AUDIT_ID);
    await expect(frAuditPage.tableCell(0, "FR_GUID")).toHaveText(c.expected.FR_GUID);
    await expect(frAuditPage.tableCell(0, "EVENT_TYPE")).toHaveText(c.expected.EVENT_TYPE);
    await expect(frAuditPage.tableCell(0, "CHANGED_BY")).toHaveText(c.expected.CHANGED_BY);
    await expect(frAuditPage.tableCell(0, "CHANGED_AT")).toHaveText(c.expected.CHANGED_AT);
  });
}
