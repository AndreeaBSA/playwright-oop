import { test, expect } from "../../fixtures/test-fixtures.js";
import { transactions } from "../../utils/test-data.js";


// ********  BEGINNER  **********

// 1) Open via Enter -> tranzactia activeaza browser-ul.  
//    PRECONDITIE: aplicatia este deschisa, browser-ul este inactiv.  
//    ACTIUNE: completez `SE16` si apas Enter.  
//    REZULTAT: starea browser-ului devine `Browser Ready`.  

// 2) Open via buton -> click pe `Open` activeaza tranzactia.  
//    PRECONDITIE: aplicatia este deschisa.  
//    ACTIUNE: completez `SE16N` si apas butonul `Open`.  
//    REZULTAT: tranzactia se activeaza, starea devine `Browser Ready`.  

// 3) Tranzactie invalida -> executia ramane blocata.  
//    PRECONDITIE: aplicatia este deschisa.  
//    ACTIUNE: introduc `MM03`.  
//    REZULTAT: browser-ul NU se activeaza, starea ramane `Awaiting Transaction`.  

// 4) Controale activate -> input-ul de tabel devine activ dupa open.  
//    PRECONDITIE: tranzactia este deschisa.  
//    ACTIUNE: inspectez controalele din zona de selectie.  
//    REZULTAT: input-ul `Table Name` si butonul `Execute` sunt enabled.  


test.describe('Beginer - Command Bar', () => {
    test('1) Open via Enter', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText("Browser Ready");
    })

    test('2) Open via buton', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16n);
        await sapPage.btnOpen.click();
        await expect(sapPage.browserActive).toContainText("Browser Ready");
    })

    test('3) Tranzactie invalida - neexecutata', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.mm03);
        await expect(sapPage.browserActive).toContainText('Awaiting Transaction');
        await sapPage.btnOpen.click();
        await expect(sapPage.statusPanel).toContainText(/Transaction MM03 not supported\./); // Option A
        await expect(sapPage.statusPanel).toContainText('MM03 not supported.'); // Option B
    });

    test('4) Controale activate', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.btnOpen.click();
        await expect(sapPage.btnExecute).toBeEnabled();
        await expect(sapPage.tableNameInput).toBeEditable();
    });
});


// **********  MIDDLE  ************


// 5) Lowercase input -> codul este acceptat case-insensitive.  
//    PRECONDITIE: aplicatia este deschisa.  
//    ACTIUNE: introduc `se16` (lowercase).  
//    REZULTAT: browser-ul se activeaza.  

// 6) Mixed case input -> codul `Se16n` functioneaza.  
//    PRECONDITIE: aplicatia este deschisa.  
//    ACTIUNE: introduc `Se16n`.  
//    REZULTAT: browser-ul se activeaza.  

// 7) Recovery dupa invalid -> un cod valid recupereaza starea.  
//    PRECONDITIE: am introdus o tranzactie invalida (`MM03`).  
//    ACTIUNE: ulterior introduc `SE16`.  
//    REZULTAT: browser-ul devine ready.  

// 8) Controale dezactivate inainte de open -> input-urile sunt disabled.  
//    PRECONDITIE: aplicatia este deschisa, nicio tranzactie activa.  
//    ACTIUNE: inspectez controalele.  
//    REZULTAT: `Table Name`, `Execute`, `Clear Filters` sunt disabled.  

test.describe('Middle - Command Bar', () => {
    test('5) Lowercase input', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill('se16');
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });

    test('6) Mixed case input', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill('Se16N');
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });

    test('7) Recovery dupa invalid', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.mm03);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText('Awaiting Transaction');
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });

    test('8) Controale dezactivate inainte de open', async ({ sapPage }) => {
        await sapPage.goTo();
        await expect(sapPage.tableNameInput).not.toBeEditable();
        await expect(sapPage.btnExecute).toBeDisabled();
        await expect(sapPage.btnClearFilters).toBeDisabled();
    });
});


//**********  EXPERIENCED  ************

// 9) Tranzactie goala -> browser-ul ramane inactiv.  
//    PRECONDITIE: aplicatia este deschisa.  
//    ACTIUNE: las campul gol si apas Enter.  
//    REZULTAT: browser-ul ramane inactiv.  

// 10) Cod nesuportat lung -> `ZZCUSTOM_TX` nu activeaza.  
//     PRECONDITIE: aplicatia este deschisa.  
//     ACTIUNE: introduc `ZZCUSTOM_TX`.  
//     REZULTAT: browser-ul ramane inactiv.  

// 11) Schimbare tranzactie -> de la SE16 la SE16N.  
//     PRECONDITIE: browser-ul este activ cu SE16.  
//     ACTIUNE: introduc `SE16N` si apas Enter.  
//     REZULTAT: tranzactia se schimba, browser-ul ramane activ.  

// 12) Dublu open -> a doua activare nu strica starea.  
//     PRECONDITIE: browser-ul este deja activ cu SE16.  
//     ACTIUNE: apas Enter din nou pe SE16.  
//     REZULTAT: browser-ul ramane activ, nicio eroare.  

// 13) Input field pastreaza valoarea -> campul nu se sterge dupa submit.  
//     PRECONDITIE: am introdus SE16 si apasat Enter.  
//     ACTIUNE: inspectez valoarea campului.  
//     REZULTAT: campul contine inca `SE16`.  

// 14) Butonul Open este vizibil si accesibil.  
//     PRECONDITIE: aplicatia este deschisa.  
//     ACTIUNE: inspectez butonul `Open`.  
//     REZULTAT: butonul este vizibil, enabled si are textul `Open`.  

// 15) Tranzactie cu spatii -> codul ` SE16 ` cu spatii functioneaza.  
//     PRECONDITIE: aplicatia este deschisa.  
//     ACTIUNE: introduc ` SE16 ` (cu spatii).  
//     REZULTAT: browser-ul se activeaza (trim automat).



test.describe('EXPERIENCED- Command Bar', () => {
    test('9) Tranzactie goala', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill('');
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText('Awaiting Transaction');
    });

    test('10) Cod nesuportat lung', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(`ZZCUSTOM_TX`);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.browserActive).toContainText('Awaiting Transaction');
        await expect(sapPage.statusPanel).toContainText(/Transaction ZZCUSTOM_TX not supported\./); // option 1
        await expect(sapPage.statusPanel).toContainText(/Transaction .*? not supported\./); // option 2
    });

    test('11) Schimbare tranzactie', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.statusPanel).toContainText(/Transaction SE16 opened\./);
        await expect(sapPage.browserActive).toContainText('Browser Ready');
        await sapPage.commandInput.fill(transactions.se16n);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.statusPanel).toContainText(/Transaction SE16N opened\./);
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });

    test('12) Dublu open', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.statusPanel).toContainText(/Transaction SE16 opened\./);
        await expect(sapPage.browserActive).toContainText('Browser Ready');
        //await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.statusPanel).toContainText(/Transaction SE16 opened\./);
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });

    test('13) Input field pastreaza valoarea', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await sapPage.keyboard.press('Enter');
        await expect(sapPage.commandInput).toHaveValue(transactions.se16);
    });

    test('14) Butonul Open este vizibil si accesibil', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill(transactions.se16);
        await expect(sapPage.btnOpen).toBeVisible();
        await expect(sapPage.btnOpen).toBeEnabled();
        await sapPage.btnOpen.click();
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });

    test('15) Tranzactie cu spatii', async ({ sapPage }) => {
        await sapPage.goTo();
        await sapPage.commandInput.fill('SE16 ');
        await sapPage.btnOpen.click();
        await expect(sapPage.browserActive).toContainText('Browser Ready');
    });
});