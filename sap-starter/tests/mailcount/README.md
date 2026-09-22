# Mailcount Scenarios

## BEGINNER

1) FR_GUID reuse -> folosesc FR_GUID extras drept PARENT_ID.  
   PRECONDITIE: am extras FR_GUID din FR_PARENT (ESID-777).  
   ACTIUNE: caut in `/CFF/MAILCOUNT` dupa PARENT_ID = FR_GUID.  
   REZULTAT: 3 randuri relationate sunt afisate, primul rand are PARENT_ID = FR_GUID-ul extras.  

2) Status filter -> filtrez dupa STATUS = Sent.  
   PRECONDITIE: tabela este disponibila.  
   ACTIUNE: aplic filtrul STATUS = Sent.  
   REZULTAT: mai mult de 1 rand, toate cu STATUS = Sent.  

3) Owner filter -> OWNER = MARTA returneaza randuri corecte.  
   PRECONDITIE: am filtrat dupa ancora principala.  
   ACTIUNE: aplic PARENT_ID + OWNER = MARTA.  
   REZULTAT: 1 rand cu OWNER = MARTA.  

## MIDDLE

4) Queued row -> izolez randul queued dupa STATUS.  
   PRECONDITIE: caut in randurile ancorei principale.  
   ACTIUNE: filtrez PARENT_ID = FR_GUID + STATUS = Queued.  
   REZULTAT: 1 rand cu MAIL_ID = "MAIL-ANCHOR-777-B" si COUNT = 0.  

5) Secondary branch -> alt FR_GUID intoarce alt set.  
   PRECONDITIE: am FR_GUID-ul ancorei secundare (A556).  
   ACTIUNE: filtrez dupa PARENT_ID = FR_GUID secundar.  
   REZULTAT: 2 randuri, gasesc MAIL-ANCHOR-778-A cu STATUS = Sent.  

6) Global owner/status -> randurile queued OPS_BATCH sunt cautabile global.  
   PRECONDITIE: tabela este disponibila (fara filtru pe PARENT_ID).  
   ACTIUNE: aplic OWNER = OPS_BATCH si STATUS = Queued.  
   REZULTAT: gasesc MAIL-ANCHOR-777-B.  

7) Sent bulk validation -> mai multe randuri Sent validate in bloc.  
   PRECONDITIE: tabela este disponibila.  
   ACTIUNE: aplic STATUS = Sent.  
   REZULTAT: mai mult de 1 rand, verific primele 2 ca au STATUS = Sent.  

## EXPERIENCED

8) Lant FR_PARENT -> MAILCOUNT cu extragere completa.  
   PRECONDITIE: nu am valori extrase.  
   ACTIUNE: execut FR_PARENT cu ESID-777, extrag FR_GUID, apoi caut in MAILCOUNT.  
   REZULTAT: 3 randuri, toate cu PARENT_ID = FR_GUID-ul extras.  

9) Comparatie randuri intre ancora principala si secundara.  
   PRECONDITIE: am FR_GUID pentru ambele ancore.  
   ACTIUNE: execut cautari separate in MAILCOUNT.  
   REZULTAT: ancora principala -> 3 randuri, ancora secundara -> 2 randuri.  

10) Verificare COUNT pe randul queued -> COUNT = 0.  
    PRECONDITIE: am izolat randul queued al ancorei.  
    ACTIUNE: citesc COUNT.  
    REZULTAT: valoarea este `0`.  

11) Verificare ca OWNER-ii variaza -> MARTA, OPS_BATCH, etc.  
    PRECONDITIE: am 3 randuri ale ancorei principale.  
    ACTIUNE: citesc OWNER din fiecare rand.  
    REZULTAT: cel putin 2 OWNER-i diferiti exista.  

12) Filtru OWNER inexistent -> nu returneaza randuri.  
    PRECONDITIE: tabela este disponibila.  
    ACTIUNE: filtrez dupa OWNER = INEXISTENT.  
    REZULTAT: empty state.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: am un FR_GUID extras sau folosesc filtre globale pe /CFF/MAILCOUNT.
- Actiune: caut dupa PARENT_ID, OWNER sau STATUS.
- Rezultat: validez mail rows, filtre pe owner/status si distributia statusurilor.
