# FR Parent Scenarios

## BEGINNER

1) ESID filter -> extrag FR_GUID si ENT_GUID din randul principal.  
   PRECONDITIE: SE16 este activ si `/CFF/FR_PARENT` este disponibil.  
   ACTIUNE: filtrez dupa `ESID-777` si execut.  
   REZULTAT: obtin exact 1 rand, FR_GUID = `...A555`, ENT_GUID = `...B777`.  

2) Multiple results -> un ESID comun returneaza mai multe randuri.  
   PRECONDITIE: tabelul este disponibil.  
   ACTIUNE: filtrez dupa un ESID comun (`ESID-100`).  
   REZULTAT: row count = 4 randuri.  

3) Filter submit by Enter -> filtrul dinamic poate executa direct.  
   PRECONDITIE: tabelul este selectat.  
   ACTIUNE: completez filtrul ESID si apas Enter.  
   REZULTAT: interogarea ruleaza fara click pe Execute.  

4) FR_GUID lookup -> caut direct dupa FR_GUID.  
   PRECONDITIE: cunosc FR_GUID-ul ancorei secundare.  
   ACTIUNE: filtrez dupa FR_GUID.  
   REZULTAT: randul returnat are ESID-778 si STATUS = Pending.  

## MIDDLE

5) FR_GUID si ENT_GUID sunt diferite.  
   PRECONDITIE: am obtinut randul ESID-777.  
   ACTIUNE: compar FR_GUID cu ENT_GUID.  
   REZULTAT: cele doua valori sunt diferite (A555 vs B777).  

6) Extragere GUID-uri pentru ancora secundara -> ESID-778.  
   PRECONDITIE: tabelul este disponibil.  
   ACTIUNE: filtrez dupa ESID-778.  
   REZULTAT: FR_GUID = `...A556`, ENT_GUID = `...B778`.  

7) Row count corect -> numarul de `<tr>` corespunde cu result-count.  
   PRECONDITIE: am executat cu mai multe randuri.  
   ACTIUNE: compar getRowCount() cu textul din result-count.  
   REZULTAT: valorile sunt identice.  

8) Blocked row -> randul blocat contine empty-like ENT_GUID.  
   PRECONDITIE: exista randuri cu STATUS = Blocked.  
   ACTIUNE: filtrez dupa STATUS = Blocked.  
   REZULTAT: gasesc ESID-779 cu ENT_GUID = 000...000.  

9) Active rows -> filtrare dupa STATUS = Active.  
   PRECONDITIE: tabelul este disponibil.  
   ACTIUNE: filtrez dupa STATUS = Active.  
   REZULTAT: toate randurile returnate au STATUS = Active.  

## EXPERIENCED

10) Archived row -> ESID-780 are STATUS = Archived.  
    PRECONDITIE: tabelul este disponibil.  
    ACTIUNE: filtrez dupa STATUS = Archived.  
    REZULTAT: gasesc randuri cu status Archived.  

11) Pending row -> ESID-778 are STATUS = Pending.  
    PRECONDITIE: tabelul este disponibil.  
    ACTIUNE: filtrez dupa ESID-778.  
    REZULTAT: STATUS = Pending.  

12) Multiline description -> DESCRIPTION poate fi parsata pe linii.  
    PRECONDITIE: randul ESID-779 este vizibil.  
    ACTIUNE: getCellLines(0, "DESCRIPTION").  
    REZULTAT: exact 2 linii.  

13) Description contine text relevant.  
    PRECONDITIE: randul ESID-777 este vizibil.  
    ACTIUNE: extrag liniile din DESCRIPTION.  
    REZULTAT: una din linii contine `Automation anchor row`.  

14) Executie fara filtre -> toate cele 34 randuri.  
    PRECONDITIE: tabelul selectat, filtre goale.  
    ACTIUNE: apas Execute.  
    REZULTAT: result-count = 34 rows.  

15) FR_GUID lookup pentru ancora principala.  
    PRECONDITIE: cunosc FR_GUID ...A555.  
    ACTIUNE: filtrez dupa FR_GUID.  
    REZULTAT: randul returnat are ESID-777.  

16) Filter submit by Execute button -> functioneaza si prin buton.  
    PRECONDITIE: tabelul selectat, filtru completat.  
    ACTIUNE: apas butonul Execute.  
    REZULTAT: interogarea ruleaza corect.  

17) Ancora tertiara -> ESID-779 are ENT_GUID = empty GUID.  
    PRECONDITIE: tabelul este disponibil.  
    ACTIUNE: filtrez dupa ESID-779.  
    REZULTAT: ENT_GUID = 000...000, STATUS = Blocked.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tabela /CFF/FR_PARENT este selectata si datele mock sunt disponibile.
- Actiune: filtrez dupa ESID, FR_GUID sau STATUS si execut cautarea.
- Rezultat: extrag GUID-uri, validez row count, statusuri si edge cases.
