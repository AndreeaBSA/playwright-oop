# OOP în TypeScript pur

Exerciții de încapsulare, moștenire și polimorfism fără Playwright. Fiecare folder are un singur fișier `main.ts`, rulabil separat. După ce termini aici, aplici aceleași noțiuni în `sap-starter/pages/` (fișa PDF).

## Cum rulezi

```bash
cd vanilla-ts
npm install

npx tsx src/teorie/A1-incapsulare-private/main.ts
npx tsx src/exercitii/01-set-de-date/main.ts

npx tsc --noEmit
```

`npx tsx <fișier>` rulează un singur fișier. `npx tsc --noEmit` verifică toate fișierele din `src/` fără să le ruleze: dacă scrie erori, exercițiul nu e gata, chiar dacă `tsx` l-a rulat.

## Teoria

Fiecare demo din `src/teorie/` e un program complet. Rulează-l, apoi fă modificarea cerută și rulează din nou.

### A. Încapsulare

**A1 — `private`** (`A1-incapsulare-private`). Două clase fac același lucru; la una câmpurile sunt `private`. În `main` cineva scrie `deschis.verzi = 100` și rezumatul minte. Încearcă același lucru pe `inchis` și citește eroarea de la `npx tsc --noEmit`.

**A2 — `get` / `set` / `readonly`** (`A2-incapsulare-get-set`). Din afară `acoperire.valoare = 140` arată ca o atribuire, dar trece prin `set valoare`, care decide ce se salvează. Încearcă `acoperire.nume = "Altceva"`.

### B. Moștenire

**B1 — `extends` și `super`** (`B1-mostenire-extends-super`). `InregistrareEroare` are tot ce are `Inregistrare` plus `cod`. Constructorul subclasei cheamă `super(...)` înainte să-și pună câmpul propriu; `formateaza()` din subclasă refolosește `super.formateaza()` și adaugă doar partea nouă. Șterge linia cu `super(moment, text)` și citește eroarea.

**B2 — `protected`** (`B2-mostenire-protected`). `ListaFaraDuplicate` are nevoie să citească `randuri` din clasa de bază. Schimbă `protected` în `private` și vezi ce spune `tsc`; apoi schimbă-l în `public` și gândește-te ce poate face acum `main` cu lista.

### C. Polimorfism

**C1 — aceeași metodă, comportament diferit** (`C1-polimorfism-override`). Un singur array de tip `Coloana[]`, o singură buclă, un singur apel `afiseaza(...)`. Fiecare element răspunde după clasa lui reală, nu după tipul array-ului. Adaugă o a patra clasă `ColoanaMajuscule` și pune-o în array fără să atingi bucla.

**C2 — clasă abstractă** (`C2-polimorfism-abstract`). `Notificare` nu se poate instanția (`new Notificare("x")` nu compilează) și obligă fiecare subclasă să scrie `corp()`. Metoda `trimite()` e scrisă o singură dată, în bază, și cheamă `corp()` pe care încă nu-l cunoaște. Șterge `corp()` din `NotificareSucces` și citește eroarea.

## Exerciții

Reguli pentru toate:

- un singur fișier `main.ts` per exercițiu, clasele și codul de rulare în același fișier;
- câmpurile sunt `private` sau `protected`; din `main` se folosesc doar metode și accesori;
- `console.log` doar în partea de rulare din `main`, nu în metodele claselor;
- `npx tsc --noEmit` fără erori înainte să consideri exercițiul gata.

### 01 — `SetDeDate` (încapsulare)

Clasa `SetDeDate` primește la construire lista de coloane. Rândurile se țin într-un câmp care nu poate fi citit sau modificat din afara clasei.

- `adauga(rand: string[])` acceptă doar rânduri cu exact atâtea valori câte coloane sunt; altfel aruncă `Error` cu mesajul `Row has 2 values, expected 3` (cifrele reale).
- `numarRanduri(): number`.
- `valorile(coloana: string): string[]` întoarce valorile din coloana cerută, în ordinea adăugării.

Rulare: coloanele `ESID`, `FR_GUID`, `STATUS`; adaugă rândurile `ESID-100 / FR-1389 / Active`, `ESID-777 / FR-B777 / Pending`, `ESID-778 / FR-B778 / Active`; încearcă să adaugi `ESID-779 / FR-B779` într-un `try`/`catch` și afișează mesajul erorii.

Ieșire așteptată:

```
randuri: 3
STATUS: Active, Pending, Active
Row has 2 values, expected 3
```

### 02 — `NumeTabel` (`get` / `set` / `readonly`)

Clasa `NumeTabel` primește la construire schema (de exemplu `CFF`), care nu se mai poate schimba după aceea. Numele tabelului se dă și se citește printr-un accesor `valoare`.

- la scriere: spațiile de la capete se taie, literele devin majuscule; dacă după curățare nu rămâne nimic, se aruncă `Error("Table name cannot be empty")`;
- la citire: se întoarce numele complet, în forma `/SCHEMA/NUME`;
- `esteSetat` (accesor doar de citire) spune dacă s-a dat vreun nume valid.

Rulare: schema `CFF`; scrie `"  fr_parent "`, afișează; scrie `"mailcount"`, afișează; scrie `"   "` într-un `try`/`catch` și afișează mesajul erorii.

Ieșire așteptată:

```
/CFF/FR_PARENT
/CFF/MAILCOUNT
Table name cannot be empty
```

### 03 — `Raport` și `RaportSemnat` (`extends` / `super`)

Clasa `Raport` primește la construire un titlu. `adauga(linie: string)` pune o linie în raport; `text(): string` întoarce titlul urmat de fiecare linie pe rândul ei.

Clasa `RaportSemnat` extinde `Raport` și primește în plus autorul. `text()` întoarce textul raportului de bază plus o ultimă linie `-- autor`. Subclasa nu are acces la lista de linii și nu rescrie logica de afișare a bazei.

Rulare: `RaportSemnat` cu titlul `Rezultate suita` și autorul `andreea`; adaugă `3 teste verzi` și `1 test rosu`; afișează `text()`.

Ieșire așteptată:

```
Rezultate suita
3 teste verzi
1 test rosu
-- andreea
```

### 04 — `Numarator` și `NumaratorCuLimita` (`protected`)

Clasa `Numarator` ține o valoare care pornește de la 0. `urmatorul(): number` crește valoarea cu 1 și o întoarce.

Clasa `NumaratorCuLimita` extinde `Numarator` și primește la construire o limită. `urmatorul()` nu trece niciodată peste limită: odată atinsă, întoarce limita la fiecare apel.

Valoarea curentă trebuie să fie accesibilă subclasei, dar nu din `main`: linia `n.valoare` scrisă în `main` trebuie refuzată de `tsc`.

Rulare: un `Numarator` apelat de 3 ori, un `NumaratorCuLimita` cu limita 2 apelat de 4 ori; rezultatele fiecăruia pe o linie, separate prin spațiu.

Ieșire așteptată:

```
1 2 3
1 2 2 2
```

### 05 — `Verificari` (polimorfism prin override)

Clasa de bază `Verificare` are un nume și metoda `trece(valoare: string): boolean`. Subclasele:

- `NuEGoala` trece dacă valoarea nu e goală după tăierea spațiilor;
- `AreLungimea` primește un număr și trece dacă valoarea are exact atâtea caractere;
- `EDinLista` primește o listă de valori permise și trece dacă valoarea e printre ele.

În `main`, un singur array de tip `Verificare[]` și o singură buclă care rulează toate verificările pe fiecare valoare. În buclă nu apare niciun `instanceof` și niciun `if` pe tipul verificării.

Rulare: verificările `NuEGoala`, `AreLungimea(8)`, `EDinLista(["Active", "Pending", "Blocked", "Archived"])`; valorile `ESID-100`, `Active`, `   `.

Ieșire așteptată:

```
"ESID-100"  NuEGoala: OK  AreLungimea: OK  EDinLista: FAIL
"Active"  NuEGoala: OK  AreLungimea: FAIL  EDinLista: OK
"   "  NuEGoala: FAIL  AreLungimea: FAIL  EDinLista: FAIL
```

### 06 — `Exportatoare` (clasă abstractă)

Clasa abstractă `Exportator` are:

- `extensie`, pe care fiecare subclasă e obligată s-o dea (`csv`, `json`, `txt`);
- `converteste(randuri: string[][]): string`, pe care fiecare subclasă e obligată s-o scrie;
- `numeFisier(baza: string): string`, scrisă o singură dată în bază, care întoarce `baza.extensie`.

Subclasele: `ExportatorCsv` (valorile unui rând separate prin virgulă, un rând pe linie), `ExportatorJson` (`JSON.stringify` pe toate rândurile), `ExportatorTabelText` (valorile separate prin ` | `, un rând pe linie).

Rulare: rândurile `ESID-100 / Active` și `ESID-777 / Pending`; o buclă peste `Exportator[]` care afișează numele fișierului (baza `raport`) și conținutul.

Ieșire așteptată:

```
raport.csv
ESID-100,Active
ESID-777,Pending
raport.json
[["ESID-100","Active"],["ESID-777","Pending"]]
raport.txt
ESID-100 | Active
ESID-777 | Pending
```

Gata când: dacă ștergi `converteste` dintr-o subclasă, `npx tsc --noEmit` refuză.

## Probleme frecvente

- `Property 'x' is private and only accessible within class` — încerci să atingi din `main` un câmp `private`. Asta e încapsularea care funcționează; treci prin metodă sau accesor.
- `Constructors for derived classes must contain a 'super' call` — constructorul subclasei trebuie să cheme `super(...)` înainte de orice `this.`.
- `Non-abstract class 'X' does not implement inherited abstract member 'y'` — subclasa unei clase abstracte a uitat o metodă obligatorie.
- `Cannot create an instance of an abstract class` — `new` pe clasa abstractă; instanțiezi o subclasă.
- `tsx` rulează, dar `tsc --noEmit` dă erori — `tsx` ignoră tipurile. Poarta e `tsc`.
