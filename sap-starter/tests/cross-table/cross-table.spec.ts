import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor, secondaryAnchor } from "../../utils/test-data.js";

const anchors = [
  { esid: automationAnchor.esid, mails: 3, notes: 2 },
  { esid: secondaryAnchor.esid, mails: 2, notes: 1 },
];

for (const c of anchors) {
  test(`${c.esid} - mailurile si notele lui se leaga prin GUID-uri`, async ({ frParentPage, mailCountPage, caseNotesPage }) => {
    await openBrowserTransaction(frParentPage);
    await frParentPage.executeTable(frParentPage.tableName, { ESID: c.esid });
    await expect.poll(() => frParentPage.getRowCount()).toBe(1);
    const frGuid = await frParentPage.getCellText(0, "FR_GUID");
    const entGuid = await frParentPage.getCellText(0, "ENT_GUID");

    await openBrowserTransaction(mailCountPage);
    await mailCountPage.executeTable(mailCountPage.tableName, { PARENT_ID: frGuid });
    await expect.poll(() => mailCountPage.getRowCount()).toBe(c.mails);
    for (let i = 0; i < c.mails; i++) {
      await expect(mailCountPage.tableCell(i, "PARENT_ID")).toHaveText(frGuid);
    }

    await openBrowserTransaction(caseNotesPage);
    await caseNotesPage.executeTable(caseNotesPage.tableName, { REFERENCE_ID: entGuid });
    await expect.poll(() => caseNotesPage.getRowCount()).toBe(c.notes);
    for (let i = 0; i < c.notes; i++) {
      await expect(caseNotesPage.tableCell(i, "REFERENCE_ID")).toHaveText(entGuid);
    }
  });
}
