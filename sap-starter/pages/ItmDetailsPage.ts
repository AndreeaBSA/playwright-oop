import type { Page, Locator } from "@playwright/test";
import { TablePage } from "./TablePage.js";
import { tables } from "../utils/test-data.js";
import { FrParentRow } from "../models/FrParentRow.js";
import { ItmDetailsRow } from "../models/ItmDetailsRow.js";

export class ItmDetailsPage extends TablePage {
  readonly tableName = tables.itmDetails;
  readonly columns = ["PARENT_ID", "CALLOFF", "SETUP_FR", "NWR_ITEM_ID", "REGION", "COMMENTS"];
  readonly filterPARENTID: Locator;
  readonly filterREGION: Locator;

  constructor(page: Page) {
    super(page);
    this.filterPARENTID = this.filterInput("PARENT_ID");
    this.filterREGION = this.filterInput("REGION");
  }

  async readRow(rowIndex: number): Promise<ItmDetailsRow>{
    return {
            parentId: await this.getCellText(rowIndex, "PARENT_ID"),
            callOff: await this.getCellText(rowIndex, "CALLOFF"),
            setupFr: await this.getCellText(rowIndex, "SETUP_FR"),
            region: await this.getCellText(rowIndex, "REGION"),
    }
  }


}
