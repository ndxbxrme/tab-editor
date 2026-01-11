const { test, expect } = require("@playwright/test");

async function openEditor(page) {
  await page.goto("/");
  await page.locator('.app-btn[data-view="editor"]').click();
  await expect(page.locator("jg-score-view")).toBeVisible();
}

async function openSongbook(page) {
  await page.goto("/");
  await page.locator('.app-btn[data-view="songbook"]').click();
  await expect(page.locator("jg-songbook")).toBeVisible();
}

async function getPiece(page) {
  return await page.evaluate(() => {
    const el = document.querySelector("jg-score-view");
    if (!el || typeof el.getPieceClone !== "function") return null;
    return el.getPieceClone();
  });
}

test("loads editor and renders basic UI", async ({ page }) => {
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

test("reset + duration change does not throw IncompleteVoice", async ({ page }) => {
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

test("ArrowRight creates next slot when at end", async ({ page }) => {
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

test("edit second note fret after three entries", async ({ page }) => {
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

test("duration change on empty note produces a rest", async ({ page }) => {
  await openEditor(page);

  await page.locator('jg-score-view [data-action="reset-piece"]').click();
  await page.locator('jg-score-view [data-dur="q"]').click();

  const parsed = await getPiece(page);
  const ev = parsed.bars[0].voices[0].events[0];
  expect(ev.duration).toBe("qr");
});

test("overflow creates tied continuation across bars", async ({ page }) => {
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

test("syncopation persists into third bar after overflow", async ({ page }) => {
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

test("sixteenths entry fills a bar", async ({ page }) => {
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

test("shift-click selects a range of notes", async ({ page }) => {
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

test("apply tuplet to mixed-duration range", async ({ page }) => {
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

test("joe pass sextuplets fit four beats", async ({ page }) => {
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

test("range slur applies from first to last note", async ({ page }) => {
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

test("slide applies to adjacent range selection", async ({ page }) => {
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

test("add bass voice and enter a note", async ({ page }) => {
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

test("bass voice overflows into next bar", async ({ page }) => {
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

test("delete range across bars", async ({ page }) => {
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

test("copy/paste range preserves relative timing", async ({ page }) => {
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

test("cut range removes notes and preserves clipboard", async ({ page }) => {
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

test("songbook save/load current piece", async ({ page }) => {
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

test("songbook new piece loads empty editor", async ({ page }) => {
  await openSongbook(page);
  await page.locator('jg-songbook [data-action="new-piece"]').click();
  await page.locator("jg-modal").waitFor();
  await page.locator('jg-modal >> [data-action="confirm"]').click();
  await expect(page.locator("jg-score-view")).toBeVisible();
  const parsed = await getPiece(page);
  expect(parsed.bars.length).toBeGreaterThanOrEqual(1);
  expect(parsed.bars[0].voices[0].events[0].duration).toContain("r");
});

test("meta modal applies piece title and updates toolbar", async ({ page }) => {
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

test("meta modal bar tab applies section and custom time fields toggle", async ({ page }) => {
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

test("tuplet modal reapply updates without contiguity error", async ({ page }) => {
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

