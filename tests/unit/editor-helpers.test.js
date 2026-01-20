import { describe, expect, it } from "vitest";
import {
  consolidateRestsIfEmpty,
  durationPartsFromBeats,
  durationWithDotsBeats,
  formatRests,
  formatRestsForUnit,
  normalizeVoiceForEvent,
  setFret
} from "../../src/editor-helpers.js";

function makePiece(events) {
  return {
    defaults: { timeSig: [4, 4], keySig: "C", clef: "treble" },
    tuningMidiByString: { 6: 40, 5: 45, 4: 50, 3: 55, 2: 59, 1: 64 },
    bars: [
      {
        meta: {},
        voices: [{ id: "melody", stemDirection: 1, events }]
      }
    ]
  };
}

describe("editor helpers", () => {
  it("calculates dotted duration beats", () => {
    expect(durationWithDotsBeats("q", 1)).toBe(1.5);
    expect(durationWithDotsBeats("8", 2)).toBe(0.875);
  });

  it("splits beats into dotted duration parts", () => {
    const parts = durationPartsFromBeats(1.5);
    expect(parts).toHaveLength(1);
    expect(parts[0].dur).toBe("q");
    expect(parts[0].dots).toBe(1);
  });

  it("formats full-bar rests", () => {
    const bar = { meta: { timeSig: [4, 4] } };
    const rests = formatRests(4, 0, bar, false);
    expect(rests).toHaveLength(1);
    expect(rests[0].duration).toBe("wr");
    expect(rests[0].hidden).toBe(false);
  });

  it("formats rests for 3/4 with beat-aware splits", () => {
    const bar = { meta: { timeSig: [3, 4] } };
    const rests = formatRests(3, 0, bar, false);
    expect(rests).toHaveLength(1);
    expect(rests[0].duration).toBe("hr");
    expect(rests[0].dots).toBe(1);
  });

  it("formats rests for 5/4 with whole plus quarter", () => {
    const bar = { meta: { timeSig: [5, 4] } };
    const rests = formatRests(5, 0, bar, false);
    expect(rests).toHaveLength(2);
    expect(rests[0].duration).toBe("wr");
    expect(rests[1].duration).toBe("qr");
  });

  it("formats rests for 6/8 using dotted quarters", () => {
    const bar = { meta: { timeSig: [6, 8] } };
    const rests = formatRests(3, 0, bar, false);
    expect(rests).toHaveLength(1);
    expect(rests[0].duration).toBe("hr");
    expect(rests[0].dots).toBe(1);
  });

  it("limits tuplet rest parts to the unit duration", () => {
    const rests = formatRestsForUnit(2, 0, 1, false, { maxBeats: 1, quantizeUnit: null });
    expect(rests).toHaveLength(2);
    expect(rests[0].duration).toBe("qr");
    expect(rests[1].duration).toBe("qr");
  });

  it("sets fret and clears rest state", () => {
    const piece = makePiece([
      { id: "b1n1", start: 0, duration: "qr", tones: [] }
    ]);
    const next = setFret(piece, "b1n1", 0, 30);
    const ev = next.bars[0].voices[0].events[0];
    expect(ev.duration).toBe("q");
    expect(ev.tones[0].string).toBe(1);
    expect(ev.tones[0].fret).toBe(24);
  });

  it("consolidates empty bars into rests", () => {
    const piece = makePiece([
      { id: "r1", start: 0, duration: "qr", tones: [] },
      { id: "r2", start: 1, duration: "qr", tones: [] }
    ]);
    const next = consolidateRestsIfEmpty(piece, 0, 0);
    expect(next.bars[0].voices[0].events).toHaveLength(1);
    expect(next.bars[0].voices[0].events[0].duration).toBe("wr");
  });

  it("fills tuplets with rest placeholders to complete the span", () => {
    const piece = makePiece([
      {
        id: "t1n1",
        start: 0,
        duration: "q",
        tones: [{ string: 1, fret: 5 }],
        tupletGroupId: "t1"
      }
    ]);
    piece.bars[0].tuplets = [{
      id: "t1",
      numNotes: 3,
      notesOccupied: 2,
      unitBeats: 1,
      ratioed: false,
      bracketed: false
    }];

    const next = normalizeVoiceForEvent(piece, "t1n1");
    const tuplets = next.bars[0].voices[0].events.filter(ev => ev.tupletGroupId === "t1");
    const restCount = tuplets.filter(ev => ev.duration.includes("r")).length;
    expect(tuplets.length).toBeGreaterThanOrEqual(3);
    expect(restCount).toBe(2);
  });
});
