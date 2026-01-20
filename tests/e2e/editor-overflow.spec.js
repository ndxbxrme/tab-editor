const { test, expect } = require("@playwright/test");
const { openEditor, getPiece } = require("./helpers");

test("overflow creates tied continuation across bars @editor @overflow", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  // q q 8 q q -> last q should split as 8 + 8 tie
  await enterFret(5); // q at 0
  await enterFret(5); // q at 1
  await page.locator('jg-score-view [data-dur="8"]').click();
  await enterFret(5); // 8 at 2
  await page.locator('jg-score-view [data-dur="q"]').click();
  await enterFret(5); // q at 2.5
  await enterFret(5); // overflow q -> 8 + 8 tie

  const parsed = await getPiece(page);
  const bar0 = parsed.bars[0];
  const bar1 = parsed.bars[1];

  expect(bar0.ties && bar0.ties.length).toBeGreaterThan(0);
  const tie = bar0.ties[bar0.ties.length - 1];
  const toId = tie.to;
  const cont = bar1.voices[0].events.find(e => e.id === toId);
  expect(cont).toBeTruthy();
  expect(cont.start).toBe(0);
  expect(cont.duration).toBe("8");
});

test("syncopation persists into third bar after overflow @editor @overflow", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  // q q 8 q q -> overflow tie into bar 1
  await enterFret(5);
  await enterFret(5);
  await page.locator('jg-score-view [data-dur="8"]').click();
  await enterFret(5);
  await page.locator('jg-score-view [data-dur="q"]').click();
  await enterFret(5);
  await enterFret(5);

  // keep adding quarters into bar 1 to reach bar 2
  await enterFret(5);
  await enterFret(5);
  await enterFret(5);
  await enterFret(5);

  const parsed = await getPiece(page);
  const bar1 = parsed.bars[1];
  const bar2 = parsed.bars[2];

  const starts1 = bar1.voices[0].events
    .filter(e => !e.duration.includes("r"))
    .map(e => e.start);
  const starts2 = bar2.voices[0].events
    .filter(e => !e.duration.includes("r"))
    .map(e => e.start);

  // If syncopation persists, bar 1 should include a note at 0.5.
  expect(starts1).toContain(0.5);
  // Bar 2 should begin on-beat (0) as expected after bar 1 completes.
  expect(starts2[0]).toBe(0);
});

test("sixteenths entry fills a bar @editor @overflow", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="16"]').click();

  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async () => {
    await page.keyboard.type("5");
    await page.waitForTimeout(600);
  };

  for (let i = 0; i < 16; i++) {
    await enterFret();
  }

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events.length).toBe(16);
  expect(events[0].duration).toBe("16");
  expect(events[15].start).toBe(3.75);
});
