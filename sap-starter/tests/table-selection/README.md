# Table Selection Scenarios

## BEGINNER

1) Execute via buton -> un tabel cunoscut incarca rezultate.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: selectez `/CFF/FR_PARENT` si apas Execute.  
   REZULTAT: grid-ul afiseaza rezultatele tabelului.  

2) Enter pe input-ul de tabel -> executia se face direct.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: introduc `/CFF/ENTITLEMENT` si apas Enter.  
   REZULTAT: tabelul se incarca fara click suplimentar.  

3) Clear filters -> valorile introduse sunt resetate.  
   PRECONDITIE: am completat un filtru.  
   ACTIUNE: apas `Clear Filters`.  
   REZULTAT: campurile de filtrare revin la gol.  

4) Headerele se schimba cu tabelul.  
   PRECONDITIE: un tabel este deja executat.  
   ACTIUNE: execut alt tabel.  
   REZULTAT: headerele in grid corespund noului tabel.  

## MIDDLE

5) FR_PARENT expune filtrul ESID.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: selectez FR_PARENT.  
   REZULTAT: campul de filtru ESID apare.  

6) MAILCOUNT schimba filtrele -> OWNER apare, ESID dispare.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: selectez MAILCOUNT.  
   REZULTAT: filtrul OWNER este vizibil, filtrul ESID nu mai exista.  

7) ITM_DETAILS expune PARENT_ID si REGION.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: selectez ITM_DETAILS.  
   REZULTAT: filtrele PARENT_ID si REGION sunt vizibile.  

8) Schimbare tabel reseteaza filtrele.  
   PRECONDITIE: am completat filtrul ESID pe FR_PARENT.  
   ACTIUNE: schimb la MAILCOUNT.  
   REZULTAT: filtrele vechi dispar, filtrele noi sunt goale.  

## EXPERIENCED

9) ENTITLEMENT expune ENT_GUID, ENT_TYPE si ACTIVE.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: selectez ENTITLEMENT.  
   REZULTAT: cele 3 filtre sunt vizibile.  

10) FR_AUDIT expune FR_GUID si EVENT_TYPE.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: selectez FR_AUDIT.  
    REZULTAT: cele 2 filtre sunt vizibile.  

11) CASE_NOTES expune REFERENCE_ID, OWNER si PRIORITY.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: selectez CASE_NOTES.  
    REZULTAT: cele 3 filtre sunt vizibile.  

12) Clear filters nu afecteaza tabelul selectat.  
    PRECONDITIE: am selectat FR_PARENT si completat un filtru.  
    ACTIUNE: apas Clear Filters.  
    REZULTAT: tabelul ramane FR_PARENT, doar filtrele se sterg.  

13) FR_PARENT are 5 coloane -> ESID, FR_GUID, ENT_GUID, STATUS, DESCRIPTION.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: execut FR_PARENT.  
    REZULTAT: grid-ul afiseaza exact aceste 5 coloane ca headere.  

14) MAILCOUNT are 5 coloane -> MAIL_ID, PARENT_ID, COUNT, OWNER, STATUS.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: execut MAILCOUNT.  
    REZULTAT: grid-ul afiseaza exact aceste 5 coloane.  

15) Execute fara tabel selectat -> eroare.  
    PRECONDITIE: tranzactia este activa, input-ul de tabel este gol.  
    ACTIUNE: apas Execute.  
    REZULTAT: mesaj de eroare, grid-ul ramane gol.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tranzactia este activa si utilizatorul poate selecta un tabel.
- Actiune: aleg un tabel, completez filtre si execut interogarea.
- Rezultat: filtrele, headerele si helper panel reflecta corect tabelul activ.
