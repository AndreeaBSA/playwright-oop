# Cross Table Scenarios

## BEGINNER

1) ENT_GUID reuse -> folosesc `ENT_GUID` extras din FR_PARENT drept `PARENT_ID` in ITM_DETAILS.  
   PRECONDITIE: am extras `ENT_GUID` din `/CFF/FR_PARENT` (ESID-777).  
   ACTIUNE: deschid `/CFF/ITM_DETAILS`, filtrez dupa `PARENT_ID` = ENT_GUID extras.  
   REZULTAT: sunt returnate 3 randuri relationate.  

2) Empty GUID -> branch invalid produce no-results.  
   PRECONDITIE: folosesc `EMPTY_GUID` (000...000) ca PARENT_ID.  
   ACTIUNE: execut interogarea pe ITM_DETAILS.  
   REZULTAT: apare empty state, tabelul nu are randuri.  

3) Secondary branch -> alt ENT_GUID intoarce alt branch.  
   PRECONDITIE: am extras ENT_GUID din ESID-778 (ancora secundara).  
   ACTIUNE: filtrez ITM_DETAILS dupa acest PARENT_ID.  
   REZULTAT: se intoarce 1 rand cu CALLOFF = `CALL-SECONDARY-778` si REGION = AMER.  

## MIDDLE

4) Target field validation -> validez CALLOFF, SETUP_FR, NWR_ITEM_ID.  
   PRECONDITIE: am 3 randuri din ITM_DETAILS (ancora principala).  
   ACTIUNE: caut randul cu CALLOFF = EMPTY_GUID.  
   REZULTAT: SETUP_FR contine FR_GUID-ul extras, NWR_ITEM_ID = EMPTY_GUID.  

5) Combined filters -> PARENT_ID si REGION pot restrange setul.  
   PRECONDITIE: ancora principala are 3 randuri EMEA.  
   ACTIUNE: aplic PARENT_ID + REGION = EMEA.  
   REZULTAT: raman exact 3 randuri, toate cu REGION = EMEA.  

6) FR_GUID vs ENT_GUID -> semantica filtrelor conteaza.  
   PRECONDITIE: am atat FR_GUID cat si ENT_GUID din ESID-778.  
   ACTIUNE: execut doua cautari separate in ITM_DETAILS: una cu ENT_GUID, alta cu FR_GUID.  
   REZULTAT: seturile de rezultate sunt diferite (AMER vs APJ).  

7) Row search by CALLOFF -> gaseste sibling-ul alternativ.  
   PRECONDITIE: am 3 randuri din ancora principala.  
   ACTIUNE: caut randul cu CALLOFF = "CALL-ALT-777".  
   REZULTAT: randul exista, SETUP_FR contine FR_GUID-ul ancorei, NWR_ITEM_ID = "NWR-0777".  

## EXPERIENCED

8) Lant complet FR_PARENT -> ITM_DETAILS -> validare downstream.  
   PRECONDITIE: nu am nicio valoare extrasa initial.  
   ACTIUNE: execut FR_PARENT cu ESID-777, extrag FR_GUID si ENT_GUID, apoi folosesc ENT_GUID in ITM_DETAILS.  
   REZULTAT: verific ca SETUP_FR din ITM_DETAILS contine FR_GUID-ul extras din FR_PARENT.  

9) Lant cu 3 tabele -> FR_PARENT -> extrag ENT_GUID -> ENTITLEMENT -> validez tipul.  
   PRECONDITIE: nu am nicio valoare.  
   ACTIUNE: extrag ENT_GUID din FR_PARENT (ESID-777), apoi caut in ENTITLEMENT dupa ENT_GUID.  
   REZULTAT: randul din ENTITLEMENT are ENT_TYPE = Premium.  

10) Lant cu 3 tabele via FR_GUID -> FR_PARENT -> FR_AUDIT -> validez history.  
    PRECONDITIE: nu am nicio valoare.  
    ACTIUNE: extrag FR_GUID din FR_PARENT, apoi caut in FR_AUDIT dupa FR_GUID.  
    REZULTAT: gasesc 2 randuri de audit (UPDATE si ERROR).  

11) Cross-table cu ancora tertiara -> blocked flow.  
    PRECONDITIE: extrag ENT_GUID din ESID-779 (empty GUID).  
    ACTIUNE: folosesc acest ENT_GUID in ITM_DETAILS ca PARENT_ID.  
    REZULTAT: empty state - niciun rand, confirma ca branch-ul blocat nu are detalii.  

12) Validare regiune specifica -> FR_GUID branch APJ.  
    PRECONDITIE: am FR_GUID-ul ancorei secundare (A556).  
    ACTIUNE: filtrez ITM_DETAILS dupa PARENT_ID = FR_GUID + REGION = APJ.  
    REZULTAT: exact 1 rand cu CALLOFF = "CALL-FR-778" si REGION = APJ.  

13) Validare ca ENT_GUID-ul blocat nu are CASE_NOTES.  
    PRECONDITIE: am ENT_GUID = empty GUID din ESID-779.  
    ACTIUNE: caut in CASE_NOTES dupa REFERENCE_ID = empty GUID.  
    REZULTAT: gasesc randul CASE-ANCHOR-779 cu PRIORITY = High.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: am extras valori dintr-un tabel si vreau sa le refolosesc intr-un altul.
- Actiune: deschid tabela secundara, aplic filtre bazate pe GUID-uri si caut randuri tinta.
- Rezultat: validez ca relatiile dintre tabele si valorile downstream sunt corecte.
