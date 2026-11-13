import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor, emptyGuid } from "../../utils/test-data.js";

const cases = [
  {
    title: "nota ONCALL a ancorei B777",
    filters: {
      REFERENCE_ID: automationAnchor.expectedValues.entGuid,
      OWNER: "ONCALL",
      PRIORITY: "Critical",
    },
    expected: {
      CASE_ID: "CASE-ANCHOR-777",
      REFERENCE_ID: automationAnchor.expectedValues.entGuid,
      NOTE_TYPE: "Technical",
      OWNER: "ONCALL",
      PRIORITY: "Critical",
    },
  },
  {
    title: "nota High pe GUID-ul gol",
    filters: {
      REFERENCE_ID: emptyGuid,
      OWNER: "ANA",
      PRIORITY: "High",
    },
    expected: {
      CASE_ID: "CASE-ANCHOR-779",
      REFERENCE_ID: emptyGuid,
      NOTE_TYPE: "Operations",
      OWNER: "ANA",
      PRIORITY: "High",
    },
  },
];

for (const c of cases) {
  test(`CASE_NOTES - ${c.title}`, async ({ caseNotesPage }) => {
    await openBrowserTransaction(caseNotesPage);
    await caseNotesPage.executeTable(caseNotesPage.tableName, c.filters);

    await expect.poll(() => caseNotesPage.getRowCount()).toBe(1);
    await expect(caseNotesPage.tableCell(0, "CASE_ID")).toHaveText(c.expected.CASE_ID);
    await expect(caseNotesPage.tableCell(0, "REFERENCE_ID")).toHaveText(c.expected.REFERENCE_ID);
    await expect(caseNotesPage.tableCell(0, "NOTE_TYPE")).toHaveText(c.expected.NOTE_TYPE);
    await expect(caseNotesPage.tableCell(0, "OWNER")).toHaveText(c.expected.OWNER);
    await expect(caseNotesPage.tableCell(0, "PRIORITY")).toHaveText(c.expected.PRIORITY);
  });
}
