const { test, expect } = require("@playwright/test");

test("loads editor and renders basic UI", async ({ page }) => {
  await page.goto("/");

  const editor = page.locator("jg-score-view");
  await expect(editor).toBeVisible();

  const inspector = page.locator("jg-score-view .inspector");
  await expect(inspector).toBeVisible();

  const hit = page.locator("jg-score-view .hit").first();
  await expect(hit).toBeVisible();
  await hit.click();

  const caret = page.locator("jg-score-view .caret");
  await expect(caret).toBeVisible();
});

test("reset + duration change does not throw IncompleteVoice", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const bad = errors.find((e) => e.includes("IncompleteVoice"));
  expect(bad).toBeFalsy();
});

test("ArrowRight creates next slot when at end", async ({ page }) => {
  await page.goto("/");

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const wrap = page.locator("jg-score-view .wrap");
  await wrap.click();
  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("3");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");

  await page.waitForTimeout(500);

  const jsonText = await page.locator("jg-score-view .json-io").inputValue();
  const parsed = JSON.parse(jsonText);
  const events = parsed.bars.flatMap(b => (b.voices?.[0]?.events || []));
  const sounding = events.filter(e => e && typeof e.duration === "string" && !e.duration.includes("r"));
  expect(sounding.length).toBeGreaterThanOrEqual(2);
});

test("edit second note fret after three entries", async ({ page }) => {
  await page.goto("/");

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("3");
  await page.waitForTimeout(600);
  await page.keyboard.type("5");
  await page.waitForTimeout(600);
  await page.keyboard.type("7");
  await page.waitForTimeout(600);

  const jsonText = await page.locator("jg-score-view .json-io").inputValue();
  const parsed = JSON.parse(jsonText);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events.length).toBeGreaterThanOrEqual(3);
  const second = events.find(e => e.start === 1);

  await page.locator(`jg-score-view .hit[data-event-id="${second.id}"][data-string-index="0"]`).click();
  await page.keyboard.type("9");
  await page.waitForTimeout(600);

  const jsonText2 = await page.locator("jg-score-view .json-io").inputValue();
  const parsed2 = JSON.parse(jsonText2);
  const events2 = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const second2 = events2.find(e => e.start === 1);
  expect(second2.tones[0].fret).toBe(9);
});

test("duration change on empty note produces a rest", async ({ page }) => {
  await page.goto("/");

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const jsonText = await page.locator("jg-score-view .json-io").inputValue();
  const parsed = JSON.parse(jsonText);
  const ev = parsed.bars[0].voices[0].events[0];
  expect(ev.duration).toBe("qr");
});

test("overflow creates tied continuation across bars", async ({ page }) => {
  await page.goto("/");

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

  const jsonText = await page.locator("jg-score-view .json-io").inputValue();
  const parsed = JSON.parse(jsonText);
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

test("syncopation persists into third bar after overflow", async ({ page }) => {
  await page.goto("/");

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

  const jsonText = await page.locator("jg-score-view .json-io").inputValue();
  const parsed = JSON.parse(jsonText);
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

test("sixteenths entry fills a bar", async ({ page }) => {
  await page.goto("/");

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

  const jsonText = await page.locator("jg-score-view .json-io").inputValue();
  const parsed = JSON.parse(jsonText);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events.length).toBe(16);
  expect(events[0].duration).toBe("16");
  expect(events[15].start).toBe(3.75);
});
