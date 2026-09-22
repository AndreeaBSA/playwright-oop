import { test, expect } from "../../fixtures/test-fixtures.js";
import type { SapTableBrowserPage } from "../../pages/SapTableBrowserPage.js";

const BROWSER_READY = "Browser Ready";
const AWAITING = "Awaiting Transaction";

type TransactionCase = {
    title: string;
    code: string;
    expected: {
        browserState: string;
        controlsEnabled: boolean;
    };
};

const transactionCases: TransactionCase[] = [
    {
        title: "SE16",
        code: "SE16",
        expected: { browserState: BROWSER_READY, controlsEnabled: true },
    },
    {
        title: "SE16N",
        code: "SE16N",
        expected: { browserState: BROWSER_READY, controlsEnabled: true },
    },
    {
        title: "se16 lowercase",
        code: "se16",
        expected: { browserState: BROWSER_READY, controlsEnabled: true },
    },
    {
        title: "Se16n mixed case",
        code: "Se16n",
        expected: { browserState: BROWSER_READY, controlsEnabled: true },
    },
    {
        title: "SE16 cu spatii",
        code: " SE16 ",
        expected: { browserState: BROWSER_READY, controlsEnabled: true },
    },
    {
        title: "MM03 nesuportat",
        code: "MM03",
        expected: { browserState: AWAITING, controlsEnabled: false },
    },
    {
        title: "ZZCUSTOM_TX nesuportat",
        code: "ZZCUSTOM_TX",
        expected: { browserState: AWAITING, controlsEnabled: false },
    },
    {
        title: "cod gol",
        code: "",
        expected: { browserState: AWAITING, controlsEnabled: false },
    },
];

async function verificaControalele(sapPage: SapTableBrowserPage, activate: boolean) {
    const controale = [sapPage.tableNameInput, sapPage.btnExecute, sapPage.btnClearFilters];
    for (const control of controale) {
        if (activate) {
            await expect(control).toBeEnabled();
        } else {
            await expect(control).toBeDisabled();
        }
    }
}

// ********  BEGINNER  **********

test.describe("BEGINNER - Command Bar", () => {
    test.beforeEach(async ({ sapPage }) => {
        await sapPage.goTo();
        await expect(sapPage.browserActive).toHaveText(AWAITING);
    });

    for (const c of transactionCases) {
        test(`1, 3-4) ${c.title} prin Enter -> ${c.expected.browserState}`, async ({ sapPage }) => {
            await sapPage.commandInput.fill(c.code);
            await sapPage.commandInput.press("Enter");

            await expect(sapPage.browserActive).toHaveText(c.expected.browserState);
            await verificaControalele(sapPage, c.expected.controlsEnabled);
        });
    }
});

// ********  MIDDLE  **********

test.describe("MIDDLE - Command Bar", () => {
    test.beforeEach(async ({ sapPage }) => {
        await sapPage.goTo();
    });

    for (const c of transactionCases) {
        test(`5-8) Dupa MM03 invalid, ${c.title} duce la ${c.expected.browserState}`, async ({ sapPage }) => {
            await verificaControalele(sapPage, false);

            await sapPage.commandInput.fill("MM03");
            await sapPage.commandInput.press("Enter");
            await expect(sapPage.browserActive).toHaveText(AWAITING);
            await verificaControalele(sapPage, false);

            await sapPage.commandInput.fill(c.code);
            await sapPage.commandInput.press("Enter");

            await expect(sapPage.browserActive).toHaveText(c.expected.browserState);
            await verificaControalele(sapPage, c.expected.controlsEnabled);
        });
    }
});

// ********  EXPERIENCED  **********

test.describe("EXPERIENCED - Command Bar", () => {
    test.beforeEach(async ({ sapPage }) => {
        await sapPage.goTo();
    });

    for (const c of transactionCases) {
        test(`2, 9-15) ${c.title} prin butonul Open, apasat de doua ori`, async ({ sapPage }) => {
            await expect(sapPage.btnOpen).toBeVisible();
            await expect(sapPage.btnOpen).toBeEnabled();
            await expect(sapPage.btnOpen).toHaveText("Open");

            await sapPage.commandInput.fill(c.code);
            await sapPage.btnOpen.click();
            await expect(sapPage.browserActive).toHaveText(c.expected.browserState);

            await sapPage.btnOpen.click();

            await expect(sapPage.browserActive).toHaveText(c.expected.browserState);
            await verificaControalele(sapPage, c.expected.controlsEnabled);
            await expect(sapPage.commandInput).toHaveValue(c.code);
        });
    }
});
