import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";

const expectedRows = [
  { AUDIT_ID: "AUD-4034", FR_GUID: "FR00000000000000000000000000A558", EVENT_TYPE: "UPDATE", CHANGED_BY: "SUPPORT_A", CHANGED_AT: "2025-08-18 08:17" },
  { AUDIT_ID: "AUD-4035", FR_GUID: "FR00000000000000000000000000A558", EVENT_TYPE: "VALIDATE", CHANGED_BY: "SUPPORT_B", CHANGED_AT: "2025-08-18 17:34" },
  { AUDIT_ID: "AUD-ANCHOR-780", FR_GUID: "FR00000000000000000000000000A558", EVENT_TYPE: "RESTORE", CHANGED_BY: "OPS_USER", CHANGED_AT: "2025-12-18 21:45" },
];

test("FR_AUDIT - istoricul randului arhivat A558", async ({ frAuditPage }) => {
  await openBrowserTransaction(frAuditPage);
  await frAuditPage.executeTable(frAuditPage.tableName, { FR_GUID: "FR00000000000000000000000000A558" });

  await expect.poll(() => frAuditPage.getRowCount()).toBe(3);
  for (let i = 0; i < expectedRows.length; i++) {
    await expect(frAuditPage.tableCell(i, "AUDIT_ID")).toHaveText(expectedRows[i].AUDIT_ID);
    await expect(frAuditPage.tableCell(i, "FR_GUID")).toHaveText(expectedRows[i].FR_GUID);
    await expect(frAuditPage.tableCell(i, "EVENT_TYPE")).toHaveText(expectedRows[i].EVENT_TYPE);
    await expect(frAuditPage.tableCell(i, "CHANGED_BY")).toHaveText(expectedRows[i].CHANGED_BY);
    await expect(frAuditPage.tableCell(i, "CHANGED_AT")).toHaveText(expectedRows[i].CHANGED_AT);
  }
});
