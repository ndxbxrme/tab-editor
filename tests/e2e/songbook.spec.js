const { test, expect } = require("@playwright/test");
const { openEditor, openSongbook, getPiece } = require("./helpers");

test("songbook save/load current piece @songbook", async ({ page }) => {
  await openEditor(page);
  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();
  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("7");
  const parsed = await getPiece(page);

  await page.locator('.app-btn[data-view="songbook"]').click();
  await page.locator('jg-songbook [data-action="save-current"]').click();
  await expect(page.locator("jg-songbook .row")).toHaveCount(1);

  await page.locator('jg-songbook [data-action="load"]').first().click();
  await expect(page.locator("jg-score-view")).toBeVisible();
  const parsed2 = await getPiece(page);
  expect(parsed2).toMatchObject(parsed);
});

test("songbook new piece loads empty editor @songbook", async ({ page }) => {
  await openSongbook(page);
  await page.locator('jg-songbook [data-action="new-piece"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal >> [data-action="confirm"]').click();
  await expect(page.locator("jg-score-view")).toBeVisible();
  const parsed = await getPiece(page);
  expect(parsed.bars.length).toBeGreaterThanOrEqual(1);
  expect(parsed.bars[0].voices[0].events[0].duration).toContain("r");
});

test("meta modal applies piece title and updates toolbar @songbook", async ({ page }) => {
  await openEditor(page);
  await page.locator('jg-score-view [data-action="open-meta"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-action="tab"][data-tab="piece"]').click();
  await page.locator('jg-modal [data-field="piece_title"]').fill("Test Tune");
  await page.locator('jg-modal [data-action="apply_meta"]').click();

  const parsed = await getPiece(page);
  expect(parsed.meta.title).toBe("Test Tune");
  await expect(page.locator("jg-score-view .piece-title")).toHaveText("Test Tune");
});

test("meta modal bar tab applies section and custom time fields toggle @songbook", async ({ page }) => {
  await openEditor(page);
  await page.locator('jg-score-view [data-action="open-meta"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-action="tab"][data-tab="bar"]').click();

  const timeNum = page.locator('jg-modal [data-field="bar_time_num"]');
  await expect(timeNum).toBeHidden();

  await page.locator('jg-modal [data-field="bar_time_preset"]').selectOption("custom");
  await expect(timeNum).toBeVisible();

  await page.locator('jg-modal [data-field="bar_section"]').fill("B");
  await page.locator('jg-modal [data-action="apply_meta"]').click();

  const parsed = await getPiece(page);
  expect(parsed.bars[0].meta.section.label).toBe("B");
});
