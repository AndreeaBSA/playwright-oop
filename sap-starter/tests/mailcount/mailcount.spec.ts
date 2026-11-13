import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { automationAnchor, secondaryAnchor } from "../../utils/test-data.js";

const cases = [
  {
    title: "A555 pentru MARTA",
    filters: {
      PARENT_ID: automationAnchor.expectedValues.frGuid,
      OWNER: "MARTA",
    },
    expected: {
      MAIL_ID: "MAIL-ANCHOR-777-A",
      PARENT_ID: automationAnchor.expectedValues.frGuid,
      COUNT: "3",
      OWNER: "MARTA",
      STATUS: "Ready",
    },
  },
  {
    title: "A555 pentru OPS_BATCH",
    filters: {
      PARENT_ID: automationAnchor.expectedValues.frGuid,
      OWNER: "OPS_BATCH",
    },
    expected: {
      MAIL_ID: "MAIL-ANCHOR-777-B",
      PARENT_ID: automationAnchor.expectedValues.frGuid,
      COUNT: "0",
      OWNER: "OPS_BATCH",
      STATUS: "Queued",
    },
  },
  {
    title: "A556 pentru MARTIN",
    filters: {
      PARENT_ID: secondaryAnchor.expectedValues.frGuid,
      OWNER: "MARTIN",
    },
    expected: {
      MAIL_ID: "MAIL-ANCHOR-778-A",
      PARENT_ID: secondaryAnchor.expectedValues.frGuid,
      COUNT: "5",
      OWNER: "MARTIN",
      STATUS: "Sent",
    },
  },
];

for (const c of cases) {
  test(`MAILCOUNT - ${c.title}`, async ({ mailCountPage }) => {
    await openBrowserTransaction(mailCountPage);
    await mailCountPage.executeTable(mailCountPage.tableName, c.filters);

    await expect.poll(() => mailCountPage.getRowCount()).toBe(1);
    await expect(mailCountPage.tableCell(0, "MAIL_ID")).toHaveText(c.expected.MAIL_ID);
    await expect(mailCountPage.tableCell(0, "PARENT_ID")).toHaveText(c.expected.PARENT_ID);
    await expect(mailCountPage.tableCell(0, "COUNT")).toHaveText(c.expected.COUNT);
    await expect(mailCountPage.tableCell(0, "OWNER")).toHaveText(c.expected.OWNER);
    await expect(mailCountPage.tableCell(0, "STATUS")).toHaveText(c.expected.STATUS);
  });
}
