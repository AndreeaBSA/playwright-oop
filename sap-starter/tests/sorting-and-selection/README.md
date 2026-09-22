# Sorting And Selection Scenarios

## BEGINNER

1) Header sorting -> click pe header sorteaza coloana.  
   PRECONDITIE: grid-ul este incarcat cu FR_PARENT.  
   ACTIUNE: click pe headerul STATUS, apoi Execute.  
   REZULTAT: sort-state arata "Sorted by STATUS (asc)".  

2) Sort direction asc -> primul rand are valoarea minima.  
   PRECONDITIE: am sortat dupa STATUS asc.  
   ACTIUNE: citesc STATUS din randul 0.  
   REZULTAT: valoarea este "Active" (prima alfabetic).  

3) Selection details empty -> panoul este gol inainte de selectie.  
   PRECONDITIE: grid-ul este incarcat, niciun rand selectat.  
   ACTIUNE: inspectez selection details.  
   REZULTAT: mesajul "Select a row" este vizibil.  

## MIDDLE

4) Direction toggle -> acelasi header inverseaza asc/desc.  
   PRECONDITIE: STATUS sortat asc.  
   ACTIUNE: click din nou pe STATUS, apoi Execute.  
   REZULTAT: sort-state = "Sorted by STATUS (desc)", primul rand = "Pending".  

5) Header attribute -> data-sort-direction reflecta directia.  
   PRECONDITIE: am sortat dupa STATUS asc.  
   ACTIUNE: inspectez atributul data-sort-direction pe headerul STATUS.  
   REZULTAT: valoarea este "asc".  

6) Selectie de rand -> click pe radio activeaza selection details.  
   PRECONDITIE: grid-ul are randuri, randul ESID-779 (blocked) este vizibil.  
   ACTIUNE: click pe row-selector pe randul 0.  
   REZULTAT: placeholder dispare, selection-grid devine vizibil.  

7) Schimbare selectie -> alt rand dezelecteaza primul.  
   PRECONDITIE: randul 0 este selectat.  
   ACTIUNE: click pe row-selector pe randul 1.  
   REZULTAT: randul 1 devine selectat, randul 0 se dezelecteaza.  

## EXPERIENCED

8) Selection signals -> semnale pentru empty GUID, multiline, blocked.  
   PRECONDITIE: am filtrat FR_PARENT dupa ESID-779 (blocked, empty GUID, multiline).  
   ACTIUNE: selectez randul 0.  
   REZULTAT: selection-signals contine "Contains empty-like GUID values.", "Contains multiline text that requires innerText parsing." si STATUS = Blocked.  

9) Selection detail per coloana -> fiecare camp apare in grid.  
   PRECONDITIE: am selectat un rand.  
   ACTIUNE: caut selection-detail cu key = "STATUS".  
   REZULTAT: valoarea afisata corespunde cu STATUS-ul randului (ex: "Blocked").  

10) Sort pe coloana numerica -> ESID sortat corect.  
    PRECONDITIE: FR_PARENT incarcat.  
    ACTIUNE: sortez dupa ESID.  
    REZULTAT: ordinea este corecta (locale-aware).  

11) Sortare nu pierde randuri -> row count-ul ramane acelasi.  
    PRECONDITIE: FR_PARENT incarcat fara filtre (34 randuri).  
    ACTIUNE: sortez dupa STATUS, re-execut.  
    REZULTAT: inca 34 randuri, doar ordinea s-a schimbat.  

12) Selection signals pentru rand normal -> fara semnale speciale.  
    PRECONDITIE: am un rand cu STATUS = Active, fara empty GUID, fara multiline.  
    ACTIUNE: selectez randul.  
    REZULTAT: selection-signals nu contine semnale de warning (sau panoul nu are signal chips).  

13) Sort + filter combinat -> sortez STATUS dupa ce am filtrat.  
    PRECONDITIE: am filtrat FR_PARENT dupa STATUS = Active.  
    ACTIUNE: sortez dupa ESID, re-execut.  
    REZULTAT: randurile Active sunt sortate dupa ESID.  

## Tipar scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: am rezultate vizibile in grid si un rand semnificativ de inspectat.
- Actiune: sortez dupa headere si selectez randuri din tabel.
- Rezultat: validez ordinea, indicatorii de sortare si sumarul de selectie.
