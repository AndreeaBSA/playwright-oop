# Entitlement Scenarios

## BEGINNER

1) ENT_GUID lookup -> caut dupa GUID extras si validez randul.  
   PRECONDITIE: am extras `ENT_GUID` din `/CFF/FR_PARENT` (ESID-777).  
   ACTIUNE: filtrez tabela `/CFF/ENTITLEMENT` dupa ENT_GUID.  
   REZULTAT: 1 rand returnat, ENT_TYPE = Premium, ACTIVE = N.  

2) Global ACTIVE filter -> filtrez dupa ACTIVE = Y.  
   PRECONDITIE: tabela este disponibila.  
   ACTIUNE: aplic filtrul ACTIVE = Y.  
   REZULTAT: toate randurile returnate au ACTIVE = Y (verificare pe primele 3 randuri).  

3) Filtru ENT_TYPE -> filtrez dupa Premium.  
   PRECONDITIE: tabela este disponibila.  
   ACTIUNE: aplic filtrul ENT_TYPE = Premium.  
   REZULTAT: mai mult de 1 rand, toate cu ENT_TYPE = Premium.  

## MIDDLE

4) Empty-like GUID -> randurile cu 000...000 sunt tratate corect.  
   PRECONDITIE: folosesc `EMPTY_GUID` la filtrare.  
   ACTIUNE: execut interogarea.  
   REZULTAT: gasesc un rand cu ACTIVE = N si ENT_GUID = 000...000.  

5) Secondary active row -> branch-ul secundar este valid si activ.  
   PRECONDITIE: cunosc ENT_GUID-ul ancorei secundare (B778).  
   ACTIUNE: filtrez dupa acest ENT_GUID.  
   REZULTAT: 1 rand cu ENT_TYPE = Migration si ACTIVE = Y.  

6) Combined filters -> izolez un singur rand prin ENT_GUID + ACTIVE.  
   PRECONDITIE: cunosc ENT_GUID-ul secundar.  
   ACTIUNE: aplic ENT_GUID + ACTIVE = Y.  
   REZULTAT: exact 1 rand cu ENT_GUID = B778 si ACTIVE = Y.  

7) Diferenta intre ancora principala si secundara -> ENT_TYPE diferit.  
   PRECONDITIE: am ENT_GUID-ul ancorei principale (B777) si secundare (B778).  
   ACTIUNE: execut doua cautari separate.  
   REZULTAT: prima are ENT_TYPE = Premium, a doua ENT_TYPE = Migration.  

## EXPERIENCED

8) Lant FR_PARENT -> ENTITLEMENT -> extrag si validez.  
   PRECONDITIE: nu am nicio valoare extrasa.  
   ACTIUNE: execut FR_PARENT cu ESID-777, extrag ENT_GUID, apoi caut in ENTITLEMENT.  
   REZULTAT: randul din ENTITLEMENT are ENT_GUID-ul extras si ENT_TYPE = Premium.  

9) Verificare ca toate ancoerele au intrare in ENTITLEMENT.  
   PRECONDITIE: cunosc 3 ancore (ESID-777, 778, 779).  
   ACTIUNE: extrag ENT_GUID din fiecare, caut in ENTITLEMENT.  
   REZULTAT: ESID-777 -> Premium/N, ESID-778 -> Migration/Y, ESID-779 -> empty GUID -> ACTIVE = N.  

10) Filtru combinat ENT_TYPE + ACTIVE -> Premium + Y.  
    PRECONDITIE: tabela este disponibila.  
    ACTIUNE: aplic ENT_TYPE = Premium si ACTIVE = Y.  
    REZULTAT: setul de rezultate contine doar randuri active cu tip Premium.  

11) Validare CREATED_AT -> coloana de data exista si are format corect.  
    PRECONDITIE: am executat ENTITLEMENT fara filtre.  
    ACTIUNE: citesc CREATED_AT din primul rand.  
    REZULTAT: valoarea are format de data (contine cifre si separatori).  

12) Row count total -> ENTITLEMENT fara filtre.  
    PRECONDITIE: tabela selectata, filtre goale.  
    ACTIUNE: execut fara filtre.  
    REZULTAT: row count corespunde cu numarul total din mock data.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: cunosc un ENT_GUID sau un criteriu global precum ACTIVE ori ENT_TYPE.
- Actiune: aplic filtre pe tabela /CFF/ENTITLEMENT.
- Rezultat: verific tipul entitlement-ului, flagul de activitate si izolarea corecta a randurilor.
