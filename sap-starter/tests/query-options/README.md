# Query Options Scenarios

## BEGINNER

1) Variant preset -> o varianta completeaza filtrele relevante.  
   PRECONDITIE: tranzactia este activa si FR_PARENT este selectat.  
   ACTIUNE: aleg varianta `anchor-777`.  
   REZULTAT: filtrul ESID se completeaza cu "ESID-777", descrierea variantei apare.  

2) Executie cu variant -> varianta filtreaza corect.  
   PRECONDITIE: am selectat varianta anchor-777.  
   ACTIUNE: apas Execute.  
   REZULTAT: 1 rand returnat cu ESID = ESID-777.  

3) Max rows -> rezultatele pot fi limitate.  
   PRECONDITIE: FR_PARENT fara filtre (34 randuri).  
   ACTIUNE: setez Max Rows = 25 si execut.  
   REZULTAT: grid-ul afiseaza 25 randuri, matched count = 34.  

## MIDDLE

4) Match mode exact -> respinge potriviri partiale.  
   PRECONDITIE: FR_PARENT selectat.  
   ACTIUNE: filtrez ESID = "ESID-77" cu modul `exact`.  
   REZULTAT: empty state (No data found), deoarece nu exista ESID exact "ESID-77".  

5) Match mode contains -> accepta potriviri partiale.  
   PRECONDITIE: am obtinut empty state cu `exact`.  
   ACTIUNE: schimb la `contains` si re-execut cu ESID = "ESID-77".  
   REZULTAT: 3 randuri (ESID-777, ESID-778, ESID-779).  

6) Match mode startsWith -> filtreaza dupa prefix.  
   PRECONDITIE: FR_PARENT selectat.  
   ACTIUNE: filtrez ESID = "ESID-7" cu modul `startsWith`.  
   REZULTAT: randurile care incep cu "ESID-7" sunt returnate.  

7) Case sensitive off -> lowercase functioneaza.  
   PRECONDITIE: FR_PARENT selectat, case sensitive dezactivat.  
   ACTIUNE: filtrez ESID = "esid-777" cu modul `exact`.  
   REZULTAT: 1 rand returnat (matching case-insensitive).  

## EXPERIENCED

8) Case sensitive on -> lowercase NU mai functioneaza.  
   PRECONDITIE: FR_PARENT selectat.  
   ACTIUNE: filtrez ESID = "esid-777", activez Case Sensitive, mod `exact`.  
   REZULTAT: empty state (valoarea canonica este "ESID-777" cu uppercase).  

9) Max rows cu matched count preservation.  
   PRECONDITIE: FR_PARENT fara filtre.  
   ACTIUNE: Max Rows = 25, execut.  
   REZULTAT: result-count = "25 rows", matched-count = "34 matched", sort-state contine "Display limited".  

10) Variant reset la schimbarea tabelului -> filtrele se golesc.  
    PRECONDITIE: am selectat varianta anchor-777 pe FR_PARENT.  
    ACTIUNE: schimb la MAILCOUNT.  
    REZULTAT: varianta revine la Default, filtrele se sterg.  

11) Combinatie match mode + case sensitive + filtre -> izolare precisa.  
    PRECONDITIE: FR_PARENT selectat.  
    ACTIUNE: filtrez STATUS = "Active" cu exact + case sensitive on.  
    REZULTAT: doar randurile cu STATUS exact "Active" (nu "active" sau "ACTIVE").  

12) Variant description -> descrierea variantei apare sub selector.  
    PRECONDITIE: am selectat varianta anchor-777.  
    ACTIUNE: citesc variant-description.  
    REZULTAT: textul contine "deterministic extraction row".  

13) Max Rows ALL -> toate randurile afisate.  
    PRECONDITIE: FR_PARENT selectat.  
    ACTIUNE: setez Max Rows = ALL si execut.  
    REZULTAT: toate randurile (34) sunt afisate, fara truncare.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tabela activa are variante, filtre si suficient volum de date.
- Actiune: schimb optiunile de interogare inainte de executie.
- Rezultat: validez ca UI-ul aplica corect variantele, filtrarea si limitarile de afisare.
