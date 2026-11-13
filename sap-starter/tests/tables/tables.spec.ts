import { test, expect } from "../../fixtures/test-fixtures.js";
import { TablePage } from "../../pages/TablePage.js";

test('Fiecare tabel se deschide cu coloanele lui si are date', async ({ itmDetailsPage, entitlementPage, frParentPage, frAuditPage, mailCountPage, caseNotesPage }) => {


    const tablePages: TablePage[] = [itmDetailsPage, entitlementPage, frParentPage, frAuditPage, mailCountPage, caseNotesPage];
    for (const tablePage of tablePages) {
        await tablePage.open();
        const data = await tablePage.currentTableNameResults.innerText();
        await expect(tablePage.currentTableNameResults).toHaveText(tablePage.tableName);
        console.log(data + "  " + tablePage.tableName);
        expect(await tablePage.readColumnNames()).toEqual(tablePage.columns);
        await expect.poll(() => tablePage.getRowCount(), { timeout: 10_000, message: 'tabelul nu s-a populat', }).toBeGreaterThan(0);
    }



});

/*Pentru al 7-lea tabel pornim de la: 
1. Pages: TabelSaptePage.ts
        //import type { Page, Locator } from "@playwright/test";
        import { TablePage } from "./TablePage.js";
        import { tables } from "../utils/test-data.js";

    export class TabelSaptePage extends TablePage {   
        readonly tableName = tables.tabelSapte;   
        readonly columns = [coloane];
        readonly filterSapte: Locator;

    constructor(page: Page) {
        super(page);
        this.filtersapte = this.filterInput("SAPTE");


2. In test-data adaug urmatoarele: 
    export const tables = {
        ......
        tabelSapte: "/CFF/SAPTE",
    };

    export const columnsTabelSapte = {
        COLUMN1: "COLUMN1",
        COLUMN2: "COLUMN2",
    };

    export const filters = {
        FILTER1: "FILTER1",
        FILTER2: "FILTER2",
    };

3. TableSapte.spec.ts  -  care sa contina teste


*/