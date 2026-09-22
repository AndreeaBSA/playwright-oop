
import { test, expect } from "../../fixtures/test-fixtures.js";
import { SapTableBrowserPage } from "../../pages/SapTableBrowserPage.js";
import { tables, transactions, filters, columnsFrParent } from "../../utils/test-data.js";
import { openBrowserTransaction } from "../../utils/actions.js";
import { MailCountPage } from "../../pages/MailCountPage.js";

// ********  BEGINNER  **********

async function deschideTranzactia(sapPage: SapTableBrowserPage) {
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.commandInput.press('Enter');
    await expect(sapPage.browserActive).toHaveText('Browser Ready');
}


test.describe('Beginer - Table Selection', () => {
    test('1) Execute via buton', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await sapPage.tableNameInput.fill(tables.frParent);
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).toContainText('34 rows');
    });

    test('2) Enter pe input-ul de tabel', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await sapPage.tableNameInput.fill(tables.entitlement);
        await sapPage.keyboard.press('Enter');

    });

    test('3) Clear filters', async ({ sapPage, mailCountPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await sapPage.tableNameInput.fill(tables.mailCount);
        await mailCountPage.filterOWNER.fill('Marta');
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).toContainText('19');
        await sapPage.btnClearFilters.click();
        await expect(sapPage.statusPanel).toContainText('Filters cleared');
    });

    test('4) Headerele se schimba cu tabelul.', async ({ sapPage, mailCountPage, frAuditPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await sapPage.tableNameInput.fill(tables.mailCount);
        await expect(mailCountPage.filterOWNER).toBeEnabled();
        await expect(mailCountPage.filterPARENTID).toBeEnabled();
        await expect(mailCountPage.filterSTATUS).toBeEnabled();
        await sapPage.tableNameInput.fill(tables.frAudit);
        await sapPage.btnExecute.click();
        await expect(frAuditPage.filterFRGUID).toBeEnabled();
        await expect(frAuditPage.filterCHANGEDBY).toBeEnabled();
        await expect(frAuditPage.filterEVENTTYPE).toBeEnabled();
    });

    test('4A) Negativ test - Headerele se schimba cu tabelul.', async ({ sapPage, mailCountPage, frAuditPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await sapPage.tableNameInput.fill(tables.mailCount);
        await expect(frAuditPage.filterFRGUID).not.toBeVisible();
        await expect(frAuditPage.filterCHANGEDBY).not.toBeVisible();
        await expect(frAuditPage.filterEVENTTYPE).not.toBeVisible();

        await sapPage.tableNameInput.fill(tables.frAudit);
        await expect(mailCountPage.filterOWNER).not.toBeVisible();
        await expect(mailCountPage.filterPARENTID).not.toBeVisible();
        await expect(mailCountPage.filterSTATUS).not.toBeVisible();

        await sapPage.tableNameInput.fill(tables.frAudit);

    });
    test('5) Tabel inexistent - eroare si niciun header', async ({ page, sapPage }) => {
        await deschideTranzactia(sapPage);
        await sapPage.tableNameInput.fill(tables.frParent);
        await sapPage.btnExecute.click();

        await expect(page.locator('th[data-column-name]')).toHaveCount(5);

        await sapPage.tableNameInput.fill('/CFF/NU_EXISTA');
        await sapPage.btnExecute.click();

        await expect(page.getByTestId('empty-state')).toHaveText('No data found');
        await expect(sapPage.resultsTable).toHaveCount(0);
        await expect(page.locator('th[data-column-name]')).toHaveCount(0);
    });



});

//************MIDDLE */

test.describe('MIDDLE - Table Selection', () => {

    test('5) FR_PARENT expune filtrul ESID', async ({ sapPage, frParentPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.frParent)
        await expect(frParentPage.filterESID).toBeVisible();
    });

    test('6) MAILCOUNT schimba filtrele -> OWNER apare, ESID dispare', async ({ sapPage, mailCountPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.mailCount);
        await expect(mailCountPage.filterOWNER).toBeVisible();
        await expect(mailCountPage.filterESID).not.toBeVisible();
    });

    test('7) ITM_DETAILS expune PARENT_ID si REGION', async ({ sapPage, itmDetailsPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await expect(itmDetailsPage.filterPARENTID).toBeVisible();
        await expect(itmDetailsPage.filterREGION).toBeVisible();
    });
 
    test('8) Schimbare tabel reseteaza filtrele', async ({ sapPage, mailCountPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.frParent);
        //await sapPage.btnExecute.click();
        await sapPage.navigateToTable(transactions.se16, tables.mailCount);
        await expect(mailCountPage.filterESID).not.toBeVisible();
        await expect(mailCountPage.filterFRGUID).not.toBeVisible();
        await expect(mailCountPage.filterSTATUS).toBeVisible();

        await expect(mailCountPage.filterPARENTID).toBeEmpty();
        await expect(mailCountPage.filterOWNER).toBeEmpty();
        await expect(mailCountPage.filterSTATUS).toBeEmpty();
    });
});







type TableCase = {
    title: string;
    table: string;
    filters: string[];
    expected:{
        filterVisible:string[];
        filterMissing:string[];
        columns:string[];
    }
}


const tableCases: TableCase[] = [
 { 
    title: "/CFF/FR_PARTENT",
    table: tables.frParent,
    filters: ["ESID", "FR_GUID", "STATUS"],
    expected:{
        filterMissing:["OWNER"],
        filterVisible:["ESID", "FR_GUID", "STATUS"],
        columns:["ESID", "FR_GUID", "ENT_GUID", "STATUS", "DESCRIPTION"],
    }
 },
 { 
    title: "/CFF/MAILCOUNT",
    table: tables.mailCount,
    filters: ["PARENT_ID", "OWNER", "STATUS"],
    expected:{
        filterMissing:["ESID", "FR_GUID"],
        filterVisible:["PARENT_ID", "OWNER", "STATUS"],
        columns:["MAIL_ID", "PARENT_ID", "COUNT", "OWNER", "STATUS"],
    }
 },
 { 
    title: "/CFF/ENTITLEMENT",
    table: tables.entitlement,
    filters: ["ENTITLEMENT_GUID", "ENTITLEMENT_TYPE", "ACTIVE"],
    expected:{
        filterMissing:["ESID", "FR_GUID"],
        filterVisible:["ENTITLEMENT_GUID", "ENTITLEMENT_TYPE", "ACTIVE"],
        columns:["ENT_GUID", "ENT_TYPE", "ACTIVE", "CREATED_AT"],
    }
 }


]



//  Middle Parametrizabil

test.describe('MIDDLE - Table Selection - OPTIM', () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases){
        test(`Tabelul ${c.title} expune filtrul ${c.expected.filterVisible} si nu expune ${c.expected.filterMissing} `, async ({ sapPage }) => {
            await sapPage.selectTable(c.table);
            for (const v of c.expected.filterVisible ){
                await expect(sapPage.filterInput(v)).toBeVisible();
                await expect(sapPage.filterInput(v)).toHaveValue("");
                await expect(sapPage.filterInput(v)).toBeEmpty();
            }
            for(const m of c.expected.filterMissing){
                await expect(sapPage.filterInput(m)).not.toBeVisible();
            }
        });
    }
    });


test.describe('ADVANCED - Table Selection', () => {

    test('9) ENTITLEMENT expune ENT_GUID, ENT_TYPE si ACTIVE', async ({ sapPage, entitlementPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.entitlement)
        await expect(entitlementPage.filterEntitlementGuid).toBeVisible();
        await expect(entitlementPage.filterEntitlementType).toBeVisible();
        await expect(entitlementPage.filterActive).toBeVisible();
    });

    test('10) FR_AUDIT expune FR_GUID si EVENT_TYPE', async ({ sapPage, frAuditPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.frAudit);
        await expect(frAuditPage.filterFRGUID).toBeVisible();
        await expect(frAuditPage.filterEVENTTYPE).toBeVisible();
    });

    test('11) CASE_NOTES expune REFERENCE_ID, OWNER si PRIORITY', async ({ sapPage, caseNotesPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.caseNotes);
        await expect(caseNotesPage.filterREFERENCEID).toBeVisible();
        await expect(caseNotesPage.filterOWNER).toBeVisible();
        await expect(caseNotesPage.filterPRIORITY).toBeVisible();
    });

    test('12) Clear filters nu afecteaza tabelul selectat.', async ({ sapPage, frParentPage, mailCountPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.frParent);
        await frParentPage.filterESID.fill('ESID-100');
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).toContainText(`4 rows`);
        await sapPage.btnClearFilters.click();
        await expect(sapPage.tableNameInput).toHaveValue('/CFF/FR_PARENT');
        await expect(frParentPage.filterFRGUID).toContainText("");
    });

    test('13) FR_PARENT are 5 coloane', async ({ sapPage, frParentPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.frParent);
        await expect(sapPage.getRowCount()).toBe(5);
        // await expect((await frParentPage.columnName(columnsFrParent.ESID)).
        // await expect(frParentPage.tableCell(0, columnsFrParent.FR_GUID)).toContainText('FR_GUID');
        await expect(frParentPage.tableCell(0, columnsFrParent.ENT_GUID)).toContainText('ENT_GUID');
        await expect(frParentPage.tableCell(0, columnsFrParent.STATUS)).toContainText('STATUS');
        await expect(frParentPage.tableCell(0, columnsFrParent.DESCRIPTION)).toContainText('DESCRIPTION');

    });

    test('14) MAILCOUNT are 5 coloane', async ({ sapPage, frParentPage, mailCountPage }) => {
        await sapPage.navigateToTable(transactions.se16, tables.frParent);

    });

    test('15) Execute fara tabel selectat -> eroare.', async ({ sapPage, frParentPage, mailCountPage }) => {

    });

});

//******************* ADVANCED  OPTIM */
test.describe('ADVANCED-  - Table Selection - OPTIM', () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases){
        test(`Tabelul ${c.title} expune coloanele ${c.expected.columns} `, async ({ sapPage }) => {
            
            await sapPage.executeTable(c.table);
            for (let col of c.expected.columns){
                await expect(sapPage.columnHeader(col)).toBeVisible();
            }
        });
    }
    });