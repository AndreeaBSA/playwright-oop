# FR Audit Scenarios

## BEGINNER

1) FR_GUID reuse -> folosesc FR_GUID extras drept cheie tehnica de audit.  
   PRECONDITIE: am extras FR_GUID din FR_PARENT (ESID-777).  
   ACTIUNE: caut in `/CFF/FR_AUDIT` dupa FR_GUID.  
   REZULTAT: 2 randuri de audit, ambele cu FR_GUID-ul extras.  

2) Event type filter -> filtrez dupa EVENT_TYPE = ERROR.  
   PRECONDITIE: tabela de audit este disponibila.  
   ACTIUNE: aplic filtrul EVENT_TYPE = ERROR.  
   REZULTAT: mai mult de 1 rand, toate cu EVENT_TYPE = ERROR.  

3) Executie fara filtre -> toate intrarile de audit sunt afisate.  
   PRECONDITIE: tabela este selectata.  
   ACTIUNE: execut fara filtre.  
   REZULTAT: row count reflecta totalul din mock data.  

## MIDDLE

4) Validare ordinea EVENT_TYPE -> ancora principala are UPDATE si ERROR.  
   PRECONDITIE: am filtrat FR_AUDIT dupa FR_GUID-ul ancorei principale.  
   ACTIUNE: citesc EVENT_TYPE din randul 0 si randul 1.  
   REZULTAT: randul 0 = UPDATE, randul 1 = ERROR.  

5) Multiline details -> DETAILS poate fi parsata pe linii.  
   PRECONDITIE: am 2 randuri de audit pentru ancora principala.  
   ACTIUNE: getCellLines pe randul 1, coloana DETAILS.  
   REZULTAT: 2 linii, prima contine "Automation anchor audit row.", a doua contine "production-style audit history".  

6) CHANGED_BY variaza -> verificare ca CHANGED_BY nu e identic pe toate randurile.  
   PRECONDITIE: am mai multe randuri de audit.  
   ACTIUNE: citesc CHANGED_BY din fiecare rand.  
   REZULTAT: exista variatie in valorile CHANGED_BY.  

7) Filtru FR_GUID inexistent -> no results.  
   PRECONDITIE: tabela este disponibila.  
   ACTIUNE: filtrez dupa un FR_GUID inventat.  
   REZULTAT: empty state.  

## EXPERIENCED

8) Lant complet FR_PARENT -> FR_AUDIT.  
   PRECONDITIE: nu am valori extrase.  
   ACTIUNE: execut FR_PARENT cu ESID-777, extrag FR_GUID, apoi caut in FR_AUDIT.  
   REZULTAT: 2 randuri de audit, ambele cu FR_GUID-ul extras, EVENT_TYPE = UPDATE si ERROR.  

9) Verificare audit pentru ancora secundara -> EVENT_TYPE-uri diferite.  
   PRECONDITIE: am FR_GUID din ESID-778.  
   ACTIUNE: caut in FR_AUDIT.  
   REZULTAT: randurile de audit exista si pot avea alte EVENT_TYPE-uri.  

10) Bulk validation EVENT_TYPE = ERROR -> toate randurile de eroare.  
    PRECONDITIE: tabela este disponibila.  
    ACTIUNE: filtrez EVENT_TYPE = ERROR.  
    REZULTAT: verific primele 2 randuri ca au EVENT_TYPE = ERROR.  

11) Validare AUDIT_ID unic -> fiecare rand are AUDIT_ID diferit.  
    PRECONDITIE: am mai multe randuri de audit.  
    ACTIUNE: citesc AUDIT_ID din randul 0 si randul 1.  
    REZULTAT: valorile sunt diferite.  

12) Multiline cu context real -> Details contine informatii operationale.  
    PRECONDITIE: am randul ERROR al ancorei principale.  
    ACTIUNE: parsez DETAILS.  
    REZULTAT: linia 1 indica tipul erorii, linia 2 da context operational.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: cunosc un FR_GUID valid sau un tip de eveniment din audit trail.
- Actiune: filtrez dupa cheie tehnica sau dupa starea evenimentului.
- Rezultat: validez istoricul, ordinea intrarilor si textul operational asociat.
