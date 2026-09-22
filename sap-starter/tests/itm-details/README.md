# ITM Details Scenarios

## BEGINNER

1) Parent by ENT_GUID -> randurile principale sunt incarcate.  
   PRECONDITIE: cunosc ENT_GUID pentru ancora principala (B777).  
   ACTIUNE: filtrez ITM_DETAILS dupa PARENT_ID = ENT_GUID.  
   REZULTAT: tabela returneaza 3 randuri.  

2) Empty GUID -> no-results.  
   PRECONDITIE: folosesc EMPTY_GUID drept PARENT_ID.  
   ACTIUNE: execut interogarea.  
   REZULTAT: apare empty state.  

3) Executie fara filtre -> toate randurile sunt afisate.  
   PRECONDITIE: tabela este selectata, filtre goale.  
   ACTIUNE: execut.  
   REZULTAT: row count reflecta totalul din mock data.  

## MIDDLE

4) Empty-like CALLOFF row -> randul cu CALLOFF = 000...000 exista.  
   PRECONDITIE: am 3 randuri din ancora principala.  
   ACTIUNE: caut randul cu CALLOFF = EMPTY_GUID.  
   REZULTAT: randul este gasit (index >= 0).  

5) SETUP_FR contains FR_GUID -> legatura este corecta.  
   PRECONDITIE: am extras FR_GUID din FR_PARENT.  
   ACTIUNE: citesc SETUP_FR din randul cu CALLOFF = EMPTY_GUID.  
   REZULTAT: SETUP_FR contine FR_GUID-ul extras.  

6) Secondary entitlement branch -> regiune AMER.  
   PRECONDITIE: am ENT_GUID-ul ancorei secundare (B778).  
   ACTIUNE: filtrez dupa PARENT_ID = ENT_GUID secundar.  
   REZULTAT: 1 rand cu REGION = AMER.  

7) FR_GUID branch -> regiune APJ.  
   PRECONDITIE: am FR_GUID-ul ancorei secundare (A556).  
   ACTIUNE: filtrez dupa PARENT_ID + REGION = APJ.  
   REZULTAT: 1 rand cu CALLOFF = "CALL-FR-778" si REGION = APJ.  

8) Diferenta intre ENT_GUID si FR_GUID branches -> AMER vs APJ.  
   PRECONDITIE: am ambele GUID-uri din ESID-778.  
   ACTIUNE: filtrez ITM_DETAILS intai cu ENT_GUID, apoi cu FR_GUID.  
   REZULTAT: ENT_GUID -> AMER, FR_GUID + APJ -> APJ.  

## EXPERIENCED

9) Lant complet FR_PARENT -> ITM_DETAILS cu extragere si validare.  
   PRECONDITIE: nu am valori extrase.  
   ACTIUNE: execut FR_PARENT cu ESID-777, extrag FR_GUID si ENT_GUID, caut in ITM_DETAILS.  
   REZULTAT: 3 randuri, randul cu CALLOFF = EMPTY_GUID are SETUP_FR = FR_GUID.  

10) Multiline COMMENTS -> parsare pe linii.  
    PRECONDITIE: am randul 0 din ancora principala.  
    ACTIUNE: getCellLines(0, "COMMENTS").  
    REZULTAT: mai mult de 1 linie.  

11) Verificare NWR_ITEM_ID pe randul alternativ -> NWR-0777.  
    PRECONDITIE: am 3 randuri din ancora principala.  
    ACTIUNE: caut randul cu CALLOFF = "CALL-ALT-777".  
    REZULTAT: NWR_ITEM_ID = "NWR-0777".  

12) Validare REGION pe toate cele 3 randuri ale ancorei -> toate EMEA.  
    PRECONDITIE: am 3 randuri din ancora principala.  
    ACTIUNE: verific REGION pe fiecare rand.  
    REZULTAT: toate cele 3 au REGION = EMEA.  

13) Comparatie row count intre ancore -> principala (3), secundara ENT (1), secundara FR (1).  
    PRECONDITIE: am GUID-urile tuturor ancorelor.  
    ACTIUNE: execut 3 cautari separate.  
    REZULTAT: numarul de randuri corespunde.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tabela /CFF/ITM_DETAILS este disponibila si am valori din tabela parinte.
- Actiune: filtrez dupa PARENT_ID, REGION sau caut randuri dupa continut.
- Rezultat: validez relatiile dintre GUID-uri si valorile downstream din grid.
