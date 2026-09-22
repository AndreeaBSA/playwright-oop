# Navigation Scenarios

## BEGINNER

1) SE16 via Enter -> tabelul selectat se incarca corect.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: introduc `SE16`, selectez un tabel si execut.  
   REZULTAT: grid-ul se incarca, helper panel reflecta tranzactia.  

2) SE16N via Enter pe input-ul de tabel -> execut direct din input.  
   PRECONDITIE: browser-ul este activ.  
   ACTIUNE: introduc `SE16N`, completez table name si apas Enter.  
   REZULTAT: tabelul ruleaza fara click pe Execute.  

3) Tranzactie nesuportata -> browser-ul ramane inactiv.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: introduc un cod nesuportat (`MM03`).  
   REZULTAT: controalele de executie raman disabled.  

4) Activare prin butonul Open -> browser-ul se activeaza si prin click.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: introduc tranzactia si apas `Open`.  
   REZULTAT: starea browser-ului devine ready.  

## MIDDLE

5) Schimbare intre tabele -> headere si date se schimba.  
   PRECONDITIE: un tabel este deja incarcat.  
   ACTIUNE: selectez alt tabel si execut.  
   REZULTAT: headerele si continutul grid-ului se schimba.  

6) Helper panel inainte de executie -> reflecta selectia curenta.  
   PRECONDITIE: tranzactia este activa.  
   ACTIUNE: schimb tabelul fara a executa.  
   REZULTAT: helper panel afiseaza tabelul nou selectat.  

7) Helper panel dupa executie -> reflecta tabelul incarcat.  
   PRECONDITIE: am selectat si executat un tabel.  
   ACTIUNE: inspectez helper panel.  
   REZULTAT: helper panel arata tabelul executat si tranzactia activa.  

8) Tranzactia din helper -> SE16 sau SE16N apare corect.  
   PRECONDITIE: am deschis SE16N.  
   ACTIUNE: inspectez helper panel.  
   REZULTAT: campul Transaction arata `SE16N`.  

## EXPERIENCED

9) Navigare FR_PARENT -> MAILCOUNT -> tranzactia se pastreaza.  
   PRECONDITIE: am executat FR_PARENT cu SE16.  
   ACTIUNE: schimb la MAILCOUNT si execut.  
   REZULTAT: tranzactia ramane SE16, tabelul se schimba la MAILCOUNT.  

10) Navigare circulara -> FR_PARENT -> ITM_DETAILS -> FR_PARENT.  
    PRECONDITIE: am executat FR_PARENT.  
    ACTIUNE: execut ITM_DETAILS, apoi revin la FR_PARENT.  
    REZULTAT: FR_PARENT se reincarca corect cu toate randurile.  

11) Toate cele 6 tabele sunt navigabile.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: execut pe rand FR_PARENT, ITM_DETAILS, ENTITLEMENT, MAILCOUNT, FR_AUDIT, CASE_NOTES.  
    REZULTAT: fiecare tabel afiseaza rezultate si headere corecte.  

12) Tabel inexistent -> mesaj de eroare.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: introduc `/CFF/INEXISTENT` si execut.  
    REZULTAT: mesaj de eroare, grid-ul ramane gol.  

13) Numele tabelului case-insensitive -> `/cff/fr_parent` functioneaza.  
    PRECONDITIE: tranzactia este activa.  
    ACTIUNE: introduc `/cff/fr_parent` (lowercase).  
    REZULTAT: tabelul FR_PARENT se incarca corect.  

14) Headere se schimba la navigare -> ESID dispare, MAIL_ID apare.  
    PRECONDITIE: am executat FR_PARENT (are coloana ESID).  
    ACTIUNE: execut MAILCOUNT.  
    REZULTAT: ESID nu mai exista in headere, MAIL_ID apare.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: aplicatia este disponibila si tranzactia poate fi activata.
- Actiune: navighez intre tranzactii si tabele folosind Enter sau click.
- Rezultat: helper panel, starea browserului si grid-ul reflecta contextul ales.
