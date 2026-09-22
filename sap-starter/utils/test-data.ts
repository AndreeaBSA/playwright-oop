import type { ExtractedValues } from "../models/ExtractedValues.js";
import type { TableQuery } from "../models/TableQuery.js";

export const routes = {
  home: "/",
};

export const transactions = {
  se16: "SE16",
  se16n: "SE16N",
  mm03: "MM03",
};

export const tables = {
  frParent: "/CFF/FR_PARENT",
  itmDetails: "/CFF/ITM_DETAILS",
  entitlement: "/CFF/ENTITLEMENT",
  mailCount: "/CFF/MAILCOUNT",
  frAudit: "/CFF/FR_AUDIT",
  caseNotes: "/CFF/CASE_NOTES",
};

export const emptyGuid = "00000000000000000000000000000000";

export const columnsFrParent = {
  ESID: "ESID",
  FR_GUID: "FR_GUID",
  ENT_GUID: "ENT_GUID",
  STATUS: "STATUS",
  DESCRIPTION: "DESCRIPTION",
};

export const columnsItmDetails = {
  PARENT_ID: "PARENT_ID",
  CALLOFF: "CALLOFF",
  SETUP_FR: "SETUP_FR",
  NWR_ITEM_ID: "NWR_ITEM_ID",
  REGION: "REGION",
  COMMENTS: "COMMENTS",
};

export const filters = {
  ESID: "ESID",
  FR_GUID: "FR_GUID",
  ENT_GUID: "ENT_GUID",
  STATUS: "STATUS",
  DESCRIPTION: "DESCRIPTION",
  Parent_ID: "PARENT_ID",
  CALLOFF: "CALLOFF",
  Region: "REGION",
};

export const automationAnchor = {
  esid: "ESID-777",
  expectedValues: {
    frGuid: "FR00000000000000000000000000A555",
    entGuid: "EN00000000000000000000000000B777",
  } satisfies ExtractedValues,
};

export const secondaryAnchor = {
  esid: "ESID-778",
  expectedValues: {
    frGuid: "FR00000000000000000000000000A556",
    entGuid: "EN00000000000000000000000000B778",
  } satisfies ExtractedValues,
};

export const tertiaryAnchor = {
  esid: "ESID-779",
  expectedValues: {
    frGuid: "FR00000000000000000000000000A557",
    entGuid: emptyGuid,
  } satisfies ExtractedValues,
};

export const knownQueries: Record<string, TableQuery> = {
  frParentByEsid: {
    transaction: transactions.se16,
    tableName: tables.frParent,
    filters: {
      ESID: automationAnchor.esid,
    },
  },
  itmByExtractedParent: {
    transaction: transactions.se16,
    tableName: tables.itmDetails,
  },

};
