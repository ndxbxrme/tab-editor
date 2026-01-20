const { test, expect } = require("@playwright/test");
const { openEditor, getPiece } = require("./helpers");

test("apply tuplet to mixed-duration range @tuplets", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();

  await page.locator('jg-score-view [data-dur="16"]').click();
  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("5");
  await page.waitForTimeout(600);

  await page.locator('jg-score-view [data-dur="32"]').click();
  await page.keyboard.type("6");
  await page.waitForTimeout(600);

  await page.locator('jg-score-view [data-dur="16"]').click();
  await page.keyboard.type("7");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const ids = events.slice(0, 3).map(e => e.id);

  const first = page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`);
  const third = page.locator(`jg-score-view .hit[data-event-id="${ids[2]}"][data-string-index="0"]`);

  await first.click();
  await third.click({ modifiers: ["Shift"] });

  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-field="tuplet_num"]').fill("3");
  await page.locator('jg-modal [data-field="tuplet_occ"]').fill("2");
  await page.locator('jg-modal [data-action="apply"]').click();

  const parsed2 = await getPiece(page);
  const events2 = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const selected = events2.filter(e => ids.includes(e.id));
  const groupIds = Array.from(new Set(selected.map(e => e.tupletGroupId).filter(Boolean)));
  expect(groupIds.length).toBe(1);
  const tid = groupIds[0];
  const def = parsed2.bars[0].tuplets.find(t => t.id === tid);
  expect(def).toBeTruthy();
  expect(def.numNotes).toBe(3);
  expect(def.notesOccupied).toBe(2);
});

test("joe pass sextuplets fit four beats @tuplets", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator("jg-score-view .hit").first().click();

  const enterFret = async (digit) => {
    await page.keyboard.type(String(digit));
    await page.waitForTimeout(600);
  };

  // Beat 1: 6x16th -> sextuplet (6 in the time of 4)
  await page.locator('jg-score-view [data-dur="16"]').click();
  for (let i = 0; i < 6; i++) await enterFret(5);

  let parsed = await getPiece(page);
  let events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  let ids = events.map(e => e.id);

  // Apply sextuplet to first 6 notes.
  const firstRange = ids.slice(0, 6);
  await page.locator(`jg-score-view .hit[data-event-id="${firstRange[0]}"][data-string-index="0"]`).click();
  await page.locator(`jg-score-view .hit[data-event-id="${firstRange[5]}"][data-string-index="0"]`).click({ modifiers: ["Shift"] });
  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-field="tuplet_num"]').fill("6");
  await page.locator('jg-modal [data-field="tuplet_occ"]').fill("4");
  await page.locator('jg-modal [data-action="apply"]').click();

  // Beat 2: 4x16th + 4x32nd -> sextuplet (mixed)
  await page.locator('jg-score-view [data-dur="16"]').click();
  for (let i = 0; i < 4; i++) await enterFret(6);
  await page.locator('jg-score-view [data-dur="32"]').click();
  for (let i = 0; i < 4; i++) await enterFret(7);

  parsed = await getPiece(page);
  events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  ids = events.map(e => e.id);

  // Apply sextuplet to next 8 mixed notes (still 6 in the time of 4).
  expect(ids.length).toBeGreaterThanOrEqual(14);
  const secondRange = ids.slice(6, 14);
  await page.locator(`jg-score-view .hit[data-event-id="${secondRange[0]}"][data-string-index="0"]`).click();
  await page.locator(`jg-score-view .hit[data-event-id="${secondRange[7]}"][data-string-index="0"]`).click({ modifiers: ["Shift"] });
  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-field="tuplet_num"]').fill("6");
  await page.locator('jg-modal [data-field="tuplet_occ"]').fill("4");
  await page.locator('jg-modal [data-action="apply"]').click();

  // Beat 3: 4x16th
  await page.locator('jg-score-view [data-dur="16"]').click();
  for (let i = 0; i < 4; i++) await enterFret(8);

  // Beat 4: 4x16th
  for (let i = 0; i < 4; i++) await enterFret(9);

  const parsed2 = await getPiece(page);

  // Expect all sounding notes to remain in the first bar.
  const bar0Notes = parsed2.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const bar1Notes = parsed2.bars[1]?.voices?.[0]?.events?.filter(e => !e.duration.includes("r")) || [];
  expect(bar0Notes.length).toBeGreaterThanOrEqual(17);
  expect(bar1Notes.length).toBe(0);
});

test("tuplet modal reapply updates without contiguity error @tuplets", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("dialog", (dlg) => {
    errors.push(dlg.message());
    dlg.dismiss();
  });

  await openEditor(page);
  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();
  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("7");
  await page.waitForTimeout(600);
  await page.keyboard.type("7");
  await page.waitForTimeout(600);
  await page.keyboard.type("7");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  const ids = events.slice(0, 3).map(e => e.id);

  await page.locator(`jg-score-view .hit[data-event-id="${ids[0]}"][data-string-index="0"]`).click();
  await page.locator(`jg-score-view .hit[data-event-id="${ids[2]}"][data-string-index="0"]`).click({ modifiers: ["Shift"] });

  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-action="apply"]').click();

  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-field="tuplet_ratio"]').check();
  await page.locator('jg-modal [data-action="apply"]').click();

  const alertError = errors.find((e) => e.includes("Tuplet ranges must be contiguous"));
  expect(alertError).toBeFalsy();
});

test("tuplet entry mode keeps duration while entering notes @tuplets", async ({ page }) => {
  await openEditor(page);
  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();
  await page.locator("jg-score-view .hit").first().click();
  await page.keyboard.type("7");
  await page.waitForTimeout(600);
  await page.keyboard.type("7");
  await page.waitForTimeout(600);

  await page.locator('jg-score-view [data-action="open-tuplet"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal [data-action="apply"]').click();

  await page.keyboard.type("6");
  await page.waitForTimeout(600);
  await page.keyboard.type("6");
  await page.waitForTimeout(600);
  await page.keyboard.type("6");
  await page.waitForTimeout(600);

  const parsed = await getPiece(page);
  const events = parsed.bars[0].voices[0].events.filter(e => !e.duration.includes("r"));
  expect(events.length).toBeGreaterThanOrEqual(5);
  const tail = events.slice(-3);
  tail.forEach(ev => {
    expect(ev.duration).toBe("q");
    expect(ev.dots || 0).toBe(0);
    expect(ev.tupletGroupId).toBeTruthy();
  });
});
