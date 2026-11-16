import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor } from "../../utils/test-data.js";

test("FR_AUDIT - eroarea ancorei A555 printre toate erorile", async ({ frAuditPage }) => {
  await openBrowserTransaction(frAuditPage);
  await frAuditPage.executeTable(frAuditPage.tableName, { EVENT_TYPE: "ERROR" });

  await expect.poll(() => frAuditPage.getRowCount()).toBe(7);
  const rowIndex = await frAuditPage.findFirstRowIndexByColumnValue("AUDIT_ID", "AUD-4011");
  expect(rowIndex).toBeGreaterThanOrEqual(0);
  await expect(frAuditPage.tableCell(rowIndex, "AUDIT_ID")).toHaveText("AUD-4011");
  await expect(frAuditPage.tableCell(rowIndex, "FR_GUID")).toHaveText(automationAnchor.expectedValues.frGuid);
  await expect(frAuditPage.tableCell(rowIndex, "EVENT_TYPE")).toHaveText("ERROR");
  await expect(frAuditPage.tableCell(rowIndex, "CHANGED_BY")).toHaveText("SUPPORT_B");
  await expect(frAuditPage.tableCell(rowIndex, "CHANGED_AT")).toHaveText("2025-06-06 17:10");
});
