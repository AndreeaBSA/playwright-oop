import { test, expect } from "../../fixtures/test-fixtures.js";

const statusCounts = [
  { status: "Queued", count: 10 },
  { status: "Ready", count: 23 },
  { status: "Sent", count: 7 },
  { status: "Error", count: 7 },
];

for (const c of statusCounts) {
  test(`MAILCOUNT - ${c.count} mailuri cu STATUS ${c.status}`, async ({ mailCountPage }) => {
    await mailCountPage.open();
    await expect.poll(() => mailCountPage.getRowCount()).toBe(47);

    let found = 0;
    const rowCount = await mailCountPage.getRowCount();
    for (let i = 0; i < rowCount; i++) {
      if ((await mailCountPage.getCellText(i, "STATUS")) === c.status) {
        found++;
      }
    }
    expect(found).toBe(c.count);
  });
}
