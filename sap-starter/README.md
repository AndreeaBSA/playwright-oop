# SAP Starter Playwright Project

Acest folder este punctul de plecare pentru exercitii. Structura urmeaza varianta `sap-final`, dar suitele sunt lasate intentionat neimplementate.

## Scop
- completezi Page Object-urile
- scrii scenarii in `tests/`
- rulezi independent de `sap-final`

## Ce vei construi aici
- navigare in tranzactii `SE16` / `SE16N`
- filtrare pe `/CFF/FR_PARENT`, `/CFF/ITM_DETAILS`, `/CFF/ENTITLEMENT`, `/CFF/MAILCOUNT`
- extragere si refolosire de valori precum `FR_GUID`, `ENT_GUID`, `PARENT_ID`
- validari pe grid, row count, multiline text, loading state si no-results
- exercitii cu selectori robusti pentru Playwright

## Suite recomandate
- `navigation/` - activare tranzactie si schimbare intre tabele
- GUID-uri
- `cross-table/` - reutilizare GUID-u`fr-parent/` - filtrare dupa `ESID` si extragere de ri in alte tabele
- `entitlement/` - verificari pe `ENT_TYPE` si `ACTIVE`
- `mailcount/` - validari pe `COUNT`, `OWNER`, `STATUS`
- `grid-and-selectors/` - `innerText`, split pe newline, selectori pe coloane
- `states/` - loading, empty, clear filters

## Ordine recomandata

Rezolva suitele in ordinea aceasta:

1. `command-bar`
2. `navigation`
3. `table-selection`
4. `helper-panel`
5. `states`
6. `fr-parent`
7. `grid-and-selectors`
8. `cross-table`
9. `entitlement`
10. `mailcount`
11. `fr-audit`
12. `case-notes`
13. `itm-details`
14. `query-options`
15. `sorting-and-selection`

De ce in ordinea asta:

- primele suite te invata cum pornesti UI-ul si cum executi un tabel
- apoi inveti sa citesti corect grid-ul si sa extragi chei tehnice
- dupa aceea treci la relatii intre tabele
- la final rezolvi scenarii mai apropiate de productie, cum ar fi sortare, variante si selection details

## Hinturi De Selectori

Foloseste selectori stabili, nu selectori fragili.

Cele mai bune optiuni in acest proiect sunt:

- `getByLabel(...)` pentru inputuri si select-uri
- `getByRole(...)` pentru butoane, checkbox-uri si controale semantice
- `data-column-name` pentru celule si headere din grid
- `data-testid` doar ca fallback, nu ca prima alegere

Exemple bune:

- `page.getByLabel("Transaction")`
- `page.getByLabel("Table Name")`
- `page.getByRole("button", { name: "Execute" })`
- `page.getByRole("button", { name: "Open" })`
- `row.locator('[data-column-name="FR_GUID"]')`

Pentru tabele:

- identifica randul dupa structura de tabel si `data-row-index`
- identifica selectorul de rand prin `input[type="radio"]`
- identifica o celula dupa combinatie de `row + column`

Strategie buna:

1. gasesti randul potrivit
2. citesti coloana potrivita
3. validezi valoarea exacta

Evita pe cat posibil:

- selectori bazati doar pe text lung
- selectori de tip `nth-child`
- selectori care depind de ordine vizuala instabila
- `first()` si `last()` daca nu ai demonstrat mai intai ca sunt sigure

## Hinturi Practice

- incepe cu Page Object-urile din `pages/`, nu direct cu testele
- extrage intr-un helper secventa comuna de deschidere a tranzactiei
- dupa fiecare `Execute`, verifica si loading-ul, nu doar rezultatul final
- cand lucrezi cross-table, salveaza mai intai cheia extrasa intr-o variabila
- pentru multiline text, citeste `innerText()` si imparte rezultatul pe `\n`
- pentru valori speciale, cauta explicit `00000000000000000000000000000000`
- daca sortezi, verifica atat indicatorul de sortare, cat si ordinea efectiva din grid

## Regula Simpla Pentru Fiecare Test

1. Preconditie: ce trebuie sa fie deja deschis sau selectat
2. Actiune: ce completezi, pe ce apesi, ce executi
3. Rezultat: ce verifici exact in UI

## Cum Sa Abordezi Proiectul

Nu sari direct la scenarii cross-table sau la cele cu sortare daca nu ai rezolvat mai intai:

- activarea tranzactiei
- selectia tabelului
- executia interogarii
- citirea valorilor din grid

Scopul nu este doar sa "faci testele sa treaca", ci sa inveti:

- cum gandesti un scenariu de test
- cum alegi selectori robusi
- cum extragi valori dintr-un tabel si le refolosesti
- cum verifici relatii intre mai multe tabele
- cum tratezi edge cases reale

## Regula De Aur

Pentru fiecare test, gandeste asa:

1. Preconditie
Ce trebuie sa fie deja deschis sau selectat?

2. Actiune
Ce completezi? Ce apesi? Ce executi?

3. Rezultat
Ce verifici exact? Un text? Un numar de randuri? O valoare intr-o celula? Un state din UI?

## Hinturi Generale

### 1. Nu incepe cu testul, incepe cu pagina

Inainte sa scrii testele, completeaza Page Object-urile din `pages/`.

Hint:
- cauta mai intai elementele stabile din UI dupa label si role
- daca lucrezi cu tabele, foloseste si `data-column-name`
- foloseste `data-testid` doar daca nu ai o alternativa mai apropiata de aplicatii reale
- evita selectori fragili precum texte lungi sau pozitii absolute

### 2. Foloseste un helper comun pentru deschiderea tranzactiei

Multe teste incep la fel:

- deschizi aplicatia
- introduci `SE16` sau `SE16N`
- verifici ca browserul este activ

Hint:
- pune acest flux intr-o functie reutilizabila
- daca vezi cod repetat in multe teste, probabil trebuie extras

### 3. Pentru tabele, gandeste in chei

Nu toate coloanele sunt la fel de importante.

Hint:
- cauta coloana care identifica randul
- diferentiaza intre chei tehnice si valori business
- verifica mai intai cheia, apoi celelalte coloane

Exemple de intrebari bune:

- ce coloana identifica randul?
- ce filtru intoarce exact un rand?
- ce filtru intoarce mai multe randuri?

### 4. Cand extragi o valoare, pastreaz-o explicit

In scenariile cross-table nu hardcoda imediat tot.

Hint:
- citeste valoarea din grid
- salveaz-o intr-o variabila
- refoloseste acea variabila in testul urmator sau in aceeasi secventa

Acesta este unul dintre cele mai importante skill-uri din proiect.

### 5. Nu verifica doar ca "se vede ceva"

Evita assertii slabe.

Mai bine:

- verifica `current table name`
- verifica `result count`
- verifica exact o celula dupa `row + column`
- verifica un mesaj clar de stare

Mai slab:

- "tabelul exista"
- "pagina contine text"

### 6. Ai grija la multiline text

Unele celule contin linii multiple.

Hint:
- `innerText()` este mai potrivit decat `textContent()` in multe scenarii de UI
- dupa ce citesti textul, imparte-l pe `\n`
- valideaza liniile separat daca scenariul cere asta

### 7. Edge cases sunt importante

Nu te opri la happy path.

Hint:
- cauta valori goale sau empty-like GUID
- cauta filtre care nu intorc rezultate
- verifica stari precum `Blocked`, `Queued`, `Critical`, `ERROR`

In proiectele reale, exact aici apar multe bug-uri.

### 8. Pentru sorting, verifica doua lucruri

Cand sortezi dupa un header:

- verifica indicatorul de sortare
- verifica ordinea efectiva a randurilor

Hint:
- nu presupune ca doar click-ul pe header e suficient ca sa demonstrezi corectitudinea
- compara valori din primele randuri dupa schimbarea sortarii

### 9. Pentru selection, verifica si panoul asociat

Daca alegi un rand, nu verifica doar radiobutton-ul.

Hint:
- vezi daca selection details se schimba
- cauta semnale precum multiline, blocked state, empty-like GUID

### 10. Daca un test devine greu, probabil ii lipseste un helper

Semne ca trebuie sa extragi un helper:

- repeti aceeasi secventa de pasi in mai multe teste
- repeti aceeasi logica de citire a unei celule
- repeti aceeasi logica de filtrare sau executie

## Hinturi Pe Suite

### `command-bar`

Hint:
- concentreaza-te pe activarea tranzactiei
- verifica starea browserului si enable/disable pe controale

### `navigation`

Hint:
- dupa schimbarea tabelului, verifica nu doar numele, ci si ca datele chiar s-au schimbat

### `table-selection`

Hint:
- un tabel bun de inceput este `/CFF/FR_PARENT`
- observa cum se schimba filtrele cand selectezi alt tabel

### `helper-panel`

Hint:
- helper panel-ul este bun pentru assertii de context
- verifica tranzactia, tabela selectata si filtrele active

### `states`

Hint:
- aici conteaza mult secventa: execute -> loading -> rezultat sau empty
- nu sari direct la ultimul assert

### `fr-parent`

Hint:
- aceasta este tabela ta de plecare
- de aici extragi valori utile pentru multe alte suite

### `grid-and-selectors`

Hint:
- invata foarte bine diferenta dintre `row text`, `cell by column` si `selector robust`

### `cross-table`

Hint:
- nu hardcoda din prima valorile daca scenariul cere extragere
- citeste din `FR_PARENT`, apoi refoloseste

### `entitlement`

Hint:
- verifica atat cheia (`ENT_GUID`), cat si starea (`ACTIVE`) si tipul (`ENT_TYPE`)

### `mailcount`

Hint:
- aici apar duplicate, statusuri si filtre combinate
- nu presupune ca owner-ul sau statusul sunt unice

### `fr-audit`

Hint:
- gandeste tabela ca istoric operational
- verifica evenimente si detalii multiline

### `case-notes`

Hint:
- cauta corelatia dintre `REFERENCE_ID` si contextul operational
- prioritatea si owner-ul sunt bune pentru filtre combinate

### `itm-details`

Hint:
- aici conteaza sa intelegi semantica: ce vine din `ENT_GUID` si ce vine din `FR_GUID`

### `query-options`

Hint:
- nu verifica doar filtrul; verifica si efectul lui
- pentru `max rows`, compara `result count` cu `matched count`

### `sorting-and-selection`

Hint:
- aceasta suita e mai usoara dupa ce stapanesti deja grid-ul
- combina verificari de header, ordine si selection details

## Capcane Frecvente

- folosesti selectori prea generali
- verifici doar primul rand fara sa stii de ce este primul
- confunzi `FR_GUID` cu `ENT_GUID`
- faci assertii pe text complet cand ar fi mai stabil sa verifici o singura coloana
- sari peste `loading`
- te bazezi pe ordine implicita fara sa verifici sortarea

## Cand Sa Te Uiti In `sap-final`

Uita-te in `sap-final` doar dupa ce:

- ai incercat singur
- ai blocat o idee clara, nu tot exercitiul
- vrei sa compari structura unei solutii, nu doar sa copiezi

## Obiectivul Final

La final, ar trebui sa poti raspunde singur la intrebarea:

"Cum testez corect un tabel SAP-like, cum extrag date din el si cum demonstrez ca acele date sunt corecte si relationate cu alte tabele?"

## Tipar comun scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: deschizi UI-ul, activezi tranzactia si alegi tabelul de start.
- Actiune: introduci filtre, apesi Execute sau Enter, citesti valori din grid si le refolosesti.
- Rezultat: validezi valori exacte in celule, numarul de randuri, helper panel-ul si state-urile UI.

## Rulare
Din acest folder:

```bash
npm install
npx playwright test
```
