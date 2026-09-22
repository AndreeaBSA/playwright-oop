import { test, expect } from "../../fixtures/test-fixtures.js";
import type { SapTableBrowserPage } from "../../pages/SapTableBrowserPage.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { tables, transactions } from "../../utils/test-data.js";

type NavigationCase = {
    title: string;
    table: string;
    expected: {
        rowCount: string;
        columns: string[];
    };
};

const navigationCases: NavigationCase[] = [
    {
        title: "FR_PARENT",
        table: tables.frParent,
        expected: {
            rowCount: "34 rows",
            columns: ["ESID", "FR_GUID", "ENT_GUID", "STATUS", "DESCRIPTION"],
        },
    },
    {
        title: "ITM_DETAILS",
        table: tables.itmDetails,
        expected: {
            rowCount: "50 rows",
            columns: ["PARENT_ID", "CALLOFF", "SETUP_FR", "NWR_ITEM_ID", "REGION", "COMMENTS"],
        },
    },
    {
        title: "ENTITLEMENT",
        table: tables.entitlement,
        expected: {
            rowCount: "34 rows",
            columns: ["ENT_GUID", "ENT_TYPE", "ACTIVE", "CREATED_AT"],
        },
    },
    {
        title: "MAILCOUNT",
        table: tables.mailCount,
        expected: {
            rowCount: "47 rows",
            columns: ["MAIL_ID", "PARENT_ID", "COUNT", "OWNER", "STATUS"],
        },
    },
    {
        title: "FR_AUDIT",
        table: tables.frAudit,
        expected: {
            rowCount: "50 rows",
            columns: ["AUDIT_ID", "FR_GUID", "EVENT_TYPE", "CHANGED_BY", "CHANGED_AT", "DETAILS"],
        },
    },
    {
        title: "CASE_NOTES",
        table: tables.caseNotes,
        expected: {
            rowCount: "36 rows",
            columns: ["CASE_ID", "REFERENCE_ID", "NOTE_TYPE", "OWNER", "PRIORITY", "NOTE_TEXT"],
        },
    },
];

async function verificaColoanele(sapPage: SapTableBrowserPage, columns: string[]) {
    await expect(sapPage.columnHeaderRow.locator("[data-column-name]")).toHaveCount(columns.length);
    for (const column of columns) {
        await expect(sapPage.columnHeaderRow.locator(`[data-column-name="${column}"]`)).toBeVisible();
    }
}

// ********  BEGINNER  **********

test.describe("BEGINNER - Navigation", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage, transactions.se16);
    });

    for (const c of navigationCases) {
        test(`1-4) SE16 incarca ${c.title} si helper panel arata tranzactia`, async ({ sapPage }) => {
            await sapPage.executeTable(c.table);

            await expect(sapPage.resultsTable).toBeVisible();
            await expect(sapPage.currentTableNameResults).toHaveText(c.table);
            await expect(sapPage.resultCount).toHaveText(c.expected.rowCount);
            await expect(sapPage.helperTransaction).toHaveText(transactions.se16);
        });
    }
});

// ********  MIDDLE  **********

test.describe("MIDDLE - Navigation", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage, transactions.se16n);
    });

    for (const c of navigationCases) {
        test(`5-8) Helper panel urmareste ${c.title} inainte si dupa executie`, async ({ sapPage }) => {
            await expect(sapPage.helperTransaction).toHaveText(transactions.se16n);

            await sapPage.selectTable(c.table);

            await expect(sapPage.helperCurrentTable).toHaveText(c.table);

            await sapPage.btnExecute.click();
            await expect(sapPage.resultsTable).toBeVisible();

            await expect(sapPage.helperCurrentTable).toHaveText(c.table);
            await expect(sapPage.helperTransaction).toHaveText(transactions.se16n);
            await verificaColoanele(sapPage, c.expected.columns);
        });
    }
});

// ********  EXPERIENCED  **********

test.describe("EXPERIENCED - Navigation", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage, transactions.se16);
    });

    for (const c of navigationCases) {
        test(`9-11, 13-14) FR_PARENT -> ${c.title} scris cu litere mici pastreaza tranzactia`, async ({ sapPage }) => {
            await sapPage.executeTable(tables.frParent);
            await verificaColoanele(sapPage, navigationCases[0].expected.columns);

            await sapPage.executeTable(c.table.toLowerCase());

            await expect(sapPage.currentTableNameResults).toHaveText(c.table);
            await expect(sapPage.resultCount).toHaveText(c.expected.rowCount);
            await expect(sapPage.helperTransaction).toHaveText(transactions.se16);
            await verificaColoanele(sapPage, c.expected.columns);
        });
    }
});
