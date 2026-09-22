# Test Suites

- `navigation/` - deschiderea tranzactiei si schimbarea tabelelor.
- `fr-parent/` - cautari in `/CFF/FR_PARENT` si extragere GUID-uri.
- `cross-table/` - reutilizare valori extrase in alt tabel.
- `entitlement/` - validari pe tabela de entitlement cu GUID extras.
- `mailcount/` - verificari pe alta tabela relationata cu `FR_GUID`.
- `fr-audit/` - verificari pe audit trail bazate pe `FR_GUID` si stari de eveniment.
- `case-notes/` - validari pe note operationale bazate pe `REFERENCE_ID`, `OWNER` si `PRIORITY`.
- `grid-and-selectors/` - innerText, multiline parsing, selectori robusti.
- `states/` - loading, no-results, clear filters.
- `query-options/` - variante, moduri de filtrare, case sensitivity si limitare de rezultate.
- `sorting-and-selection/` - sortare pe headere si semnale din selection details.

## Tipar comun scenariu (PRECONDITIE -> ACTIUNE -> REZULTAT)
- Preconditie: tranzactia este activa, tabelul sau relatia intre tabele este cunoscuta, iar datele de test sunt pregatite in mock data.
- Actiune: filtrezi, executi, extragi valori din grid, schimbi tabelul sau refolosesti valorile extrase.
- Rezultat: validezi numarul de randuri, numele tabelului, textul din celule, multiline parsing sau mesajele de stare.

### Exemple de fluxuri acoperite
- `/CFF/FR_PARENT` -> extrag `FR_GUID` si `ENT_GUID` -> `/CFF/ITM_DETAILS`
- `/CFF/FR_PARENT` -> extrag `ENT_GUID` -> `/CFF/ENTITLEMENT`
- `/CFF/FR_PARENT` -> extrag `FR_GUID` -> `/CFF/MAILCOUNT`
- `/CFF/FR_PARENT` -> extrag `FR_GUID` -> `/CFF/FR_AUDIT`
- `/CFF/FR_PARENT` -> extrag `ENT_GUID` -> `/CFF/CASE_NOTES`
- validari robuste pe coloane prin `data-column-name`
- validari de edge case pentru `00000000000000000000000000000000`
