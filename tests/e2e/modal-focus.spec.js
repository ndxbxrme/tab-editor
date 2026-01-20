const { test, expect } = require("@playwright/test");
const { openEditor, getPiece } = require("./helpers");

test("modal text inputs keep focus while typing @modal @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-action="open-meta"]').click();

  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  const titleInput = modal.locator('input[data-field="piece_title"]');
  await expect(titleInput).toBeVisible();
  await titleInput.focus();
  await page.keyboard.type("Test Title");
  await expect(titleInput).toBeFocused();
  await expect(titleInput).toHaveValue("Test Title");

  const notesInput = modal.locator('textarea[data-field="piece_notes"]');
  await expect(notesInput).toBeVisible();
  await notesInput.focus();
  await page.keyboard.type("Modal notes");
  await expect(notesInput).toBeFocused();
  await expect(notesInput).toHaveValue("Modal notes");
});

test("modal field visibility responds to selects without re-render @modal @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="open-meta"]').click();
  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  await modal.locator('button[data-action="tab"][data-tab="bar"]').click();

  const preset = modal.locator('select[data-field="bar_time_preset"]');
  const numField = modal.locator('input[data-field="bar_time_num"]');
  const denField = modal.locator('input[data-field="bar_time_den"]');

  await expect(preset).toBeVisible();
  await preset.selectOption("custom");
  await expect(numField).toBeVisible();
  await expect(denField).toBeVisible();

  await preset.selectOption("4/4");
  await expect(numField).toBeHidden();
  await expect(denField).toBeHidden();
});

test("modal values persist when switching tabs @modal @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="open-meta"]').click();
  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  await modal.locator('button[data-action="tab"][data-tab="piece"]').click();

  const titleInput = modal.locator('input[data-field="piece_title"]');
  await expect(titleInput).toBeVisible();
  await titleInput.fill("Focus Tune");

  await modal.locator('button[data-action="tab"][data-tab="bar"]').click();
  await expect(modal.locator('select[data-field="bar_time_preset"]')).toBeVisible();

  await modal.locator('button[data-action="tab"][data-tab="piece"]').click();
  await expect(titleInput).toHaveValue("Focus Tune");
});

test("modal checkboxes update values and apply persists settings @modal @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  const ratio = modal.locator('input[data-field="tuplet_ratio"]');
  const bracket = modal.locator('input[data-field="tuplet_bracket"]');
  await expect(ratio).toBeVisible();
  await expect(bracket).toBeVisible();

  await ratio.check();
  await bracket.check();
  await expect(ratio).toBeChecked();
  await expect(bracket).toBeChecked();

  await modal.locator('button[data-action="apply"]').click();
  await expect(modal).toBeHidden();

  const settings = await page.evaluate(() => {
    const el = document.querySelector("jg-score-view");
    return el ? el.tupletSettings : null;
  });
  expect(settings).toMatchObject({ ratioed: true, bracketed: true });
});

test("modal close action hides dialog without apply @modal @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="open-meta"]').click();
  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  await modal.locator('button[data-action="close"]').click();
  await expect(modal).toBeHidden();
});

test("meta apply updates piece title @modal @editor", async ({ page }) => {
  await openEditor(page);
  await page.locator('jg-score-view [data-action="reset-piece"]').click();

  await page.locator('jg-score-view [data-action="open-meta"]').click();
  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  await modal.locator('button[data-action="tab"][data-tab="piece"]').click();
  const titleInput = modal.locator('input[data-field="piece_title"]');
  await titleInput.fill("Midnight Changes");

  await modal.locator('button[data-action="apply_meta"]').click();
  await expect(modal).toBeHidden();

  const piece = await getPiece(page);
  expect(piece.meta.title).toBe("Midnight Changes");
});

test("bar meta apply and clear bar action work @modal @editor", async ({ page }) => {
  await openEditor(page);
  await page.locator('jg-score-view [data-action="reset-piece"]').click();

  await page.locator('jg-score-view [data-action="open-meta"]').click();
  const modal = page.locator("jg-modal");
  await expect(modal).toBeVisible();

  await modal.locator('button[data-action="tab"][data-tab="bar"]').click();
  await modal.locator('input[data-field="bar_section"]').fill("A");
  await modal.locator('select[data-field="bar_time_preset"]').selectOption("custom");
  await modal.locator('input[data-field="bar_time_num"]').fill("5");
  await modal.locator('input[data-field="bar_time_den"]').fill("4");
  await modal.locator('button[data-action="apply_meta"]').click();
  await expect(modal).toBeHidden();

  const piece = await getPiece(page);
  expect(piece.bars[0].meta.section.label).toBe("A");
  expect(piece.bars[0].meta.timeSig).toEqual([5, 4]);

  await page.locator('jg-score-view [data-action="open-meta"]').click();
  const modal2 = page.locator("jg-modal");
  await expect(modal2).toBeVisible();
  await modal2.locator('button[data-action="tab"][data-tab="bar"]').click();
  await modal2.locator('button[data-action="clear_bar"]').click();
  await expect(modal2).toBeHidden();

  const cleared = await getPiece(page);
  expect(cleared.bars[0].meta).toEqual({});
});
