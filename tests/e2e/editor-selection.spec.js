const { test, expect } = require("@playwright/test");
const { openEditor, getPiece } = require("./helpers");

test("shift-click selects a range of notes @editor @selection", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("5");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const ids = events.slice(0, 3).map(e => e.id);
  const first = page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`);
  const third = page.locator(`jg-score-view .hit[data-event-id="${ids[2]}"][data-string-index="0"]`);

  await first.click();
  await third.click({ modifiers: ["Shift"] });

  const selected = page.locator('jg-score-view .hit.selected[data-string-index="0"]');
  await expect(selected).toHaveCount(3);
});

test("range slur applies from first to last note @editor @selection", async ({ page }) => {
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
  const ids = events.slice(0, 3).map(e => e.id);

  await page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`).click();
  await page.locator(`jg-score-view .hit[data-event-id="${ids[2]}"][data-string-index="0"]`).click({ modifiers: ["Shift"] });
  await page.locator('jg-score-view [data-action="slur-range"]').click();

  const parsed2 = await getPiece(page);
  const slurs = parsed2.bars[0].slurs || [];
  expect(slurs.some(s => s.from === ids[0] && s.to === ids[2])).toBeTruthy();
});

test("slide applies to adjacent range selection @editor @selection", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("3");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const ids = events.slice(0, 2).map(e => e.id);

  await page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`).click();
  await page.locator(`jg-score-view .hit[data-event-id="${ids[1]}"][data-string-index="0"]`).click({ modifiers: ["Shift"] });
  await page.locator('jg-score-view [data-action="tech-slide"]').click();

  const parsed2 = await getPiece(page);
  const tech = parsed2.bars[0].guitar || [];
  expect(tech.some(t => t.type === "slide" && t.from === ids[0] && t.to === ids[1])).toBeTruthy();
});

test("delete range across bars @editor @selection", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();
  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  for (let i = 0; i < 5; i++) {
    await enterFret(5);
  }

  const parsed = await getPiece(page);
  const bar0 = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const bar1 = parsed.bars[1].voices[0].events.filter(e => !e.duration.includes("r"));

  const firstId = bar0[0].id;
  const lastId = bar1[0].id;

  const firstHit = page.locator(`jg-score-view .hit[data-event-id="${firstId}"][data-string-index="0"]`);
  const lastHit = page.locator(`jg-score-view .hit[data-event-id="${lastId}"][data-string-index="0"]`);
  await firstHit.click();
  await lastHit.click({ modifiers: ["Shift"] });

  await page.locator('jg-score-view [data-action="delete-range"]').click();

  const parsed2 = await getPiece(page);
  const bar0After = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const bar1After = parsed2.bars[1].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(bar0After.length).toBe(0);
  expect(bar1After.length).toBe(0);
});

test("copy/paste range preserves relative timing @editor @selection", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();
  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  for (let i = 0; i < 4; i++) {
    await enterFret(5);
  }

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const ids = events.map(e => e.id);

  const firstHit = page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`);
  const secondHit = page.locator(`jg-score-view .hit[data-event-id="${ids[1]}"][data-string-index="0"]`);
  await firstHit.click();
  await secondHit.click({ modifiers: ["Shift"] });

  await page.locator('jg-score-view [data-action="copy-range"]').click();

  const thirdHit = page.locator(`jg-score-view .hit[data-event-id="${ids[2]}"][data-string-index="0"]`);
  await thirdHit.click();
  await page.locator('jg-score-view [data-action="paste-range"]').click();

  const parsed2 = await getPiece(page);
  const events2 = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const starts = events2.map(e => e.start).sort((a, b) => a - b);

  expect(starts.filter(s => s === 2).length).toBeGreaterThan(0);
  expect(starts.filter(s => s === 3).length).toBeGreaterThan(0);
});

test("cut range removes notes and preserves clipboard @editor @selection", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();
  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  for (let i = 0; i < 4; i++) {
    await enterFret(5);
  }

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const ids = events.map(e => e.id);

  const firstHit = page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`);
  const secondHit = page.locator(`jg-score-view .hit[data-event-id="${ids[1]}"][data-string-index="0"]`);
  await firstHit.click();
  await secondHit.click({ modifiers: ["Shift"] });

  await page.locator('jg-score-view [data-action="cut-range"]').click();

  const parsed2 = await getPiece(page);
  const events2 = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events2.length).toBe(2);

  await page.locator('jg-score-view [data-action="toggle-paste"]').click();
  const thirdHit = page.locator(`jg-score-view .hit[data-event-id="${events2[0].id}"][data-string-index="0"]`);
  await thirdHit.click();
  await page.locator('jg-score-view [data-action="paste-range"]').click();

  const parsed3 = await getPiece(page);
  const events3 = parsed3.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events3.length).toBeGreaterThanOrEqual(3);
});
