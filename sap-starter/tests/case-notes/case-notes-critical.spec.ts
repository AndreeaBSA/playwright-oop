import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";

test("CASE_NOTES - notele Critical sunt Technical si ale lui ONCALL", async ({ caseNotesPage }) => {
  await openBrowserTransaction(caseNotesPage);
  await caseNotesPage.executeTable(caseNotesPage.tableName, { PRIORITY: "Critical" });

  await expect.poll(() => caseNotesPage.getRowCount()).toBe(9);
  const rowCount = await caseNotesPage.getRowCount();
  for (let i = 0; i < rowCount; i++) {
    await expect(caseNotesPage.tableCell(i, "NOTE_TYPE")).toHaveText("Technical");
    await expect(caseNotesPage.tableCell(i, "OWNER")).toHaveText("ONCALL");
    await expect(caseNotesPage.tableCell(i, "PRIORITY")).toHaveText("Critical");
  }
});
