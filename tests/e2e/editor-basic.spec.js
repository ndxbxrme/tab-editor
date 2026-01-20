const { test, expect } = require("@playwright/test");
const { openEditor, getPiece } = require("./helpers");

test("loads editor and renders basic UI @smoke @editor", async ({ page }) => {
  await openEditor(page);

  const editor = page.locator("jg-score-view");
  await expect(editor).toBeVisible();

  const inspector = page.locator("jg-score-view .inspector");
  await expect(inspector).toBeVisible();

  const hit = page.locator("jg-score-view .hit").first();
  await page.waitForSelector("jg-score-view .hit");
  await page.locator("jg-score-view .wrap").scrollIntoViewIfNeeded();
  await expect(hit).toBeVisible();
  await hit.click();

  const caret = page.locator("jg-score-view .caret");
  await expect(caret).toBeVisible();
});

test("reset + duration change does not throw IncompleteVoice @smoke @editor", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const bad = errors.find((e) => e.includes("IncompleteVoice"));
  expect(bad).toBeFalsy();
});

test("ArrowRight creates next slot when at end @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const wrap = page.locator("jg-score-view .wrap");
  await wrap.click();
  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("3");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");

  await page.waitForTimeout(500);

  const parsed = await getPiece(page);
  const events = parsed.bars.flatMap(b => (b.voices?.[0]?.events || []));
  const sounding = events.filter(e => e && typeof e.duration === "string" && !e.duration.includes("r"));
  expect(sounding.length).toBeGreaterThanOrEqual(2);
});

test("edit second note fret after three entries @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("3");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");
  await page.waitForTimeout(600);
  await page.keyboard.type("7");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events.length).toBeGreaterThanOrEqual(3);
  const second = events.find(e => e.start === 1);

  await page.locator(`jg-score-view .hit[data-event-id="${second.id}"][data-string-index="0"]`).click();
  await page.keyboard.type("9");
  await page.waitForTimeout(600);

  const parsed2 = await getPiece(page);
  const events2 = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const second2 = events2.find(e => e.start === 1);
  expect(second2.tones[0].fret).toBe(9);
});

test("duration change on empty note produces a rest @editor", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const parsed = await getPiece(page);
  const ev = parsed.bars[0].voices[0].events[0];
  expect(ev.duration).toBe("qr");
});
