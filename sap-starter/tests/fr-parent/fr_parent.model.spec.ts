import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { tables } from "../../utils/test-data.js";

type FrParentCase = {
    title: string;
    filterKey: string;
    filterValue: string;
    expected: {
        rows: number;
        rowCount: string;
        esid: string;
        frGuid: string;
        entGuid: string;
        status: string;
        descriptionLines: number;
    };
};

const frParentCases: FrParentCase[] = [
    {
        title: "fara filtre",
        filterKey: "ESID",
        filterValue: "",
        expected: {
            rows: 34,
            rowCount: "34 rows",
            esid: "ESID-100",
            frGuid: "FR0000000000000000000000001389",
            entGuid: "EN0000000000000000000000001F41",
            status: "Active",
            descriptionLines: 1,
        },
    },
    {
        title: "ancora principala ESID-777",
        filterKey: "ESID",
        filterValue: "ESID-777",
        expected: {
            rows: 1,
            rowCount: "1 rows",
            esid: "ESID-777",
            frGuid: "FR00000000000000000000000000A555",
            entGuid: "EN00000000000000000000000000B777",
            status: "Active",
            descriptionLines: 2,
        },
    },
    {
        title: "ancora secundara ESID-778",
        filterKey: "ESID",
        filterValue: "ESID-778",
        expected: {
            rows: 1,
            rowCount: "1 rows",
            esid: "ESID-778",
            frGuid: "FR00000000000000000000000000A556",
            entGuid: "EN00000000000000000000000000B778",
            status: "Pending",
            descriptionLines: 2,
        },
    },
    {
        title: "ancora tertiara ESID-779",
        filterKey: "ESID",
        filterValue: "ESID-779",
        expected: {
            rows: 1,
            rowCount: "1 rows",
            esid: "ESID-779",
            frGuid: "FR00000000000000000000000000A557",
            entGuid: "00000000000000000000000000000000",
            status: "Blocked",
            descriptionLines: 2,
        },
    },
    {
        title: "ESID comun ESID-100",
        filterKey: "ESID",
        filterValue: "ESID-100",
        expected: {
            rows: 4,
            rowCount: "4 rows",
            esid: "ESID-100",
            frGuid: "FR0000000000000000000000001389",
            entGuid: "EN0000000000000000000000001F41",
            status: "Active",
            descriptionLines: 1,
        },
    },
    {
        title: "STATUS Active",
        filterKey: "STATUS",
        filterValue: "Active",
        expected: {
            rows: 7,
            rowCount: "7 rows",
            esid: "ESID-100",
            frGuid: "FR0000000000000000000000001389",
            entGuid: "EN0000000000000000000000001F41",
            status: "Active",
            descriptionLines: 1,
        },
    },
    {
        title: "STATUS Blocked",
        filterKey: "STATUS",
        filterValue: "Blocked",
        expected: {
            rows: 7,
            rowCount: "7 rows",
            esid: "ESID-100",
            frGuid: "FR000000000000000000000000138B",
            entGuid: "EN0000000000000000000000001F43",
            status: "Blocked",
            descriptionLines: 2,
        },
    },
    {
        title: "STATUS Archived",
        filterKey: "STATUS",
        filterValue: "Archived",
        expected: {
            rows: 6,
            rowCount: "6 rows",
            esid: "ESID-101",
            frGuid: "FR000000000000000000000000138D",
            entGuid: "EN0000000000000000000000001F45",
            status: "Archived",
            descriptionLines: 1,
        },
    },
    {
        title: "STATUS Pending",
        filterKey: "STATUS",
        filterValue: "Pending",
        expected: {
            rows: 8,
            rowCount: "8 rows",
            esid: "ESID-100",
            frGuid: "FR000000000000000000000000138A",
            entGuid: "EN0000000000000000000000001F42",
            status: "Pending",
            descriptionLines: 1,
        },
    },
];

// ********  BEGINNER  **********

test.describe("BEGINNER - FR Parent", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of frParentCases) {
        test(`1-4) ${c.title} prin butonul Execute -> ${c.expected.rowCount}`, async ({ sapPage }) => {
            await sapPage.executeTable(tables.frParent, { [c.filterKey]: c.filterValue });

            await expect(sapPage.resultCount).toHaveText(c.expected.rowCount);
            await expect(sapPage.cell(0, "ESID")).toHaveText(c.expected.esid);
            await expect(sapPage.cell(0, "FR_GUID")).toHaveText(c.expected.frGuid);
            await expect(sapPage.cell(0, "ENT_GUID")).toHaveText(c.expected.entGuid);
        });
    }
});

// ********  MIDDLE  **********

test.describe("MIDDLE - FR Parent", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of frParentCases) {
        test(`5-9) ${c.title} trimis cu Enter da acelasi rezultat`, async ({ sapPage }) => {
            await sapPage.selectTable(tables.frParent);
            await sapPage.submitFilterWithEnter(c.filterKey, c.filterValue);

            await expect(sapPage.resultCount).toHaveText(c.expected.rowCount);
            expect(await sapPage.getRowCount()).toBe(c.expected.rows);

            const frGuid = await sapPage.getCellText(0, "FR_GUID");
            const entGuid = await sapPage.getCellText(0, "ENT_GUID");
            expect(frGuid).toBe(c.expected.frGuid);
            expect(entGuid).toBe(c.expected.entGuid);
            expect(frGuid).not.toBe(entGuid);
        });
    }
});

// ********  EXPERIENCED  **********

test.describe("EXPERIENCED - FR Parent", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of frParentCases) {
        test(`10-17) ${c.title} -> STATUS ${c.expected.status} si DESCRIPTION pe ${c.expected.descriptionLines} linii`, async ({ sapPage }) => {
            await sapPage.executeTable(tables.frParent, { [c.filterKey]: c.filterValue });

            await expect(sapPage.cell(0, "STATUS")).toHaveText(c.expected.status);
            await expect(sapPage.cell(0, "ENT_GUID")).toHaveText(c.expected.entGuid);

            const linii = await sapPage.getCellLines(0, "DESCRIPTION");
            expect(linii).toHaveLength(c.expected.descriptionLines);
            expect(linii[0].length).toBeGreaterThan(0);
        });
    }
});
