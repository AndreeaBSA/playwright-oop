# Case Notes Scenarios

## BEGINNER

1) ENT_GUID reuse -> folosesc ENT_GUID extras drept REFERENCE_ID.  
   PRECONDITIE: am extras ENT_GUID din FR_PARENT (ESID-777).  
   ACTIUNE: caut in `/CFF/CASE_NOTES` dupa REFERENCE_ID = ENT_GUID.  
   REZULTAT: 2 randuri de note operationale corelate, REFERENCE_ID = ENT_GUID-ul extras.  

2) Priority filter -> filtrez dupa PRIORITY = Critical.  
   PRECONDITIE: tabela de note este disponibila.  
   ACTIUNE: aplic filtrul PRIORITY = Critical.  
   REZULTAT: mai mult de 1 rand, toate cu PRIORITY = Critical.  

3) Executie fara filtre -> toate notele sunt afisate.  
   PRECONDITIE: tabela este selectata.  
   ACTIUNE: execut fara filtre.  
   REZULTAT: row count reflecta totalul din mock data.  

## MIDDLE

4) Combined REFERENCE_ID + OWNER -> izolez nota tehnica.  
   PRECONDITIE: cunosc ancora de automatizare (ENT_GUID = B777).  
   ACTIUNE: filtrez dupa REFERENCE_ID + OWNER = ONCALL.  
   REZULTAT: 1 rand cu CASE_ID = "CASE-ANCHOR-777", NOTE_TYPE = Technical, PRIORITY = Critical.  

5) Empty-like REFERENCE_ID -> negative-path notes.  
   PRECONDITIE: folosesc EMPTY_GUID ca REFERENCE_ID.  
   ACTIUNE: execut interogarea.  
   REZULTAT: gasesc CASE-ANCHOR-779 cu PRIORITY = High.  

6) Multiline NOTE_TEXT -> textul notei poate fi parsat.  
   PRECONDITIE: am randul CASE-ANCHOR-777.  
   ACTIUNE: getCellLines pe NOTE_TEXT.  
   REZULTAT: mai mult de 1 linie.  

7) Filtru OWNER -> ONCALL returneaza note specifice.  
   PRECONDITIE: tabela este disponibila.  
   ACTIUNE: filtrez dupa OWNER = ONCALL.  
   REZULTAT: randurile returnate au OWNER = ONCALL.  

## EXPERIENCED

8) Lant complet FR_PARENT -> CASE_NOTES.  
   PRECONDITIE: nu am valori extrase.  
   ACTIUNE: execut FR_PARENT cu ESID-777, extrag ENT_GUID, apoi caut in CASE_NOTES.  
   REZULTAT: 2 randuri cu REFERENCE_ID = ENT_GUID-ul extras.  

9) Verificare NOTE_TYPE variaza -> Customer, Operations, Finance, Technical.  
   PRECONDITIE: am executat CASE_NOTES fara filtre.  
   ACTIUNE: citesc NOTE_TYPE din mai multe randuri.  
   REZULTAT: exista variatie in NOTE_TYPE.  

10) Combined PRIORITY + OWNER -> izolare avansata.  
    PRECONDITIE: tabela este disponibila.  
    ACTIUNE: filtrez PRIORITY = Critical + OWNER = ONCALL.  
    REZULTAT: gasesc nota de automatizare CASE-ANCHOR-777.  

11) Comparatie ancora principala vs tertiara in CASE_NOTES.  
    PRECONDITIE: am ENT_GUID din ESID-777 (B777) si ESID-779 (empty GUID).  
    ACTIUNE: execut doua cautari in CASE_NOTES.  
    REZULTAT: B777 -> 2 note (Critical/Technical), empty GUID -> nota cu PRIORITY = High.  

12) Validare CASE_ID unic per nota -> fiecare nota are ID diferit.  
    PRECONDITIE: am mai multe note.  
    ACTIUNE: citesc CASE_ID din primele 2 randuri.  
    REZULTAT: valorile sunt diferite.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: cunosc un ENT_GUID sau vrei sa verifici note operationale dupa owner ori prioritate.
- Actiune: filtrez dupa REFERENCE_ID, OWNER si PRIORITY.
- Rezultat: validez relatia cu entitlement-ul si severitatea contextului operational.
