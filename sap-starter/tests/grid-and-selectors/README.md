# Grid And Selectors Scenarios

## BEGINNER

1) Row innerText -> citesc textul complet al unui rand.  
   PRECONDITIE: grid-ul este incarcat cu FR_PARENT, filtrat dupa ESID-777.  
   ACTIUNE: citesc innerText pe randul 0.  
   REZULTAT: textul contine ESID-777 si FR_GUID-ul asteptat.  

2) Robust column selectors -> folosesc data-column-name.  
   PRECONDITIE: rezultatele sunt vizibile.  
   ACTIUNE: citesc valorile pe coloane specifice (FR_GUID, ENT_GUID).  
   REZULTAT: extragerea e stabila, independenta de ordinea coloanelor.  

3) Row selection -> selectez un rand prin radio button.  
   PRECONDITIE: grid-ul are cel putin un rand.  
   ACTIUNE: click pe row-selector pe randul 0.  
   REZULTAT: radio-ul devine checked, randul apare selectat.  

4) Header cells expun atribute stabile.  
   PRECONDITIE: rezultatele sunt vizibile.  
   ACTIUNE: inspectez data-column-name pe headerul CALLOFF.  
   REZULTAT: atributul are valoarea `CALLOFF`.  

## MIDDLE

5) Multiline COMMENTS parsing.  
   PRECONDITIE: ITM_DETAILS incarcat, randul are COMMENTS multiline.  
   ACTIUNE: getCellLines(0, "COMMENTS").  
   REZULTAT: mai mult de 1 linie.  

6) Column-aware selectors vs first/last -> comparatie.  
   PRECONDITIE: ITM_DETAILS incarcat, mai multe randuri.  
   ACTIUNE: verific ca cell(0, "CALLOFF") != cell(1, "CALLOFF").  
   REZULTAT: valorile sunt diferite, selectorii pe coloana sunt mai siguri.  

7) Rows expun data-row-index stabil.  
   PRECONDITIE: grid-ul are cel putin un rand.  
   ACTIUNE: inspectez data-row-index pe primul rand.  
   REZULTAT: atributul are valoarea `0`.  

8) Row selector are name="selected-row".  
   PRECONDITIE: grid-ul are randuri.  
   ACTIUNE: inspectez atributul name pe radio input.  
   REZULTAT: toate radio-urile au name="selected-row".  

9) Schimbare selectie -> alt rand deselecteaza primul.  
   PRECONDITIE: randul 0 este selectat.  
   ACTIUNE: click pe row-selector pe randul 1.  
   REZULTAT: randul 1 selectat, randul 0 deselectat.  

## EXPERIENCED

10) Full row innerText parsing -> split pe newline.  
    PRECONDITIE: randul ESID-777 vizibil (DESCRIPTION multiline).  
    ACTIUNE: split('\n'), map(trim), filter(Boolean).  
    REZULTAT: 2 linii, prima contine ESID si FR_GUID.  

11) findFirstRowIndexByColumnValue -> gaseste randul corect.  
    PRECONDITIE: ITM_DETAILS incarcat cu 3 randuri.  
    ACTIUNE: caut randul cu CALLOFF = EMPTY_GUID.  
    REZULTAT: indexul returnat >= 0.  

12) findFirstRowIndexByColumnValue -> -1 daca nu exista.  
    PRECONDITIE: grid-ul este incarcat.  
    ACTIUNE: caut o valoare inexistenta.  
    REZULTAT: indexul = -1.  

13) Cautare CALLOFF alternativ -> CALL-ALT-777.  
    PRECONDITIE: ITM_DETAILS incarcat cu ancora principala.  
    ACTIUNE: caut randul cu CALLOFF = "CALL-ALT-777".  
    REZULTAT: randul exista, SETUP_FR contine FR_GUID-ul ancorei.  

14) getCellText -> extrage textul exact dintr-o celula.  
    PRECONDITIE: FR_PARENT incarcat cu ESID-777.  
    ACTIUNE: getCellText(0, "FR_GUID").  
    REZULTAT: valoarea exacta `FR00000000000000000000000000A555`.  

15) getRowText vs getCellText -> diferenta.  
    PRECONDITIE: FR_PARENT incarcat cu ESID-777.  
    ACTIUNE: getRowText(0) vs getCellText(0, "FR_GUID").  
    REZULTAT: getRowText contine tot randul, getCellText doar celula.  

16) Multiline DESCRIPTION parsing -> FR_PARENT ESID-779.  
    PRECONDITIE: FR_PARENT cu ESID-779.  
    ACTIUNE: getCellLines(0, "DESCRIPTION").  
    REZULTAT: exact 2 linii.  

17) Row text pe mai multe randuri -> fiecare rand e diferit.  
    PRECONDITIE: ITM_DETAILS cu 3 randuri.  
    ACTIUNE: citesc innerText pe randul 0 si randul 1.  
    REZULTAT: textele sunt diferite.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: rezultatele sunt afisate intr-un grid cu atribute stabile.
- Actiune: citesc text, selectez randuri si caut valori prin strategii diferite.
- Rezultat: demonstrez practici robuste de selectie si parsing in Playwright.
