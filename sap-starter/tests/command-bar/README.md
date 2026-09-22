# Command Bar Scenarios

## BEGINNER

1) Open via Enter -> tranzactia activeaza browser-ul.  
   PRECONDITIE: aplicatia este deschisa, browser-ul este inactiv.  
   ACTIUNE: completez `SE16` si apas Enter.  
   REZULTAT: starea browser-ului devine `Browser Ready`.  

2) Open via buton -> click pe `Open` activeaza tranzactia.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: completez `SE16N` si apas butonul `Open`.  
   REZULTAT: tranzactia se activeaza, starea devine `Browser Ready`.  

3) Tranzactie invalida -> executia ramane blocata.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: introduc `MM03`.  
   REZULTAT: browser-ul NU se activeaza, starea ramane `Awaiting Transaction`.  

4) Controale activate -> input-ul de tabel devine activ dupa open.  
   PRECONDITIE: tranzactia este deschisa.  
   ACTIUNE: inspectez controalele din zona de selectie.  
   REZULTAT: input-ul `Table Name` si butonul `Execute` sunt enabled.  

## MIDDLE

5) Lowercase input -> codul este acceptat case-insensitive.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: introduc `se16` (lowercase).  
   REZULTAT: browser-ul se activeaza.  

6) Mixed case input -> codul `Se16n` functioneaza.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: introduc `Se16n`.  
   REZULTAT: browser-ul se activeaza.  

7) Recovery dupa invalid -> un cod valid recupereaza starea.  
   PRECONDITIE: am introdus o tranzactie invalida (`MM03`).  
   ACTIUNE: ulterior introduc `SE16`.  
   REZULTAT: browser-ul devine ready.  

8) Controale dezactivate inainte de open -> input-urile sunt disabled.  
   PRECONDITIE: aplicatia este deschisa, nicio tranzactie activa.  
   ACTIUNE: inspectez controalele.  
   REZULTAT: `Table Name`, `Execute`, `Clear Filters` sunt disabled.  

## EXPERIENCED

9) Tranzactie goala -> browser-ul ramane inactiv.  
   PRECONDITIE: aplicatia este deschisa.  
   ACTIUNE: las campul gol si apas Enter.  
   REZULTAT: browser-ul ramane inactiv.  

10) Cod nesuportat lung -> `ZZCUSTOM_TX` nu activeaza.  
    PRECONDITIE: aplicatia este deschisa.  
    ACTIUNE: introduc `ZZCUSTOM_TX`.  
    REZULTAT: browser-ul ramane inactiv.  

11) Schimbare tranzactie -> de la SE16 la SE16N.  
    PRECONDITIE: browser-ul este activ cu SE16.  
    ACTIUNE: introduc `SE16N` si apas Enter.  
    REZULTAT: tranzactia se schimba, browser-ul ramane activ.  

12) Dublu open -> a doua activare nu strica starea.  
    PRECONDITIE: browser-ul este deja activ cu SE16.  
    ACTIUNE: apas Enter din nou pe SE16.  
    REZULTAT: browser-ul ramane activ, nicio eroare.  

13) Input field pastreaza valoarea -> campul nu se sterge dupa submit.  
    PRECONDITIE: am introdus SE16 si apasat Enter.  
    ACTIUNE: inspectez valoarea campului.  
    REZULTAT: campul contine inca `SE16`.  

14) Butonul Open este vizibil si accesibil.  
    PRECONDITIE: aplicatia este deschisa.  
    ACTIUNE: inspectez butonul `Open`.  
    REZULTAT: butonul este vizibil, enabled si are textul `Open`.  

15) Tranzactie cu spatii -> codul ` SE16 ` cu spatii functioneaza.  
    PRECONDITIE: aplicatia este deschisa.  
    ACTIUNE: introduc ` SE16 ` (cu spatii).  
    REZULTAT: browser-ul se activeaza (trim automat).  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: aplicatia este deschisa si utilizatorul nu a activat inca tranzactia.
- Actiune: introduc un cod de tranzactie valid sau invalid si folosesc Enter sau butonul `Open`.
- Rezultat: browserul devine ready pentru coduri suportate sau ramane inactiv pentru coduri invalide.
