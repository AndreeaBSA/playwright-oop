import { test as base, expect } from "@playwright/test";
import { CommandBarPage } from "../pages/CommandBarPage.js";
import { EntitlementPage } from "../pages/EntitlementPage.js";
import { FrParentPage } from "../pages/FrParentPage.js";
import { HelperPanelPage } from "../pages/HelperPanelPage.js";
import { ItmDetailsPage } from "../pages/ItmDetailsPage.js";
import { MailCountPage } from "../pages/MailCountPage.js";
import { ResultsGridPage } from "../pages/ResultsGridPage.js";
import { SapTableBrowserPage } from "../pages/SapTableBrowserPage.js";
import { TableSelectionPage } from "../pages/TableSelectionPage.js";
import { FrAuditPage } from "../pages/FrAuditPage.js";
import { CaseNotesPage } from "../pages/CaseNotesPage.js";

type Pages = {
  sapPage: SapTableBrowserPage;
  commandBarPage: CommandBarPage;
  tableSelectionPage: TableSelectionPage;
  resultsGridPage: ResultsGridPage;
  helperPanelPage: HelperPanelPage;
  frParentPage: FrParentPage;
  itmDetailsPage: ItmDetailsPage;
  entitlementPage: EntitlementPage;
  mailCountPage: MailCountPage;
  frAuditPage: FrAuditPage;
  caseNotesPage: CaseNotesPage;

};

export const test = base.extend<Pages>({
  sapPage: async ({ page }, use) => {
    await use(new SapTableBrowserPage(page));
  },
  commandBarPage: async ({ page }, use) => {
    await use(new CommandBarPage(page));
  },
  tableSelectionPage: async ({ page }, use) => {
    await use(new TableSelectionPage(page));
  },
  resultsGridPage: async ({ page }, use) => {
    await use(new ResultsGridPage(page));
  },
  helperPanelPage: async ({ page }, use) => {
    await use(new HelperPanelPage(page));
  },
  frParentPage: async ({ page }, use) => {
    await use(new FrParentPage(page));
  },
  itmDetailsPage: async ({ page }, use) => {
    await use(new ItmDetailsPage(page));
  },
  entitlementPage: async ({ page }, use) => {
    await use(new EntitlementPage(page));
  },
  mailCountPage: async ({ page }, use) => {
    await use(new MailCountPage(page));
  },
  frAuditPage: async ({ page }, use) => {
    await use(new FrAuditPage(page));
  },
  caseNotesPage: async ({ page }, use) => {
    await use(new CaseNotesPage(page));
  },
});

export { expect };
