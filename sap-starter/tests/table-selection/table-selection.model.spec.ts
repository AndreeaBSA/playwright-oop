import { test, expect } from "../../fixtures/test-fixtures.js";
import type { SapTableBrowserPage } from "../../pages/SapTableBrowserPage.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { tables } from "../../utils/test-data.js";

type TableCase = {
    title: string;
    table: string;
    filters: string[];
    expected: {
        rowCount: string;
        filtersVisible: string[];
        filtersMissing: string[];
        columns: string[];
    };
};

const tableCases: TableCase[] = [
    {
        title: "FR_PARENT",
        table: tables.frParent,
        filters: ["ESID", "FR_GUID", "STATUS"],
        expected: {
            rowCount: "34 rows",
            filtersVisible: ["ESID"],
            filtersMissing: ["OWNER", "REGION"],
            columns: ["ESID", "FR_GUID", "ENT_GUID", "STATUS", "DESCRIPTION"],
        },
    },
    {
        title: "MAILCOUNT",
        table: tables.mailCount,
        filters: ["PARENT_ID", "OWNER", "STATUS"],
        expected: {
            rowCount: "47 rows",
            filtersVisible: ["OWNER"],
            filtersMissing: ["ESID"],
            columns: ["MAIL_ID", "PARENT_ID", "COUNT", "OWNER", "STATUS"],
        },
    },
    {
        title: "ITM_DETAILS",
        table: tables.itmDetails,
        filters: ["PARENT_ID", "CALLOFF", "REGION"],
        expected: {
            rowCount: "50 rows",
            filtersVisible: ["PARENT_ID", "REGION"],
            filtersMissing: ["ESID", "OWNER"],
            columns: ["PARENT_ID", "CALLOFF", "SETUP_FR", "NWR_ITEM_ID", "REGION", "COMMENTS"],
        },
    },
    {
        title: "ENTITLEMENT",
        table: tables.entitlement,
        filters: ["ENT_GUID", "ENT_TYPE", "ACTIVE"],
        expected: {
            rowCount: "34 rows",
            filtersVisible: ["ENT_GUID", "ENT_TYPE", "ACTIVE"],
            filtersMissing: ["ESID", "OWNER"],
            columns: ["ENT_GUID", "ENT_TYPE", "ACTIVE", "CREATED_AT"],
        },
    },
    {
        title: "FR_AUDIT",
        table: tables.frAudit,
        filters: ["FR_GUID", "EVENT_TYPE", "CHANGED_BY"],
        expected: {
            rowCount: "50 rows",
            filtersVisible: ["FR_GUID", "EVENT_TYPE"],
            filtersMissing: ["ESID", "OWNER"],
            columns: ["AUDIT_ID", "FR_GUID", "EVENT_TYPE", "CHANGED_BY", "CHANGED_AT", "DETAILS"],
        },
    },
    {
        title: "CASE_NOTES",
        table: tables.caseNotes,
        filters: ["REFERENCE_ID", "OWNER", "PRIORITY"],
        expected: {
            rowCount: "36 rows",
            filtersVisible: ["REFERENCE_ID", "OWNER", "PRIORITY"],
            filtersMissing: ["ESID", "REGION"],
            columns: ["CASE_ID", "REFERENCE_ID", "NOTE_TYPE", "OWNER", "PRIORITY", "NOTE_TEXT"],
        },
    },
];

const valoareDeTest = "ESID-777";

async function verificaColoanele(sapPage: SapTableBrowserPage, asteptate: string[]) {
    await expect(sapPage.columnHeaderRow.locator("[data-column-name]")).toHaveCount(asteptate.length);
    for (const coloana of asteptate) {
        await expect(sapPage.columnHeaderRow.locator(`[data-column-name="${coloana}"]`)).toBeVisible();
    }
}

// ********  BEGINNER  **********

test.describe("BEGINNER - Table Selection", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases) {
        test(`1-3) ${c.title} se incarca, iar Clear Filters goleste filtrele`, async ({ sapPage }) => {
            await sapPage.executeTable(c.table);

            await expect(sapPage.resultsTable).toBeVisible();
            await expect(sapPage.currentTableNameResults).toHaveText(c.table);
            await expect(sapPage.resultCount).toHaveText(c.expected.rowCount);

            await sapPage.filterInput(c.filters[0]).fill(valoareDeTest);
            await expect(sapPage.filterInput(c.filters[0])).toHaveValue(valoareDeTest);

            await sapPage.btnClearFilters.click();

            await expect(sapPage.filterInput(c.filters[0])).toHaveValue("");
        });
    }
});

// ********  MIDDLE  **********

test.describe("MIDDLE - Table Selection", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases) {
        test(`5-7, 9-11) ${c.title} expune ${c.expected.filtersVisible} si nu expune ${c.expected.filtersMissing}`, async ({ sapPage }) => {
            await sapPage.selectTable(c.table);

            for (const filtru of c.expected.filtersVisible) {
                await expect(sapPage.filterInput(filtru)).toBeVisible();
                await expect(sapPage.filterInput(filtru)).toHaveValue("");
            }
            for (const filtru of c.expected.filtersMissing) {
                await expect(sapPage.filterInput(filtru)).toHaveCount(0);
            }
        });
    }
});

// ********  EXPERIENCED  **********

test.describe("EXPERIENCED - Table Selection", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases) {
        test(`12-14) ${c.title} afiseaza exact coloanele lui, iar Clear Filters nu schimba tabelul`, async ({ sapPage }) => {
            await sapPage.executeTable(c.table);

            await expect(sapPage.currentTableNameResults).toHaveText(c.table);
            await verificaColoanele(sapPage, c.expected.columns);

            await sapPage.filterInput(c.filters[0]).fill(valoareDeTest);
            await sapPage.btnClearFilters.click();

            await expect(sapPage.tableNameInput).toHaveValue(c.table);
            await expect(sapPage.currentTableNameResults).toHaveText(c.table);
            await verificaColoanele(sapPage, c.expected.columns);
        });
    }
});
