# States Scenarios

## BEGINNER

1) Loading indicator -> apare inainte de randarea grid-ului.  
   PRECONDITIE: tabelul este gata de executie.  
   ACTIUNE: apas Execute.  
   REZULTAT: loading indicator-ul este vizibil, apoi dispare cand apar rezultatele.  

2) No data found -> filtre fara rezultate afiseaza empty state.  
   PRECONDITIE: aplic un filtru care nu corespunde niciunui rand (`ESID-NOT-FOUND`).  
   ACTIUNE: execut interogarea.  
   REZULTAT: apare mesajul `No data found`.  

3) Clear filters -> valorile de filtrare sunt resetate.  
   PRECONDITIE: unul sau mai multe filtre sunt completate.  
   ACTIUNE: apas `Clear Filters`.  
   REZULTAT: campurile si helper panel se reseteaza.  

## MIDDLE

4) Helper panel active filters -> helper afiseaza filtrele active.  
   PRECONDITIE: filtrele sunt completate (PARENT_ID si REGION).  
   ACTIUNE: inspectez helper panel.  
   REZULTAT: filtrele active sunt afisate corect.  

5) Dynamic filters on table switch -> filtrele se schimba cu tabelul.  
   PRECONDITIE: tranzactia activa pe FR_PARENT (filtru ESID vizibil).  
   ACTIUNE: schimb la MAILCOUNT.  
   REZULTAT: filtrul ESID dispare, filtrul OWNER apare.  

6) Re-execute dupa reset -> revine setul complet.  
   PRECONDITIE: am filtrat FR_PARENT cu ESID-777 (1 rand).  
   ACTIUNE: sterg filtrele si execut din nou.  
   REZULTAT: revine setul complet (34 randuri).  

7) Empty state dispare la re-executie -> dupa clear si execute apar date.  
   PRECONDITIE: am obtinut empty state.  
   ACTIUNE: sterg filtrele si execut din nou.  
   REZULTAT: empty state dispare, setul complet revine.  

## EXPERIENCED

8) Filtrele goale nu afecteaza rezultatele.  
   PRECONDITIE: tranzactia activa, filtre goale.  
   ACTIUNE: execut FR_PARENT fara niciun filtru.  
   REZULTAT: toate cele 34 de randuri sunt returnate.  

9) Row count corect -> numarul de randuri din grid corespunde cu row count.  
   PRECONDITIE: am executat FR_PARENT cu ESID-777.  
   ACTIUNE: compar `result-count` cu numarul real de `<tr>` din grid.  
   REZULTAT: ambele sunt `1 rows`.  

10) Row count dupa filtrare restrictiva -> scade.  
    PRECONDITIE: am executat FR_PARENT fara filtre (34 randuri).  
    ACTIUNE: adaug filtru ESID-777 si re-execut.  
    REZULTAT: row count scade la 1.  

11) Status message reflecta executia.  
    PRECONDITIE: am executat FR_PARENT.  
    ACTIUNE: citesc status message.  
    REZULTAT: mesajul contine `/CFF/FR_PARENT` si numarul de randuri.  

12) Warning message pentru stari exceptionale.  
    PRECONDITIE: am executat FR_PARENT care contine randuri Blocked/Archived.  
    ACTIUNE: citesc warning message.  
    REZULTAT: mesajul mentioneaza stari exceptionale.  

13) Empty state cu GUID inexistent.  
    PRECONDITIE: tranzactia activa pe FR_PARENT.  
    ACTIUNE: filtrez ESID cu valoare absurda.  
    REZULTAT: empty state apare.  

14) Loading apoi grid -> tranzitia completa.  
    PRECONDITIE: tabelul este gata de executie.  
    ACTIUNE: apas Execute si urmaresc tranzitia.  
    REZULTAT: loading -> loading dispare -> results table vizibil.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tranzactia este activa si utilizatorul interactioneaza cu filtrele sau executia.
- Actiune: rulez cautari, schimb filtre, le sterg sau schimb tabelul.
- Rezultat: validez loading, empty state, reset, row count si consistenta helper panel-ului.
