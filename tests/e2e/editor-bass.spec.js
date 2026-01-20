const { test, expect } = require("@playwright/test");
const { openEditor, getPiece } = require("./helpers");

test("add bass voice and enter a note @editor @bass", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-action="add-bass"]').click();

  await page.keyboard.type("5");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const voices = parsed.bars[0].voices;
  const bass = voices.find(v => v.id === "bass");
  expect(bass).toBeTruthy();
  const sounding = bass.events.filter(e => e.tones && e.tones.length > 0 && !e.duration.includes("r"));
  expect(sounding.length).toBeGreaterThan(0);
});

test("bass voice overflows into next bar @editor @bass", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-action="add-bass"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  for (let i = 0; i < 5; i++) {
    await enterFret(5);
  }

  const parsed = await getPiece(page);
  const bass0 = parsed.bars[0].voices.find(v => v.id === "bass");
  const bass1 = parsed.bars[1]?.voices?.find(v => v.id === "bass");
  const bar0Notes = bass0.events.filter(e => !e.duration.includes("r"));
  const bar1Notes = (bass1?.events || []).filter(e => !e.duration.includes("r"));

  expect(bar0Notes.length).toBe(4);
  expect(bar1Notes.length).toBe(1);
});
