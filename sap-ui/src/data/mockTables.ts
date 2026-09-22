import type { GenericRow, TableDefinition, TableVariant } from "../types";
import { EMPTY_GUID } from "../utils/filtering";

const longDescriptions = [
  "Primary framework record with regional carry-forward logic and audit notes kept for reconciliation.",
  "Follow-up framework row used for automation practice when similar descriptions appear in consecutive records.",
  "Escalated record for support teams.\nContains multiline notes for parsing.",
  "Legacy migration row with intentionally long free-text details that wrap over multiple lines in the grid.",
  "Production-like row with copied SAP note summary, downstream routing and a delayed batch annotation for debugging.",
];

const commentVariants = [
  "Created by nightly interface.\nCheck second line for parser coverage.",
  "Created by nightly interface. Check second line for parser coverage.",
  "Manual correction pending approver sign-off.",
  "Manual correction pending approver sign off.",
  "Similar text value for selector challenge.",
  "Similar text value for selector challenge..",
  "Payload resent after outbound RFC timeout.\nValidate multiline split and whitespace trimming.",
];

function pad(value: number): string {
  return String(value).padStart(4, "0");
}

function makeGuid(prefix: string, value: number): string {
  const suffix = value.toString(16).toUpperCase().padStart(28, "0");
  return `${prefix}${suffix}`.slice(0, 32);
}

function makeVariants(definitions: Array<[string, string, string, Record<string, string>]>): TableVariant[] {
  return definitions.map(([id, label, description, filters]) => ({
    id,
    label,
    description,
    filters,
  }));
}

const frParentRows: GenericRow[] = Array.from({ length: 34 }, (_, index) => {
  const id = index + 1;
  const frGuid = makeGuid("FR", 5000 + id);
  const entGuid = id % 7 === 0 ? EMPTY_GUID : makeGuid("EN", 8000 + id);

  return {
    ESID: `ESID-${Math.floor(index / 4) + 100}`,
    FR_GUID: frGuid,
    ENT_GUID: entGuid,
    STATUS: ["Active", "Pending", "Blocked", "Closed", "Archived"][index % 5],
    DESCRIPTION:
      id === 3
        ? "Pricing agreement copied from source contract.\nContains follow-up handling instructions."
        : id === 11
          ? "Pricing agreement copied from source contract.\nContains follow up handling instructions."
          : id === 16
            ? "Outbound framework row with trailing spaces preserved for troubleshooting.   \nSecond line mirrors production comments."
            : longDescriptions[index % longDescriptions.length],
  };
});

const automationAnchorIndex = 5;
const automationFrGuid = "FR00000000000000000000000000A555";
const automationEntGuid = "EN00000000000000000000000000B777";
const secondaryAnchorIndex = 9;
const secondaryFrGuid = "FR00000000000000000000000000A556";
const secondaryEntGuid = "EN00000000000000000000000000B778";
const tertiaryAnchorIndex = 13;
const tertiaryFrGuid = "FR00000000000000000000000000A557";
const tertiaryEntGuid = EMPTY_GUID;
const quaternaryAnchorIndex = 17;
const quaternaryFrGuid = "FR00000000000000000000000000A558";
const quaternaryEntGuid = "EN00000000000000000000000000B779";

frParentRows[automationAnchorIndex] = {
  ESID: "ESID-777",
  FR_GUID: automationFrGuid,
  ENT_GUID: automationEntGuid,
  STATUS: "Active",
  DESCRIPTION:
    "Automation anchor row for Playwright extraction.\nUse this ESID to capture FR_GUID and ENT_GUID for follow-up table queries.",
};

frParentRows[secondaryAnchorIndex] = {
  ESID: "ESID-778",
  FR_GUID: secondaryFrGuid,
  ENT_GUID: secondaryEntGuid,
  STATUS: "Pending",
  DESCRIPTION:
    "Secondary automation row for alternate validation.\nUseful when tests need a different entitlement branch.",
};

frParentRows[tertiaryAnchorIndex] = {
  ESID: "ESID-779",
  FR_GUID: tertiaryFrGuid,
  ENT_GUID: tertiaryEntGuid,
  STATUS: "Blocked",
  DESCRIPTION:
    "Blocked automation row with empty-like entitlement GUID.\nUseful for negative and edge-case selectors.",
};

frParentRows[quaternaryAnchorIndex] = {
  ESID: "ESID-780",
  FR_GUID: quaternaryFrGuid,
  ENT_GUID: quaternaryEntGuid,
  STATUS: "Archived",
  DESCRIPTION:
    "Archived production mirror row.\nCross-check this against audit and case note tables when validating historical scenarios.",
};

const itmDetailsRows: GenericRow[] = frParentRows.flatMap((row, index) => {
  const recordCount = index % 3 === 0 ? 2 : index % 5 === 0 ? 3 : 1;

  return Array.from({ length: recordCount }, (_, detailIndex) => {
    const detailId = index * 3 + detailIndex + 1;
    return {
      PARENT_ID: row.FR_GUID,
      CALLOFF:
        detailId % 8 === 0
          ? EMPTY_GUID
          : detailIndex === 0
            ? `CALL-${pad((detailId % 12) + 1)}`
            : `CALL-${pad((detailId % 6) + 1)}`,
      SETUP_FR: detailId % 5 === 0 ? EMPTY_GUID : makeGuid("SF", 12000 + detailId),
      NWR_ITEM_ID: detailId % 9 === 0 ? EMPTY_GUID : `NWR-${pad(700 + (detailId % 18))}`,
      REGION: ["EMEA", "AMER", "APJ", "LATAM", "GLOBAL"][detailId % 5],
      COMMENTS:
        detailId === 4
          ? "Important linked value is in NWR_ITEM_ID, not the first visible cell.\nUse column-aware selectors."
          : detailId === 18
            ? "Outbound retry succeeded after third attempt.\nInspect the second line for operational context."
            : commentVariants[detailId % commentVariants.length],
    };
  });
});

itmDetailsRows.push(
  {
    PARENT_ID: automationEntGuid,
    CALLOFF: EMPTY_GUID,
    SETUP_FR: `SETUP:${automationFrGuid}`,
    NWR_ITEM_ID: EMPTY_GUID,
    REGION: "EMEA",
    COMMENTS:
      "Deterministic automation row.\nSplit this multiline cell, then validate CALLOFF, SETUP_FR, and NWR_ITEM_ID by column name.",
  },
  {
    PARENT_ID: automationEntGuid,
    CALLOFF: "CALL-ALT-777",
    SETUP_FR: `FOLLOWUP:${automationFrGuid}`,
    NWR_ITEM_ID: "NWR-0777",
    REGION: "EMEA",
    COMMENTS:
      "Sibling row with the same PARENT_ID.\nUseful when first() or last() would be misleading.",
  },
  {
    PARENT_ID: automationEntGuid,
    CALLOFF: "CALL-EMEA-777",
    SETUP_FR: `SETUP:${automationFrGuid}:REV2`,
    NWR_ITEM_ID: "NWR-1777",
    REGION: "EMEA",
    COMMENTS:
      "Third related row for the same entitlement.\nUseful for count assertions and row-content filtering.",
  },
  {
    PARENT_ID: secondaryEntGuid,
    CALLOFF: "CALL-SECONDARY-778",
    SETUP_FR: `SETUP:${secondaryFrGuid}`,
    NWR_ITEM_ID: EMPTY_GUID,
    REGION: "AMER",
    COMMENTS:
      "Secondary entitlement relation.\nContains alternate region and empty-like NWR value.",
  },
  {
    PARENT_ID: secondaryFrGuid,
    CALLOFF: "CALL-FR-778",
    SETUP_FR: `SETUP:${secondaryFrGuid}:FR`,
    NWR_ITEM_ID: "NWR-2778",
    REGION: "APJ",
    COMMENTS:
      "Parent linked by FR_GUID instead of ENT_GUID.\nUseful to prove table semantics matter.",
  },
  {
    PARENT_ID: quaternaryEntGuid,
    CALLOFF: "CALL-ARCH-780",
    SETUP_FR: `SETUP:${quaternaryFrGuid}`,
    NWR_ITEM_ID: "NWR-3780",
    REGION: "GLOBAL",
    COMMENTS:
      "Archived entitlement branch kept for reference.\nProduction-like data often remains queryable after closure.",
  },
);

const entitlementRows: GenericRow[] = frParentRows.map((row, index) => ({
  ENT_GUID: row.ENT_GUID,
  ENT_TYPE: ["Premium", "Standard", "Legacy", "Trial", "Migration"][index % 5],
  ACTIVE: row.ENT_GUID === EMPTY_GUID ? "N" : index % 5 === 0 ? "N" : "Y",
  CREATED_AT: `2025-${String((index % 9) + 1).padStart(2, "0")}-${String((index % 27) + 1).padStart(2, "0")} 0${index % 9}:3${index % 6}`,
}));

const mailCountRows: GenericRow[] = frParentRows.flatMap((row, index) => {
  const duplicates = index % 4 === 0 ? 2 : 1;

  return Array.from({ length: duplicates }, (_, duplicateIndex) => ({
    MAIL_ID: `MAIL-${pad(900 + index)}${duplicateIndex === 0 ? "" : "-R"}`,
    PARENT_ID: row.FR_GUID,
    COUNT: index % 6 === 0 ? 0 : ((index + duplicateIndex) % 4) + 1,
    OWNER: ["MARTA", "MARTIN", "MARTA", "OPS_BATCH", "OPS-BATCH", "INT_MONITOR"][index % 6],
    STATUS: index % 6 === 0 ? "Queued" : index % 3 === 0 ? "Sent" : duplicateIndex === 1 ? "Error" : "Ready",
  }));
});

mailCountRows.push(
  {
    MAIL_ID: "MAIL-ANCHOR-777-A",
    PARENT_ID: automationFrGuid,
    COUNT: 3,
    OWNER: "MARTA",
    STATUS: "Ready",
  },
  {
    MAIL_ID: "MAIL-ANCHOR-777-B",
    PARENT_ID: automationFrGuid,
    COUNT: 0,
    OWNER: "OPS_BATCH",
    STATUS: "Queued",
  },
  {
    MAIL_ID: "MAIL-ANCHOR-778-A",
    PARENT_ID: secondaryFrGuid,
    COUNT: 5,
    OWNER: "MARTIN",
    STATUS: "Sent",
  },
  {
    MAIL_ID: "MAIL-ANCHOR-780-A",
    PARENT_ID: quaternaryFrGuid,
    COUNT: 1,
    OWNER: "INT_MONITOR",
    STATUS: "Error",
  },
);

const auditRows: GenericRow[] = frParentRows.flatMap((row, index) => [
  {
    AUDIT_ID: `AUD-${pad(4000 + index * 2)}`,
    FR_GUID: row.FR_GUID,
    EVENT_TYPE: ["CREATE", "UPDATE", "REPROCESS", "ARCHIVE"][index % 4],
    CHANGED_BY: ["WF_BATCH", "SUPPORT_A", "SUPPORT_B", "OPS_USER"][index % 4],
    CHANGED_AT: `2025-${String((index % 10) + 1).padStart(2, "0")}-${String((index % 20) + 1).padStart(2, "0")} 08:${String(index % 60).padStart(2, "0")}`,
    DETAILS:
      index % 3 === 0
        ? "Field STATUS changed from Pending to Active.\nCorrelate with FR_PARENT and MAILCOUNT for follow-up."
        : "Workflow event persisted from production support replay.",
  },
  {
    AUDIT_ID: `AUD-${pad(4001 + index * 2)}`,
    FR_GUID: row.FR_GUID,
    EVENT_TYPE: index % 5 === 0 ? "ERROR" : "VALIDATE",
    CHANGED_BY: ["WF_BATCH", "SUPPORT_A", "SUPPORT_B", "OPS_USER"][(index + 1) % 4],
    CHANGED_AT: `2025-${String((index % 10) + 1).padStart(2, "0")}-${String((index % 20) + 1).padStart(2, "0")} 17:${String((index * 2) % 60).padStart(2, "0")}`,
    DETAILS:
      index === automationAnchorIndex
        ? "Automation anchor audit row.\nThis is useful when tests need to join FR_PARENT results with production-style audit history."
        : "Validation event completed. Review the second audit row when duplicate FR_GUID entries exist.",
  },
]);

auditRows.push({
  AUDIT_ID: "AUD-ANCHOR-780",
  FR_GUID: quaternaryFrGuid,
  EVENT_TYPE: "RESTORE",
  CHANGED_BY: "OPS_USER",
  CHANGED_AT: "2025-12-18 21:45",
  DETAILS: "Archived row restored temporarily for legal hold review.\nUseful for historical production scenarios.",
});

const caseNoteRows: GenericRow[] = frParentRows.map((row, index) => ({
  CASE_ID: `CASE-${pad(6000 + index)}`,
  REFERENCE_ID: row.ENT_GUID,
  NOTE_TYPE: ["Customer", "Operations", "Finance", "Technical"][index % 4],
  OWNER: ["ANA", "BOGDAN", "MIRA", "ONCALL"][index % 4],
  PRIORITY: ["Low", "Medium", "High", "Critical"][index % 4],
  NOTE_TEXT:
    index % 4 === 0
      ? "Customer follow-up requested.\nVerify entitlement state before outbound mail is resent."
      : "Linked case note copied from production issue timeline.",
}));

caseNoteRows.push(
  {
    CASE_ID: "CASE-ANCHOR-777",
    REFERENCE_ID: automationEntGuid,
    NOTE_TYPE: "Technical",
    OWNER: "ONCALL",
    PRIORITY: "Critical",
    NOTE_TEXT:
      "Automation entitlement note.\nContains the same reference used in ITM_DETAILS and can drive chained end-to-end scenarios.",
  },
  {
    CASE_ID: "CASE-ANCHOR-779",
    REFERENCE_ID: tertiaryEntGuid,
    NOTE_TYPE: "Operations",
    OWNER: "ANA",
    PRIORITY: "High",
    NOTE_TEXT: "Blocked scenario with empty-like entitlement GUID.\nUseful for robust negative-path selectors.",
  },
);

export const mockTables: Record<string, TableDefinition> = {
  "/CFF/FR_PARENT": {
    name: "/CFF/FR_PARENT",
    description: "Framework parent records used to derive FR and entitlement GUID values.",
    columns: ["ESID", "FR_GUID", "ENT_GUID", "STATUS", "DESCRIPTION"],
    filterFields: [
      { key: "ESID", label: "ESID", placeholder: "Filter by ESID" },
      { key: "FR_GUID", label: "FR GUID", placeholder: "Filter by FR_GUID" },
      { key: "STATUS", label: "Status", placeholder: "Filter by STATUS" },
    ],
    variants: makeVariants([
      ["default", "Default", "No preset filters.", {}],
      ["anchor-777", "Automation ESID-777", "Loads the deterministic extraction row.", { ESID: "ESID-777" }],
      ["blocked", "Blocked Rows", "Focus on blocked framework rows.", { STATUS: "Blocked" }],
      ["archived", "Archived Rows", "Focus on archived production-like rows.", { STATUS: "Archived" }],
    ]),
    rows: frParentRows,
  },
  "/CFF/ITM_DETAILS": {
    name: "/CFF/ITM_DETAILS",
    description: "Item detail records linked to parent IDs.",
    columns: ["PARENT_ID", "CALLOFF", "SETUP_FR", "NWR_ITEM_ID", "REGION", "COMMENTS"],
    filterFields: [
      { key: "PARENT_ID", label: "Parent ID", placeholder: "Filter by PARENT_ID" },
      { key: "CALLOFF", label: "Calloff", placeholder: "Filter by CALLOFF" },
      { key: "REGION", label: "Region", placeholder: "Filter by REGION" },
    ],
    variants: makeVariants([
      ["default", "Default", "No preset filters.", {}],
      ["ent-anchor", "ENT Anchor", "Filters the deterministic entitlement-driven rows.", { PARENT_ID: automationEntGuid }],
      ["empty-calloff", "Empty GUID CALLOFF", "Rows where CALLOFF is the empty-like GUID.", { CALLOFF: EMPTY_GUID }],
      ["emea", "EMEA", "Rows for the EMEA region.", { REGION: "EMEA" }],
    ]),
    rows: itmDetailsRows,
  },
  "/CFF/ENTITLEMENT": {
    name: "/CFF/ENTITLEMENT",
    description: "Entitlement records keyed by entitlement GUID.",
    columns: ["ENT_GUID", "ENT_TYPE", "ACTIVE", "CREATED_AT"],
    filterFields: [
      { key: "ENT_GUID", label: "Entitlement GUID", placeholder: "Filter by ENT_GUID" },
      { key: "ENT_TYPE", label: "Entitlement Type", placeholder: "Filter by ENT_TYPE" },
      { key: "ACTIVE", label: "Active", placeholder: "Filter by ACTIVE" },
    ],
    variants: makeVariants([
      ["default", "Default", "No preset filters.", {}],
      ["inactive", "Inactive", "Inactive entitlements only.", { ACTIVE: "N" }],
      ["premium", "Premium", "Premium entitlement rows.", { ENT_TYPE: "Premium" }],
      ["anchor-ent", "Automation ENT", "Loads the deterministic entitlement anchor.", { ENT_GUID: automationEntGuid }],
    ]),
    rows: entitlementRows,
  },
  "/CFF/MAILCOUNT": {
    name: "/CFF/MAILCOUNT",
    description: "Mail processing counters related to parent IDs.",
    columns: ["MAIL_ID", "PARENT_ID", "COUNT", "OWNER", "STATUS"],
    filterFields: [
      { key: "PARENT_ID", label: "Parent ID", placeholder: "Filter by PARENT_ID" },
      { key: "OWNER", label: "Owner", placeholder: "Filter by OWNER" },
      { key: "STATUS", label: "Status", placeholder: "Filter by STATUS" },
    ],
    variants: makeVariants([
      ["default", "Default", "No preset filters.", {}],
      ["queued", "Queued", "Rows waiting in queue.", { STATUS: "Queued" }],
      ["errors", "Errors", "Rows with delivery errors.", { STATUS: "Error" }],
      ["anchor-fr", "Automation FR", "Rows for the deterministic FR_GUID anchor.", { PARENT_ID: automationFrGuid }],
    ]),
    rows: mailCountRows,
  },
  "/CFF/FR_AUDIT": {
    name: "/CFF/FR_AUDIT",
    description: "Audit trail records correlated by FR_GUID.",
    columns: ["AUDIT_ID", "FR_GUID", "EVENT_TYPE", "CHANGED_BY", "CHANGED_AT", "DETAILS"],
    filterFields: [
      { key: "FR_GUID", label: "FR GUID", placeholder: "Filter by FR_GUID" },
      { key: "EVENT_TYPE", label: "Event Type", placeholder: "Filter by EVENT_TYPE" },
      { key: "CHANGED_BY", label: "Changed By", placeholder: "Filter by CHANGED_BY" },
    ],
    variants: makeVariants([
      ["default", "Default", "No preset filters.", {}],
      ["errors", "Errors", "Audit errors only.", { EVENT_TYPE: "ERROR" }],
      ["archive", "Archive Events", "Archived or restored rows.", { EVENT_TYPE: "ARCH" }],
      ["anchor-fr", "Automation FR", "Audit history for the deterministic FR row.", { FR_GUID: automationFrGuid }],
    ]),
    rows: auditRows,
  },
  "/CFF/CASE_NOTES": {
    name: "/CFF/CASE_NOTES",
    description: "Operational case notes linked by reference IDs.",
    columns: ["CASE_ID", "REFERENCE_ID", "NOTE_TYPE", "OWNER", "PRIORITY", "NOTE_TEXT"],
    filterFields: [
      { key: "REFERENCE_ID", label: "Reference ID", placeholder: "Filter by REFERENCE_ID" },
      { key: "OWNER", label: "Owner", placeholder: "Filter by OWNER" },
      { key: "PRIORITY", label: "Priority", placeholder: "Filter by PRIORITY" },
    ],
    variants: makeVariants([
      ["default", "Default", "No preset filters.", {}],
      ["critical", "Critical", "Critical case notes only.", { PRIORITY: "Critical" }],
      ["oncall", "Oncall", "Notes owned by ONCALL.", { OWNER: "ONCALL" }],
      ["anchor-ent", "Automation ENT", "Case notes for the deterministic entitlement anchor.", { REFERENCE_ID: automationEntGuid }],
    ]),
    rows: caseNoteRows,
  },
};

export const tableNames = Object.keys(mockTables);
