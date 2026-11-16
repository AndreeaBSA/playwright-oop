import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor } from "../../utils/test-data.js";

const expectedRows = [
  { MAIL_ID: "MAIL-0905", PARENT_ID: automationAnchor.expectedValues.frGuid, COUNT: "2", OWNER: "INT_MONITOR", STATUS: "Ready" },
  { MAIL_ID: "MAIL-ANCHOR-777-A", PARENT_ID: automationAnchor.expectedValues.frGuid, COUNT: "3", OWNER: "MARTA", STATUS: "Ready" },
  { MAIL_ID: "MAIL-ANCHOR-777-B", PARENT_ID: automationAnchor.expectedValues.frGuid, COUNT: "0", OWNER: "OPS_BATCH", STATUS: "Queued" },
];

test("MAILCOUNT - toate mailurile ancorei A555", async ({ mailCountPage }) => {
  await openBrowserTransaction(mailCountPage);
  await mailCountPage.executeTable(mailCountPage.tableName, { PARENT_ID: automationAnchor.expectedValues.frGuid });

  await expect.poll(() => mailCountPage.getRowCount()).toBe(3);
  for (let i = 0; i < expectedRows.length; i++) {
    await expect(mailCountPage.tableCell(i, "MAIL_ID")).toHaveText(expectedRows[i].MAIL_ID);
    await expect(mailCountPage.tableCell(i, "PARENT_ID")).toHaveText(expectedRows[i].PARENT_ID);
    await expect(mailCountPage.tableCell(i, "COUNT")).toHaveText(expectedRows[i].COUNT);
    await expect(mailCountPage.tableCell(i, "OWNER")).toHaveText(expectedRows[i].OWNER);
    await expect(mailCountPage.tableCell(i, "STATUS")).toHaveText(expectedRows[i].STATUS);
  }
});
