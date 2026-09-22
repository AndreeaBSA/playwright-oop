import { test, expect } from "../../fixtures/test-fixtures.js";
import { openBrowserTransaction } from "../../utils/actions.js";

import { automationAnchor, columnsFrParent, secondaryAnchor, tables, tertiaryAnchor, transactions, emptyGuid, columnsItmDetails } from "../../utils/test-data.js";

// ## BEGINNER

// 1) Parent by ENT_GUID -> randurile principale sunt incarcate.  
//    PRECONDITIE: cunosc ENT_GUID pentru ancora principala (B777).  
//    ACTIUNE: filtrez ITM_DETAILS dupa PARENT_ID = ENT_GUID.  
//    REZULTAT: tabela returneaza 3 randuri.  

// 2) Empty GUID -> no-results.  
//    PRECONDITIE: folosesc EMPTY_GUID drept PARENT_ID.  
//    ACTIUNE: execut interogarea.  
//    REZULTAT: apare empty state.  

// 3) Executie fara filtre -> toate randurile sunt afisate.  
//    PRECONDITIE: tabela este selectata, filtre goale.  
//    ACTIUNE: execut.  
//    REZULTAT: row count reflecta totalul din mock data.  

test.describe('BEGINER - Item Details', () => {
    test('1) Parent by ENT_GUID', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(automationAnchor.expectedValues.entGuid);
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).toBeVisible();
        await expect.poll(()=>itmDetailsPage.getRowCount()).toBe(3);
    });

    test('2) Empty GUID', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(emptyGuid);
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).not.toBeVisible();
        await expect.poll(()=>itmDetailsPage.getRowCount()).toBe(0);
    });

    test('3) Executie fara filtre', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).toBeVisible();
        await expect.poll(()=>itmDetailsPage.getRowCount()).toBe(50);
    });
} );



test.describe('MIDDLE - Item Details', () => {
    test('1) Empty-like CALLOFF row', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(automationAnchor.expectedValues.entGuid);
        await sapPage.btnExecute.click();
        await expect(itmDetailsPage.tableCell(0, columnsItmDetails.CALLOFF)).toHaveText(emptyGuid);
        // REZULTAT: randul este gasit (index >= 0). ??????
    });

    test('2) SETUP_FR contains FR_GUID', async ({ sapPage, itmDetailsPage }) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(automationAnchor.expectedValues.entGuid);
        await sapPage.btnExecute.click();
        await itmDetailsPage.tableCell(2, columnsItmDetails.SETUP_FR).getByText(automationAnchor.expectedValues.frGuid);
    });

    test('3) Secondary entitlement branch > AMER', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(secondaryAnchor.expectedValues.frGuid);
        await sapPage.btnExecute.click();
        await expect(sapPage.resultCount).toBeVisible();
        await expect.poll(()=>itmDetailsPage.getRowCount()).toBe(1);
        await itmDetailsPage.tableCell(4, columnsItmDetails.REGION).getByText('AMER');

    });

    test('4) FR_GUID branch - APJ', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(secondaryAnchor.expectedValues.frGuid);
        await itmDetailsPage.filterREGION.fill('APJ');
        await sapPage.btnExecute.click();
        await itmDetailsPage.tableCell(0, columnsItmDetails.PARENT_ID).getByText(secondaryAnchor.expectedValues.frGuid);
        await itmDetailsPage.tableCell(1, columnsItmDetails.CALLOFF).getByText('secondaryAnchor.expectedValues.frGuid');

    });

    test('5) Diferenta intre ENT_GUID si FR_GUID branches -> AMER vs APJ', async ({ sapPage, itmDetailsPage}) =>{ 
        await sapPage.navigateToTable(transactions.se16, tables.itmDetails);
        await itmDetailsPage.filterPARENTID.fill(secondaryAnchor.expectedValues.entGuid);
        await sapPage.btnExecute.click();
        await itmDetailsPage.tableCell(4, columnsItmDetails.REGION).getByText('AMER');
        await sapPage.btnClearFilters.click();
        await itmDetailsPage.filterPARENTID.fill(secondaryAnchor.expectedValues.frGuid);
        await sapPage.btnExecute.click();
        await itmDetailsPage.tableCell(4, columnsItmDetails.REGION).getByText('APJ');
    });
} );


// ********  BEGINNER  **********

type TableCase = {
    title: string;
    filters: {
        PARENT_ID:string,
        CALLOFF:string,
        REGION:string;
    };
    expected: {
        rowCount: string;
        rows:number
        parentId:string;
        callOff:string;
        region:string;
        setupFr:string;
        frGuid:string;
    }
}

const tableCases: TableCase[] = [
    {
        title: "fara filtre",
        filters:{
            PARENT_ID:"",
            CALLOFF:"",
            REGION:""
        },
        expected:{
            rowCount: "50 rows",
            rows:50,
            parentId:"EN00000000000000000000000000B777",
            callOff:"00000000000000000000000000000000",
            setupFr:"SETUP:FR00000000000000000000000000A555",
            region:"EMEA",
            frGuid: "FR00000000000000000000000000A555"

        }
    },

        {
        title: "ent guid = B777",
        filters:{
            PARENT_ID:"B777",
            CALLOFF:"",
            REGION:""
        },
        expected:{
            rowCount: "3 rows",
            rows:3,
            parentId:"EN00000000000000000000000000B777",
            callOff:"00000000000000000000000000000000",
            setupFr:"SETUP:FR00000000000000000000000000A555",
            region:"EMEA",
            frGuid:"FR00000000000000000000000000A555",
        }
    },

    {
        title: "Secondary entitlement branch",
        filters:{
            PARENT_ID:"B778",
            CALLOFF:"",
            REGION:""
        },
        expected:{
            rowCount: "1 rows",
            rows:1,
            parentId:"EN00000000000000000000000000B778",
            callOff:"CALL-SECONDARY-778",
            setupFr:"SETUP:FR00000000000000000000000000A556",
            region:"AMER",
            frGuid:"FR00000000000000000000000000A556",
        }
    },

        {
        title: "FR_GUID branch -> regiune APJ.",
        filters:{
            PARENT_ID:"A556",
            CALLOFF:"",
            REGION:"APJ"
        },
        expected:{
            rowCount: "1 rows",
            rows:1,
            parentId:"FR00000000000000000000000000A556",
            callOff:"CALL-FR-778",
            setupFr:"SETUP:FR00000000000000000000000000A556",
            region:"APJ",
            frGuid:"FR00000000000000000000000000A556",
        }
    },
 ]


test.describe("BEGINNER - Table Selection", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases) {
        test(`1,2,3 ${c.title} se incarca, Filtrez, Clear Filters`, async ({ sapPage }) => {
            await sapPage.executeTable(tables.itmDetails,c.filters);

            await expect(sapPage.resultCount).toHaveText(c.expected.rowCount);
            expect( await sapPage.getRowCount()).toBe(c.expected.rows);

            await expect(sapPage.cell(0,"PARENT_ID")).toHaveText(c.expected.parentId);
        });
    }
});

test.describe("MIDDLE - Table Selection", () => {
    test.beforeEach(async ({ sapPage }) => {
        await openBrowserTransaction(sapPage);
    });

    for (const c of tableCases) {
        test(`4,7 ${c.title} se incarca, Filtrez, CALL-OFF`, async ({ sapPage }) => {
            await sapPage.executeTable(tables.itmDetails,c.filters);
            await expect(sapPage.cell(0,"CALLOFF")).toHaveText(c.expected.callOff);
            await expect(sapPage.cell(0,"SETUP_FR")).toHaveText(c.expected.setupFr);
            await expect(sapPage.cell(0,"REGION")).toHaveText(c.expected.region);
            await expect(sapPage.cell(0, "SETUP_FR")).toContainText(c.expected.frGuid)
        });
    }
});