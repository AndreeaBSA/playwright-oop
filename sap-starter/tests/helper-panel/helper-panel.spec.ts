import { test, expect } from "../../fixtures/test-fixtures.js";
import { FrParentPage } from "../../pages/FrParentPage.js";
import { automationAnchor, columnsFrParent, secondaryAnchor, tables, tertiaryAnchor, transactions, emptyGuid } from "../../utils/test-data.js";

// ## BEGINNER

// 1) Transaction shown -> helper afiseaza tranzactia activa.  
//    PRECONDITIE: browserul SAP-like este activ cu SE16.  
//    ACTIUNE: inspectez helper panel.  
//    REZULTAT: tranzactia `SE16` este vizibila.  

// 2) Selected table shown -> helper arata tabelul ales.  
//    PRECONDITIE: un tabel este selectat.  
//    ACTIUNE: schimb table name fara execute.  
//    REZULTAT: helper panel afiseaza selectia curenta.  

// 3) Current table after execute -> helper urmareste tabelul incarcat.  
//    PRECONDITIE: am selectat un tabel.  
//    ACTIUNE: execut interogarea.  
//    REZULTAT: helper panel afiseaza tabelul executat.  

// 4) Clear filters -> helper revine la `-`.  
//    PRECONDITIE: helper panel afiseaza filtre active.  
//    ACTIUNE: apas `Clear Filters`.  
//    REZULTAT: helper panel revine la starea vida (`-`).  

test.describe('BEGINER - Helper Panel Scenarios', () => {
    test('1) Transaction shown', async ({ sapPage}) =>{ 
        

    });
} );