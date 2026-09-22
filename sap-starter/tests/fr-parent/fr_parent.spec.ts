import { test, expect } from "../../fixtures/test-fixtures.js";
import { FrParentPage } from "../../pages/FrParentPage.js";
import { automationAnchor, columnsFrParent, secondaryAnchor, tables, tertiaryAnchor, transactions, emptyGuid } from "../../utils/test-data.js";


// ## BEGINNER

// 1) ESID filter -> extrag FR_GUID si ENT_GUID din randul principal.  
//    PRECONDITIE: SE16 este activ si `/CFF/FR_PARENT` este disponibil.  
//    ACTIUNE: filtrez dupa `ESID-777` si execut.  
//    REZULTAT: obtin exact 1 rand, FR_GUID = `...A555`, ENT_GUID = `...B777`.  

// 2) Multiple results -> un ESID comun returneaza mai multe randuri.  
//    PRECONDITIE: tabelul este disponibil.  
//    ACTIUNE: filtrez dupa un ESID comun (`ESID-100`).  
//    REZULTAT: row count = 4 randuri.  

// 3) Filter submit by Enter -> filtrul dinamic poate executa direct.  
//    PRECONDITIE: tabelul este selectat.  
//    ACTIUNE: completez filtrul ESID si apas Enter.  
//    REZULTAT: interogarea ruleaza fara click pe Execute.  

// 4) FR_GUID lookup -> caut direct dupa FR_GUID.  
//    PRECONDITIE: cunosc FR_GUID-ul ancorei secundare.  
//    ACTIUNE: filtrez dupa FR_GUID.  
//    REZULTAT: randul returnat are ESID-778 si STATUS = Pending.  




test.describe('BEGINER - Table FR_Parent', () => {

  test("ESID filter", async ({ sapPage, frParentPage }) => {
    //Arrange
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.btnOpen.click();
    //act
    await sapPage.tableNameInput.fill(tables.frParent);
    await sapPage.btnExecute.click();

    const expectedfrGuid = 'FR0000000000000000000000001389';
    await frParentPage.filterESID.fill(automationAnchor.esid)
    //expect
    await expect(frParentPage.tableCell(0, columnsFrParent.FR_GUID)).toHaveText(expectedfrGuid);
  })

  test("Multiple Filter", async ({ sapPage, frParentPage }) => {
    //Arrange
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.btnOpen.click();
    //act
    await sapPage.tableNameInput.fill(tables.frParent);
    await sapPage.btnExecute.click();

    await frParentPage.filterESID.fill(`ESID-100`);

    expect(await frParentPage.getRowCount()).toEqual(34);


    //expect(frParentPage.getRowCount());

  });


  test("3) Filter submit by Enter", async ({ sapPage, frParentPage }) => {
    //Arrange
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.btnOpen.click();
    //act
    await sapPage.tableNameInput.fill(tables.frParent);
    await sapPage.btnExecute.click();

    await frParentPage.filterESID.fill(`ESID`);
    await sapPage.tableNameInput.press('Enter');
    const selectedTable1 = tables.frParent;
    await expect(sapPage.currentResults).toHaveText(selectedTable1);
  });


  test("4) FR_GUID lookup", async ({ sapPage, frParentPage }) => {
    //Arrange
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.btnOpen.click();
    //act
    await sapPage.tableNameInput.fill(tables.frParent);
    await frParentPage.filterFRGUID.fill(secondaryAnchor.expectedValues.frGuid);
    await sapPage.btnExecute.click();

    //expect
    //const expectedfrGuid = 'FR00000000000000000000000000A556';
    await expect(frParentPage.tableCell(0, columnsFrParent.ESID)).toHaveText(secondaryAnchor.esid);
    await expect(frParentPage.tableCell(0, columnsFrParent.STATUS)).toHaveText("Pending");
  });

});

test.describe('MIDDLE - Table FR_Parent', () => {
  // ## MIDDLE

  // 5) FR_GUID si ENT_GUID sunt diferite.  
  //    PRECONDITIE: am obtinut randul ESID-777.  
  //    ACTIUNE: compar FR_GUID cu ENT_GUID.  
  //    REZULTAT: cele doua valori sunt diferite (A555 vs B777).  

  // 6) Extragere GUID-uri pentru ancora secundara -> ESID-778.  
  //    PRECONDITIE: tabelul este disponibil.  
  //    ACTIUNE: filtrez dupa ESID-778.  
  //    REZULTAT: FR_GUID = `...A556`, ENT_GUID = `...B778`.  

  // 7) Row count corect -> numarul de `<tr>` corespunde cu result-count.  
  //    PRECONDITIE: am executat cu mai multe randuri.  
  //    ACTIUNE: compar getRowCount() cu textul din result-count.  
  //    REZULTAT: valorile sunt identice.  

  // 8) Blocked row -> randul blocat contine empty-like ENT_GUID.  
  //    PRECONDITIE: exista randuri cu STATUS = Blocked.  
  //    ACTIUNE: filtrez dupa STATUS = Blocked.  
  //    REZULTAT: gasesc ESID-779 cu ENT_GUID = 000...000.  

  // 9) Active rows -> filtrare dupa STATUS = Active.  
  //    PRECONDITIE: tabelul este disponibil.  
  //    ACTIUNE: filtrez dupa STATUS = Active.  
  //    REZULTAT: toate randurile returnate au STATUS = Active.  



  test("5. FR_GUID si ENT_GUID sunt diferite", async ({ sapPage, frParentPage }) => {
    //Arrange
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.btnOpen.click();
    //act
    await sapPage.tableNameInput.fill(tables.frParent);
    await frParentPage.filterFRGUID.fill(automationAnchor.expectedValues.frGuid);
    await sapPage.btnExecute.click();

    //expect
    // versiune Andreea
    await expect(frParentPage.tableCell(0, columnsFrParent.ESID))
      .not.toHaveText(automationAnchor.expectedValues.frGuid);

    // versiune Bogdan = readable
    const frGuid = await sapPage.getCellText(0, columnsFrParent.FR_GUID);
    const entGuid = await sapPage.getCellText(0, columnsFrParent.ENT_GUID);
    expect(frGuid).not.toBe(entGuid);


    await frParentPage.filterFRGUID.fill(automationAnchor.expectedValues.frGuid);
    await sapPage.btnExecute.click();

  });

  test('6. Extragere GUID-uri pentru ancora secundara', async ({ sapPage, frParentPage }) => {
    //Arrange
    await sapPage.goTo();
    await sapPage.commandInput.fill(transactions.se16);
    await sapPage.btnOpen.click();
    //act
    await sapPage.tableNameInput.fill(tables.frParent);
    await frParentPage.filterESID.fill(secondaryAnchor.esid);
    await sapPage.btnExecute.click();
    //expect
    const frGuid = await sapPage.getCellText(0, columnsFrParent.FR_GUID);
    const entGuid = await sapPage.getCellText(0, columnsFrParent.ENT_GUID);
    expect(frGuid).toBe(secondaryAnchor.expectedValues.frGuid);
    expect(entGuid).toBe(secondaryAnchor.expectedValues.entGuid);
  });
});


test('7. Row count correct', async ({ sapPage }) => {
  //Arrange
  await sapPage.goTo();
  await sapPage.commandInput.fill(transactions.se16);
  await sapPage.btnOpen.click();
  //act
  await sapPage.tableNameInput.fill(tables.frParent);
  await sapPage.btnExecute.click();

  //expect
  await expect(sapPage.resultCount).toBeVisible(); // => in debug passed , normal era fail
  const rowCount = await sapPage.getRowCount();
  await expect(sapPage.resultCount).toContainText(`${rowCount} rows`);
});


test('8. Blocked row', async ({ sapPage, frParentPage }) => {
  //Arrange
  await sapPage.goTo();
  await sapPage.commandInput.fill(transactions.se16);
  await sapPage.btnOpen.click();
  //act
  await sapPage.tableNameInput.fill(tables.frParent);
  await frParentPage.filterSTATUS.fill("Blocked");
  //fill(`ESID-779`);
  await sapPage.btnExecute.click();
  //expect
  await expect(sapPage.resultCount).toBeVisible();

  const rowIndex = await sapPage.findFirstRowIndexByColumnValue("ESID", tertiaryAnchor.esid);
  //const emptyGuid = "00000000000000000000000000000000";
  console.log(rowIndex);

  expect(rowIndex).toBeGreaterThanOrEqual(0);
  await expect(sapPage.cell(rowIndex, "ESID")).toHaveText("ESID-779");
  await expect(sapPage.cell(rowIndex, "ENT_GUID")).toHaveText(emptyGuid);

});

test('9. Active rows', async ({ sapPage, frParentPage }) => {
  //Arrange
  await sapPage.goTo();
  await sapPage.commandInput.fill(transactions.se16);
  await sapPage.btnOpen.click();
  //act
  await sapPage.tableNameInput.fill(tables.frParent);
  await frParentPage.filterSTATUS.fill("Active");
  //fill(`ESID-779`);
  await sapPage.btnExecute.click();
  //expect
  await expect(sapPage.resultCount).toBeVisible();

  const rowCount = await sapPage.getRowCount();
  await expect(sapPage.resultCount).toContainText(`${rowCount} rows`);
  
  for (let index = 0; index < rowCount; index +=1){
    await expect(frParentPage.tableCell(0, columnsFrParent.STATUS)).toHaveText("Active");
  }
});


// PARAMETRIZABIL

const rowCountByEsid: { esid: string; count: number }[] = [
  { esid: 'ESID-100', count: 4 },
  { esid: automationAnchor.esid, count: 1 }
]

const statusOnly: string[] = ['Active', 'Blocked'];

type ExpectedCells = Record<string, string>;


const singleRowByEsid: { esid: string; expected: ExpectedCells }[] = [

  {
    esid: automationAnchor.esid,
    expected: {
      FR_GUID: automationAnchor.expectedValues.frGuid,
      ENT_GUID: automationAnchor.expectedValues.entGuid,

    }
  },
  {
    esid: secondaryAnchor.esid,
    expected: {
      FR_GUID: secondaryAnchor.expectedValues.frGuid,
      ENT_GUID: secondaryAnchor.expectedValues.entGuid,

    }
  },
  {
    esid: tertiaryAnchor.esid,
    expected: {
      FR_GUID: tertiaryAnchor.expectedValues.frGuid,
      ENT_GUID: tertiaryAnchor.expectedValues.entGuid,

    }
  }
]


test.describe('Middle-Parametrizabil', () => {


  for (const testCase of singleRowByEsid) {
    test(`single row :${testCase.esid}-> celule asteptate`, async ({ sapPage, frParentPage }) => {
      //Arrange
      await sapPage.goTo();
      await sapPage.commandInput.fill(transactions.se16);
      await sapPage.btnOpen.click();
      //act
      await sapPage.tableNameInput.fill(tables.frParent);
      await frParentPage.filterESID.fill(testCase.esid);
      await sapPage.btnExecute.click();
      // expect
      await expect.poll(() => frParentPage.getRowCount()).toBe(1);
      for (const [column, value] of Object.entries(testCase.expected)) {
        await expect(frParentPage.tableCell(0, column)).toHaveText(value);
      }
    })
  }

  //todo de terminat pe statusOnly rowCountByEsid
  //x=3; x++  x devine 4
  //     x+=7 => x=x+7 x devine 10

  for ( const status of statusOnly) {
    test(`Validation of ${status}`, async ({sapPage, frParentPage}) => {
      //Arrange
      await sapPage.goTo();
      await sapPage.commandInput.fill(transactions.se16);
      await sapPage.btnOpen.click();
      //act
      await sapPage.tableNameInput.fill(tables.frParent);
      await frParentPage.filterSTATUS.fill(status);
      await sapPage.btnExecute.click();

      //assert
      await expect(sapPage.resultCount).toBeVisible();
      const rowCount = await sapPage.getRowCount();
      expect(rowCount).toBeGreaterThan(1);
      for (let index = 0; index < rowCount; index++) {
        console.log(rowCount);
        await expect(frParentPage.tableCell(0, 'STATUS')).toContainText(status);
      }
    })
  }


  for ( const rowNumber of rowCountByEsid) {
    test(` row count ${rowNumber.count}`, async ({sapPage, frParentPage}) => {
      //Arrange
      await sapPage.goTo();
      await sapPage.commandInput.fill(transactions.se16);
      await sapPage.btnOpen.click();
      //act
      await sapPage.tableNameInput.fill(tables.frParent);
      await frParentPage.filterESID.fill(rowNumber.esid);
      await sapPage.btnExecute.click();

      //assert
      await expect(sapPage.resultCount).toBeVisible();
      const rowCount = await sapPage.getRowCount();
      
      await expect.poll(()=>frParentPage.getRowCount()).toBe(rowNumber.count);
    })
  }






})



// Advanced - PARAMETRIZABIL

const singleRowByEsidExperienced:{title:string; filters:ExpectedCells;expected:ExpectedCells}[]=[
{
  title: 'ESID-778->Status Pending', filters:{ESID:secondaryAnchor.esid},expected:{STATUS:'PENDING'}
},
{
 title: 'ESID-780->Status Archived', filters:{ESID:'ESID-780'}, expected:{Status:'Archived'}
},
{
 title: 'FR_GUID lookup -ESID-777', filters:{ESID:automationAnchor.esid}, expected:{ESID:automationAnchor.esid}
},
{
 title: 'ESID-779->Status Blocked', filters:{ESID:tertiaryAnchor.esid},expected:{ENT_GUID: tertiaryAnchor.expectedValues.entGuid, STATUS:'Blocked'}
},


]

const statusOnlyExperienced: string[] = ['Archived', 'Pending', 'Blocked'];