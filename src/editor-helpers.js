let idSeq = 1;
export function makeId(prefix = "e") {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj && typeof cryptoObj.randomUUID === "function") {
    return `${prefix}${cryptoObj.randomUUID()}`;
  }
  return `${prefix}${Date.now().toString(36)}_${idSeq++}`;
}

export const DURATION_BEATS = { w: 4, h: 2, q: 1, "8": 0.5, "16": 0.25, "32": 0.125 };

export const DURATION_OPTIONS = [
  { dur: "w", dots: 0, beats: 4 },
  { dur: "h", dots: 0, beats: 2 },
  { dur: "q", dots: 0, beats: 1 },
  { dur: "8", dots: 0, beats: 0.5 },
  { dur: "16", dots: 0, beats: 0.25 },
  { dur: "32", dots: 0, beats: 0.125 },
  { dur: "h", dots: 1, beats: 3 },
  { dur: "q", dots: 1, beats: 1.5 },
  { dur: "8", dots: 1, beats: 0.75 },
  { dur: "16", dots: 1, beats: 0.375 }
].sort((a, b) => b.beats - a.beats);

export function baseDuration(duration) {
  return DURATION_BEATS[duration.replace("r", "")] ?? 0;
}

export function durationForBeats(beats) {
  const entries = Object.entries(DURATION_BEATS);
  for (const [dur, val] of entries) {
    if (Math.abs(val - beats) < 1e-6) return dur;
  }
  return null;
}

export function durationWithDotsBeats(duration, dots = 0) {
  const b = baseDuration(duration);
  let add = 0;
  let frac = b / 2;
  for (let i = 0; i < dots; i++) {
    add += frac;
    frac /= 2;
  }
  return b + add;
}

export function normalizeBeats(beats) {
  const unit = 0.125;
  return Math.max(0, Math.round(beats / unit) * unit);
}

function roundBeat(value) {
  return Math.round(value * 100000) / 100000;
}

function quantizeBeats(beats, unit) {
  return Math.max(0, Math.round(beats / unit) * unit);
}

export function chooseDurationForBeats(maxBeats) {
  const eps = 1e-6;
  for (const opt of DURATION_OPTIONS) {
    if (opt.beats <= maxBeats + eps) return opt;
  }
  return DURATION_OPTIONS[DURATION_OPTIONS.length - 1];
}

export function durationPartsFromBeats(beats) {
  const parts = [];
  let left = normalizeBeats(beats);
  const eps = 1e-6;
  for (const opt of DURATION_OPTIONS) {
    while (left >= opt.beats - eps) {
      parts.push(opt);
      left = normalizeBeats(left - opt.beats);
    }
  }
  return parts.length ? parts : [DURATION_OPTIONS[DURATION_OPTIONS.length - 1]];
}

export function barLengthBeats(bar, piece) {
  const [beats, beatValue] = (bar.meta?.timeSig || piece.defaults?.timeSig || [4, 4]);
  return beats * (4 / beatValue);
}

export function clone(obj) {
  return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

export function findEventRef(piece, eventId) {
  for (let bi = 0; bi < piece.bars.length; bi++) {
    const bar = piece.bars[bi];
    for (let vi = 0; vi < bar.voices.length; vi++) {
      const voice = bar.voices[vi];
      const ei = voice.events.findIndex(e => e.id === eventId);
      if (ei !== -1) return { bi, vi, ei, bar, voice, ev: voice.events[ei] };
    }
  }
  return null;
}

export function ensureToneSlot(ev, stringIndex) {
  const str = Math.max(1, Math.min(6, stringIndex + 1));
  ev.tones ||= [];
  let ti = ev.tones.findIndex(t => t.string === str);
  if (ti === -1) {
    ev.tones.push({ string: str, fret: 0 });
    ev.tones.sort((a, b) => a.string - b.string);
    ti = ev.tones.findIndex(t => t.string === str);
  }
  return ti;
}

export function setFret(piece, eventId, stringIndex, fret) {
  const next = clone(piece);
  const ref = findEventRef(next, eventId);
  if (!ref) return next;
  const ti = ensureToneSlot(ref.ev, stringIndex);
  ref.ev.tones[ti].fret = Math.max(0, Math.min(24, fret));
  if (ref.ev.duration.includes("r")) ref.ev.duration = ref.ev.duration.replace("r", "");
  propagateTiedTones(next, ref.ev.id);
  return next;
}

export function setRest(piece, eventId) {
  const next = clone(piece);
  const ref = findEventRef(next, eventId);
  if (!ref) return next;
  ref.ev.tones = [];
  if (!ref.ev.duration.includes("r")) ref.ev.duration = `${ref.ev.duration}r`;
  return next;
}

export function setDuration(piece, eventId, dur) {
  const next = clone(piece);
  const ref = findEventRef(next, eventId);
  if (!ref) return next;
  ref.ev.duration = dur;
  if (!ref.ev.tones || ref.ev.tones.length === 0) {
    if (!ref.ev.duration.includes("r")) ref.ev.duration = `${ref.ev.duration}r`;
  }
  return next;
}

export function applyRestState(piece, eventId, isRest) {
  const ref = findEventRef(piece, eventId);
  if (!ref) return piece;
  if (isRest) {
    ref.ev.tones = [];
    if (!ref.ev.duration.includes("r")) ref.ev.duration = `${ref.ev.duration}r`;
  } else if (ref.ev.duration.includes("r")) {
    if (ref.ev.tones && ref.ev.tones.length > 0) {
      ref.ev.duration = ref.ev.duration.replace("r", "");
    }
  }
  return piece;
}

export function isHiddenRestFiller(ev) {
  return !!(ev && ev.hidden && ev.duration && ev.duration.includes("r"));
}

export function toggleDot(piece, eventId) {
  const next = clone(piece);
  const ref = findEventRef(next, eventId);
  if (!ref) return next;
  ref.ev.dots = (ref.ev.dots || 0) ? 0 : 1;
  return next;
}

export function setChord(piece, eventId, chord) {
  const next = clone(piece);
  const ref = findEventRef(next, eventId);
  if (!ref) return next;
  if (!chord) delete ref.ev.chord;
  else ref.ev.chord = chord;
  return next;
}

export function addTechnique(piece, type, payload) {
  const next = clone(piece);
  const ref = findEventRef(next, payload.on || payload.from || payload.to);
  if (!ref) return next;
  ref.bar.guitar ||= [];
  ref.bar.guitar.push({ type, ...payload });
  return next;
}

export function propagateTiedTones(piece, startId) {
  const ref = findEventRef(piece, startId);
  if (!ref || !ref.ev.tones || !ref.ev.tones.length) return;
  const tones = ref.ev.tones.map(t => ({ string: t.string, fret: t.fret }));
  const forward = new Map();
  piece.bars.forEach(b => {
    (b.ties || []).forEach(t => forward.set(t.from, t.to));
  });
  let cur = startId;
  while (forward.has(cur)) {
    const nextId = forward.get(cur);
    const r = findEventRef(piece, nextId);
    if (!r) break;
    r.ev.tones = tones.map(t => ({ string: t.string, fret: t.fret }));
    if (r.ev.duration.includes("r")) r.ev.duration = r.ev.duration.replace("r", "");
    cur = nextId;
  }
}

export function removeTechnique(piece, predicate) {
  const next = clone(piece);
  next.bars.forEach(b => {
    if (!b.guitar) return;
    b.guitar = b.guitar.filter(t => !predicate(t));
  });
  return next;
}

export function createEmptyBarLike(bar) {
  return {
    meta: {},
    voices: bar.voices.map(v => ({
      id: v.id,
      stemDirection: v.stemDirection,
      events: []
    }))
  };
}

export function addTie(piece, fromId, toId) {
  const ref = findEventRef(piece, fromId);
  if (!ref) return;
  ref.bar.ties ||= [];
  ref.bar.ties.push({ from: fromId, to: toId });
}

export function createEventAt(piece, barIndex, voiceIndex, start, baseDur, dots = 0, explicitRest = false) {
  const refBar = piece.bars[barIndex];
  const barLen = barLengthBeats(refBar, piece);
  const templateVoice = refBar?.voices?.[voiceIndex] || refBar?.voices?.[0];
  const templateId = templateVoice?.id || "melody";
  const templateStem = templateVoice?.stemDirection ?? 1;
  const totalBeats = durationWithDotsBeats(baseDur.replace("r", ""), dots);

  let remaining = normalizeBeats(totalBeats);
  let currentStart = normalizeBeats(start);
  let currentBar = barIndex;
  let firstId = null;
  let prevId = null;

  while (remaining > 0) {
    while (currentStart >= barLen) {
      currentStart = normalizeBeats(currentStart - barLen);
      currentBar += 1;
    }
    while (currentBar >= piece.bars.length) {
      piece.bars.push(createEmptyBarLike(refBar));
    }

    const remainingInBar = normalizeBeats(barLen - currentStart);
    const segment = Math.min(remaining, remainingInBar);
    const parts = durationPartsFromBeats(segment);

    for (const part of parts) {
      const barRef = piece.bars[currentBar];
      let vi = barRef.voices.findIndex(v => v.id === templateId);
      if (vi === -1) {
        barRef.voices.push({ id: templateId, stemDirection: templateStem, events: [] });
        vi = barRef.voices.length - 1;
      }
      const id = makeId("n");
      const ev = {
        id,
        start: currentStart,
        duration: `${part.dur}r`,
        dots: part.dots,
        tones: []
      };
      piece.bars[currentBar].voices[vi].events.push(ev);
      if (!firstId) firstId = id;
      if (prevId && !explicitRest) addTie(piece, prevId, id);
      prevId = id;
      currentStart = normalizeBeats(currentStart + part.beats);
      remaining = normalizeBeats(remaining - part.beats);
    }

    if (currentStart >= barLen) {
      currentStart = 0;
      currentBar += 1;
    }
  }

  piece.bars.forEach(b => {
    const vi = b.voices.findIndex(v => v.id === templateId);
    if (vi >= 0) {
      b.voices[vi].events.sort((a, b) => a.start - b.start);
    }
  });

  return { piece, newEventId: firstId };
}

export function createNextEvent(piece, eventId, opts = {}) {
  const next = clone(piece);
  const ref = findEventRef(next, eventId);
  if (!ref) return { piece: next, newEventId: null, newEventBar: null };

  const barLen = barLengthBeats(ref.bar, next);
  const cur = ref.ev;
  const baseDur = opts.duration || cur.duration;
  const explicitRest = !!opts.explicitRest;
  const dots = opts.dots || 0;
  const step = durationWithDotsBeats(baseDur.replace("r", ""), dots);

  let newStart = (cur.start ?? 0) + step;
  let barIndex = ref.bi;

  while (newStart >= barLen) {
    newStart -= barLen;
    barIndex += 1;
  }

  while (barIndex >= next.bars.length) {
    next.bars.push(createEmptyBarLike(ref.bar));
  }

  let remaining = normalizeBeats(durationWithDotsBeats(baseDur.replace("r", ""), dots));
  let currentStart = newStart;
  let currentBar = barIndex;
  let firstId = null;
  let firstBar = null;
  let prevId = null;

  while (remaining > 0) {
    while (currentStart >= barLen) {
      currentStart -= barLen;
      currentBar += 1;
    }
    while (currentBar >= next.bars.length) {
      next.bars.push(createEmptyBarLike(ref.bar));
    }

    const remainingInBar = normalizeBeats(barLen - currentStart);
    const segment = Math.min(remaining, remainingInBar);
    const parts = durationPartsFromBeats(segment);

    for (const part of parts) {
      const id = makeId("n");
      const ev = {
        id,
        start: currentStart,
        duration: `${part.dur}r`,
        dots: part.dots,
        tones: []
      };
      next.bars[currentBar].voices[ref.vi].events.push(ev);
      if (!firstId) {
        firstId = id;
        firstBar = currentBar;
      }
      if (prevId && !explicitRest) addTie(next, prevId, id);
      prevId = id;
      currentStart = normalizeBeats(currentStart + part.beats);
      remaining = normalizeBeats(remaining - part.beats);
    }

    if (currentStart >= barLen) {
      currentStart = 0;
      currentBar += 1;
    }
  }

  next.bars.forEach(b => {
    b.voices[ref.vi].events.sort((a, b) => a.start - b.start);
  });

  return { piece: next, newEventId: firstId, newEventBar: firstBar };
}

export function isOnBeat(value, beatUnit) {
  const eps = 1e-6;
  return Math.abs((value / beatUnit) - Math.round(value / beatUnit)) < eps;
}

export function restFitsBoundary(start, dur, beatUnit) {
  const end = start + dur;
  const eps = 1e-6;
  if (dur < beatUnit - eps) {
    return Math.floor(start / beatUnit) === Math.floor((end - eps) / beatUnit);
  }
  return isOnBeat(start, beatUnit) && isOnBeat(end, beatUnit);
}

function restOptionsForMax(maxBeats) {
  const eps = 1e-6;
  return DURATION_OPTIONS.filter(opt => opt.beats <= maxBeats + eps);
}

function chooseRestForSpan(start, remaining, beatUnit, options) {
  const eps = 1e-6;
  for (const opt of options) {
    if (opt.beats > remaining + eps) continue;
    const startAligned = isOnBeat(start, beatUnit);
    const endAligned = isOnBeat(start + opt.beats, beatUnit);
    const dottedOk = opt.dots ? (startAligned && endAligned) : true;
    if (!dottedOk) continue;
    if (restFitsBoundary(start, opt.beats, beatUnit)) return opt;
  }
  return options[options.length - 1];
}

export function formatRestsForUnit(remaining, startAt, beatUnit, hidden, { maxBeats, quantizeUnit } = {}) {
  const rests = [];
  const quantize = quantizeUnit ? (v) => quantizeBeats(v, quantizeUnit) : roundBeat;
  let cursor = quantize(startAt);
  let left = quantize(remaining);
  const eps = 1e-6;
  const options = restOptionsForMax(maxBeats ?? Infinity);

  while (left > eps) {
    const opt = chooseRestForSpan(cursor, left, beatUnit, options);
    rests.push({
      id: makeId("r"),
      start: cursor,
      duration: `${opt.dur}r`,
      dots: opt.dots,
      tones: [],
      hidden
    });
    cursor = quantize(cursor + opt.beats);
    left = quantize(left - opt.beats);
  }
  return rests;
}

export function formatRests(remaining, startAt, bar, hidden) {
  const [beats, beatValue] = (bar.meta?.timeSig || [4, 4]);
  let beatUnit = 4 / beatValue;
  const isCompound = beatValue === 8 && beats % 3 === 0 && beats > 3;
  if (isCompound) beatUnit *= 3;
  return formatRestsForUnit(remaining, startAt, beatUnit, hidden, { quantizeUnit: 0.125 });
}

export function isRestEvent(ev) {
  return !!(ev && ev.duration && ev.duration.includes("r") && (!ev.tones || ev.tones.length === 0));
}

export function isSoundingEvent(ev) {
  return !!(ev && ev.tones && ev.tones.length > 0 && !ev.duration.includes("r"));
}

export function isAutoRest(ev) {
  return !!(ev && ev.autoRest);
}

function tupletFactor(def) {
  if (!def) return 1;
  if (!Number.isFinite(def.numNotes) || !Number.isFinite(def.notesOccupied) || def.numNotes === 0) {
    return 1;
  }
  return def.notesOccupied / def.numNotes;
}

function scaledDurationBeats(ev, tupletsById) {
  const def = ev.tupletGroupId ? tupletsById.get(ev.tupletGroupId) : null;
  const factor = tupletFactor(def);
  return durationWithDotsBeats(ev.duration, ev.dots || 0) * factor;
}

function eventSpanBeats(ev, tupletsById) {
  const start = ev.start ?? 0;
  const len = scaledDurationBeats(ev, tupletsById);
  return { start, end: start + len, len };
}

export function getEventSpanBeats(ev, bar) {
  const tupletsById = new Map((bar.tuplets || []).map(t => [t.id, t]));
  return eventSpanBeats(ev, tupletsById);
}

function fillTupletRestsForVoice(bar, voice) {
  const tupletsById = new Map((bar.tuplets || []).map(t => [t.id, t]));
  const groups = new Map();

  voice.events.forEach(ev => {
    if (!ev.tupletGroupId) return;
    if (isHiddenRestFiller(ev)) return;
    if (!groups.has(ev.tupletGroupId)) groups.set(ev.tupletGroupId, []);
    groups.get(ev.tupletGroupId).push(ev);
  });

  groups.forEach((events, tid) => {
    const def = tupletsById.get(tid);
    if (!def || !events.length) return;

    const factor = tupletFactor(def);
    const sorted = [...events].sort((a, b) => (a.start ?? 0) - (b.start ?? 0));
    const startAt = sorted[0].start ?? 0;
    const unitBeats = def.unitBeats || durationWithDotsBeats(sorted[0].duration, sorted[0].dots || 0);
    const expectedSpan = unitBeats * def.notesOccupied;

    const spans = sorted.map(ev => eventSpanBeats(ev, tupletsById));
    const maxEnd = spans.reduce((acc, s) => Math.max(acc, s.end), startAt);
    const expectedEnd = Math.max(startAt + expectedSpan, maxEnd);

    let cursor = startAt;
    spans.forEach(span => {
      if (span.start > cursor + 1e-6) {
        const gap = span.start - cursor;
        const unscaledGap = gap / factor;
        const restParts = formatRestsForUnit(unscaledGap, 0, unitBeats, false, {
          maxBeats: unitBeats,
          quantizeUnit: null
        });
        restParts.forEach(part => {
          voice.events.push({
            id: makeId("r"),
            start: cursor,
            duration: part.duration,
            dots: part.dots,
            tones: [],
            tupletGroupId: tid,
            autoRest: true
          });
          cursor = roundBeat(cursor + durationWithDotsBeats(part.duration.replace("r", ""), part.dots || 0) * factor);
        });
      }
      cursor = Math.max(cursor, span.end);
    });

    if (expectedEnd > cursor + 1e-6) {
      const gap = expectedEnd - cursor;
      const unscaledGap = gap / factor;
      const restParts = formatRestsForUnit(unscaledGap, 0, unitBeats, false, {
        maxBeats: unitBeats,
        quantizeUnit: null
      });
      restParts.forEach(part => {
        voice.events.push({
          id: makeId("r"),
          start: cursor,
          duration: part.duration,
          dots: part.dots,
          tones: [],
          tupletGroupId: tid,
          autoRest: true
        });
        cursor = roundBeat(cursor + durationWithDotsBeats(part.duration.replace("r", ""), part.dots || 0) * factor);
      });
    }
  });
}

export function pruneRestEventsFrom(piece, eventId) {
  const ref = findEventRef(piece, eventId);
  if (!ref) return piece;
  const start = ref.ev.start ?? 0;
  ref.voice.events = ref.voice.events.filter(ev =>
    ev.id === eventId || !isRestEvent(ev) || (ev.start ?? 0) < start
  );
  return piece;
}

export function consolidateRestsIfEmpty(piece, barIndex, voiceIndex) {
  const bar = piece.bars?.[barIndex];
  const voice = bar?.voices?.[voiceIndex];
  if (!bar || !voice) return piece;
  const hasSounding = voice.events.some(ev => ev.tones && ev.tones.length > 0 && !ev.duration.includes("r"));
  if (hasSounding) return piece;
  const barLen = barLengthBeats(bar, piece);
  voice.events = formatRests(barLen, 0, bar, false).map(r => ({ ...r, autoRest: true }));
  return piece;
}

export function consolidateRestsForBar(piece, barIndex, voiceIndex) {
  const bar = piece.bars?.[barIndex];
  const voice = bar?.voices?.[voiceIndex];
  if (!bar || !voice) return piece;

  const sounding = voice.events
    .filter(isSoundingEvent)
    .sort((a, b) => a.start - b.start);

  const rebuilt = [];
  let cursor = 0;
  sounding.forEach(ev => {
    const gap = normalizeBeats((ev.start ?? 0) - cursor);
    if (gap > 0) {
      rebuilt.push(...formatRests(gap, cursor, bar, false).map(r => ({ ...r, autoRest: true })));
    }
    rebuilt.push(ev);
    cursor = normalizeBeats((ev.start ?? 0) + durationWithDotsBeats(ev.duration, ev.dots || 0));
  });
  const tail = normalizeBeats(barLengthBeats(bar, piece) - cursor);
  if (tail > 0) {
    rebuilt.push(...formatRests(tail, cursor, bar, false).map(r => ({ ...r, autoRest: true })));
  }

  voice.events = rebuilt.sort((a, b) => a.start - b.start);
  return piece;
}

export function normalizeVoiceForEvent(piece, eventId, { reflow = false } = {}) {
  const ref = findEventRef(piece, eventId);
  if (!ref) return piece;

  const barLen = barLengthBeats(ref.bar, piece);
  let events = [...ref.voice.events]
    .filter(e => !isHiddenRestFiller(e))
    .sort((a, b) => a.start - b.start);
  const hasTuplets = events.some(e => e.tupletGroupId);

  if (reflow && !hasTuplets) {
    let t = 0;
    events.forEach(ev => {
      ev.start = t;
      t += durationWithDotsBeats(ev.duration, ev.dots || 0);
    });
  }

  if (hasTuplets) {
    fillTupletRestsForVoice(ref.bar, ref.voice);
    const tupletsById = new Map((ref.bar.tuplets || []).map(t => [t.id, t]));
    const spans = ref.voice.events
      .filter(e => !isHiddenRestFiller(e))
      .map(e => eventSpanBeats(e, tupletsById))
      .sort((a, b) => a.start - b.start);
    let cursor = 0;
    spans.forEach(span => {
    if (span.start > cursor + 1e-6) {
      ref.voice.events.push(...formatRests(span.start - cursor, cursor, ref.bar, false).map(r => ({ ...r, autoRest: true })));
    }
    cursor = Math.max(cursor, span.end);
  });
  if (cursor < barLen - 1e-6) {
    ref.voice.events.push(...formatRests(barLen - cursor, cursor, ref.bar, false).map(r => ({ ...r, autoRest: true })));
  }
    ref.voice.events.sort((a, b) => a.start - b.start);
    return piece;
  }

  const evIndex = events.findIndex(e => e.id === eventId);
  let total = events.reduce((sum, ev) => sum + durationWithDotsBeats(ev.duration, ev.dots || 0), 0);
  total = normalizeBeats(total);

  if (total > barLen) {
    while (events.length) {
      const last = events[events.length - 1];
      if (!(last.hidden && last.duration.includes("r"))) break;
      events.pop();
    }
    total = events.reduce((sum, ev) => sum + durationWithDotsBeats(ev.duration, ev.dots || 0), 0);
    total = normalizeBeats(total);
  }

  if (total > barLen && evIndex !== -1 && !reflow) {
    const ev = events[evIndex];
    const evDur = durationWithDotsBeats(ev.duration, ev.dots || 0);
    const otherTotal = normalizeBeats(total - evDur);
    const remaining = normalizeBeats(barLen - otherTotal);
    if (remaining > 0) {
      const pick = chooseDurationForBeats(remaining);
      const isRest = ev.duration.includes("r");
      ev.duration = isRest ? `${pick.dur}r` : pick.dur;
      if (pick.dots) ev.dots = pick.dots;
      else delete ev.dots;
    }
    total = events.reduce((sum, e) => sum + durationWithDotsBeats(e.duration, e.dots || 0), 0);
    total = normalizeBeats(total);
  }

  if (total > barLen) {
    const cutIndex = evIndex !== -1 ? evIndex + 1 : events.length;
    events = events.slice(0, cutIndex);
    total = events.reduce((sum, e) => sum + durationWithDotsBeats(e.duration, e.dots || 0), 0);
    total = normalizeBeats(total);
  }

  if (total < barLen) {
    const last = events[events.length - 1];
    const startAt = last ? last.start + durationWithDotsBeats(last.duration, last.dots || 0) : 0;
    events.push(...formatRests(barLen - total, startAt, ref.bar, false));
  }

  ref.voice.events = events.sort((a, b) => a.start - b.start);
  return piece;
}
