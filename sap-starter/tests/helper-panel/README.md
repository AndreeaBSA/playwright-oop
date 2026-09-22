# Helper Panel Scenarios

## BEGINNER

1) Transaction shown -> helper afiseaza tranzactia activa.  
   PRECONDITIE: browserul SAP-like este activ cu SE16.  
   ACTIUNE: inspectez helper panel.  
   REZULTAT: tranzactia `SE16` este vizibila.  

2) Selected table shown -> helper arata tabelul ales.  
   PRECONDITIE: un tabel este selectat.  
   ACTIUNE: schimb table name fara execute.  
   REZULTAT: helper panel afiseaza selectia curenta.  

3) Current table after execute -> helper urmareste tabelul incarcat.  
   PRECONDITIE: am selectat un tabel.  
   ACTIUNE: execut interogarea.  
   REZULTAT: helper panel afiseaza tabelul executat.  

4) Clear filters -> helper revine la `-`.  
   PRECONDITIE: helper panel afiseaza filtre active.  
   ACTIUNE: apas `Clear Filters`.  
   REZULTAT: helper panel revine la starea vida (`-`).  

## MIDDLE

5) Single filter chip -> un singur filtru apare in helper.  
   PRECONDITIE: am completat un filtru (ESID = ESID-777).  
   ACTIUNE: inspectez sectiunea de filtre active.  
   REZULTAT: helper afiseaza `ESID=ESID-777`.  

6) Multiple filter chips -> mai multe filtre apar simultan.  
   PRECONDITIE: am completat PARENT_ID si REGION pe ITM_DETAILS.  
   ACTIUNE: inspectez helper panel.  
   REZULTAT: ambele filtre sunt vizibile.  

7) Filtru gol nu apare -> doar filtrele completate sunt afisate.  
   PRECONDITIE: am completat doar ESID, STATUS ramane gol.  
   ACTIUNE: inspectez helper panel.  
   REZULTAT: doar `ESID=...` apare.  

8) Filtrele se schimba la schimbarea tabelului.  
   PRECONDITIE: am filtre active pe FR_PARENT.  
   ACTIUNE: schimb la ENTITLEMENT.  
   REZULTAT: filtrele vechi dispar din helper, apar cele noi (goale).  

## EXPERIENCED

9) Schimbare tranzactie -> helper reflecta noua tranzactie.  
   PRECONDITIE: SE16 este activ.  
   ACTIUNE: schimb la SE16N.  
   REZULTAT: helper panel afiseaza `SE16N`.  

10) Variant label apare in helper.  
    PRECONDITIE: am selectat o varianta pe FR_PARENT.  
    ACTIUNE: inspectez helper panel.  
    REZULTAT: label-ul variantei active apare.  

11) Search profile reflecta filter mode.  
    PRECONDITIE: am schimbat Match Mode la `exact`.  
    ACTIUNE: inspectez helper panel.  
    REZULTAT: search profile arata modul selectat.  

12) Max rows apare in search profile.  
    PRECONDITIE: am setat Max Rows la 25.  
    ACTIUNE: inspectez helper panel.  
    REZULTAT: helper arata limita de 25 randuri.  

13) Prima executie apare in history.  
    PRECONDITIE: nicio executie anterioara.  
    ACTIUNE: execut FR_PARENT.  
    REZULTAT: history arata o intrare cu FR_PARENT si row count-ul.  

14) Mai multe executii apar in ordine inversa.  
    PRECONDITIE: am executat FR_PARENT apoi MAILCOUNT.  
    ACTIUNE: inspectez execution history.  
    REZULTAT: MAILCOUNT apare prima, FR_PARENT a doua.  

15) History contine filtrele folosite.  
    PRECONDITIE: am executat FR_PARENT cu ESID-777.  
    ACTIUNE: inspectez history card.  
    REZULTAT: card-ul arata filtrele `ESID=ESID-777`.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tranzactia este activa si utilizatorul interactioneaza cu selectia de tabel sau filtrele.
- Actiune: aleg un tabel, aplic filtre sau le sterg.
- Rezultat: helper panel reflecta in timp real tranzactia, tabelul, filtrele active si istoricul executiilor.
