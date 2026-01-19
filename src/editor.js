    import { showModal } from "./modal.js";

    const PIECE_JSON = {
      defaults: { timeSig: [4, 4], keySig: "Eb", clef: "treble" },
      tuningMidiByString: { 6: 40, 5: 45, 4: 50, 3: 55, 2: 59, 1: 64 },
      bars: [
        {
          meta: {
            section: { label: "A" }
          },
          tuplets: [{ id: "t1", numNotes: 6, notesOccupied: 4, ratioed: false, bracketed: false }],
          guitar: [
      { type: "hammer", from: "b1n2", to: "b1n3" },
      { type: "pull",   from: "b1n5", to: "b1n6" },
      { type: "slide",  from: "b1n8", to: "b1n9" },
      { type: "bend",   on: "b1n9", amount: "1/2" } // amount: "1/2" | "full" | "1 1/2" ...
    ],
          voices: [
            {
              id: "melody",
              stemDirection: 1,
              events: [
                { id: "b1n1", start: 0 + 0/6, duration: "16", tupletGroupId: "t1", chord: "C7alt", tones: [{ string: 1, fret: 8 }] },
                { id: "b1n2", start: 0 + 1/6, duration: "16", tupletGroupId: "t1", tones: [{ string: 1, fret: 7 }] },
                { id: "b1n3", start: 0 + 2/6, duration: "16", tupletGroupId: "t1", tones: [{ string: 1, fret: 6 }] },
                { id: "b1n4", start: 0 + 3/6, duration: "16", tupletGroupId: "t1", tones: [{ string: 2, fret: 8 }] },
                { id: "b1n5", start: 0 + 4/6, duration: "16", tupletGroupId: "t1", tones: [{ string: 2, fret: 7 }] },
                { id: "b1n6", start: 0 + 5/6, duration: "16", tupletGroupId: "t1", tones: [{ string: 2, fret: 6 }] },

                { id: "b1n7", start: 1.0, duration: "8", dots: 1, chord: "Bb7", tones: [{ string: 2, fret: 2 }] },
                { id: "b1n8", start: 1.75, duration: "16", tones: [{ string: 2, fret: 1 }] },
                { id: "b1n9", start: 2.0, duration: "q", chord: "Ebmaj7", tones: [{ string: 3, fret: 3 }] },
                { id: "b1n10", start: 3.0, duration: "q", chord: "Ab7", tones: [{ string: 3, fret: 1 }] }
              ]
            }
          ],
          ties: [{ from: "b1n7", to: "b1n8" }],
          slurs: [{ from: "b1n2", to: "b1n6" }]
        },

        {
          meta: {
            barline: { left: "single" }
          },
          tuplets: [{ id: "t2", numNotes: 6, notesOccupied: 4, ratioed: false, bracketed: false }],
          voices: [
            {
              id: "melody",
              stemDirection: 1,
              events: [
                { id: "b2n1", start: 0 + 0/6, duration: "16", tupletGroupId: "t2", chord: "Dbmaj7", tones: [{ string: 2, fret: 6 }] },
                { id: "b2n2", start: 0 + 1/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 2, fret: 5 }] },
                { id: "b2n3", start: 0 + 2/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 2, fret: 4 }] },
                { id: "b2n4", start: 0 + 3/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 3, fret: 6 }] },
                { id: "b2n5", start: 0 + 4/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 3, fret: 5 }] },
                { id: "b2n6", start: 0 + 5/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 3, fret: 4 }] },

                { id: "b2n7", start: 1.0, duration: "q", chord: "G7", tones: [{ string: 3, fret: 0 }] },
                { id: "b2n8", start: 2.0, duration: "q", chord: "C-7", tones: [{ string: 4, fret: 5 }] },
                { id: "b2n9", start: 3.0, duration: "8", chord: "F7", tones: [{ string: 2, fret: 6 }, { string: 1, fret: 8 }] },
                { id: "b2n9", start: 3.5, duration: "8", chord: "F7", tones: [{ string: 2, fret: 6 }, { string: 1, fret: 8 }] }
              ]
            }
          ]
        },

        {
          meta: {
            barline: { left: "single", right: "final" }
          },
          tuplets: [{ id: "t2", numNotes: 6, notesOccupied: 4, ratioed: false, bracketed: false }],
          voices: [
            {
              id: "melody",
              stemDirection: 1,
              events: [
                { id: "b2n1", start: 0 + 0/6, duration: "16", tupletGroupId: "t2", chord: "Dbmaj7", tones: [{ string: 2, fret: 6 }] },
                { id: "b2n2", start: 0 + 1/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 2, fret: 5 }] },
                { id: "b2n3", start: 0 + 2/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 2, fret: 4 }] },
                { id: "b2n4", start: 0 + 3/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 3, fret: 6 }] },
                { id: "b2n5", start: 0 + 4/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 3, fret: 5 }] },
                { id: "b2n6", start: 0 + 5/6, duration: "16", tupletGroupId: "t2", tones: [{ string: 3, fret: 4 }] },

                { id: "b2n7", start: 1.0, duration: "q", chord: "G7", tones: [{ string: 3, fret: 0 }] },
                { id: "b2n8", start: 2.0, duration: "q", chord: "C-7", tones: [{ string: 4, fret: 5 }] },
                { id: "b2n9", start: 3.0, duration: "8", chord: "F7", tones: [{ string: 2, fret: 6 }, { string: 1, fret: 8 }] },
                { id: "b2n9", start: 3.5, duration: "8", chord: "F7", tones: [{ string: 2, fret: 6 }, { string: 1, fret: 8 }] }
              ]
            }
          ]
        }
      ]
    };
    const EMPTY_PIECE = {
      defaults: { timeSig: [4, 4], keySig: "C", clef: "treble" },
      tuningMidiByString: { 6: 40, 5: 45, 4: 50, 3: 55, 2: 59, 1: 64 },
      bars: [
        {
          meta: {},
          voices: [
            {
              id: "melody",
              stemDirection: 1,
              events: [
                { id: "b1n1", start: 0, duration: "wr", tones: [] }
              ]
            }
          ]
        }
      ]
    };


    export function initTabEditor() {
      if (customElements.get("jg-score-view")) return;
      if (window.Vex && window.Vex.Flow) {
        initJGScoreView();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/vexflow@4.2.3/build/cjs/vexflow.js";
      script.onload = () => initJGScoreView();
      document.head.appendChild(script);
    }

    // Drop-in upgrade: adds an overlay â€œinline editorâ€ (selection, keyboard nav, fret entry, duration/tech controls)
    // Paste this whole block over your existing initJGScoreView() function body (same name), or merge the marked sections.

    function initJGScoreView() {
      if (customElements.get("jg-score-view")) return;
      const { Flow } = window.Vex;

      // ---------- Layout knobs ----------
      const DEFAULT_SYSTEM_W = 900;
      const PAD_L = 20;
      const PAD_R = 20;

      const TOP_LANE = 34;               // chord lane
      const STAVE_Y0 = 60 + TOP_LANE;    // first row notation y
      const TAB_GAP = 110;               // notation->tab gap
      const SYSTEM_GAP = 85;             // gap between system rows (tab -> next notation)

      const MIN_BAR_W = 140;
      const BAR_PAD = 24;
      const BARLINE_PAD_R = 14;
      const LAST_ROW_BONUS = 80;

      const CHORD_FONT = { family: "Arial", size: 14, weight: "" };
      const STORAGE_KEY = "jg-tab-editor:piece";

      const BASE_LEFT_INSET = (() => {
        const s = new Flow.Stave(0, 0, 100);
        return s.getNoteStartX() - s.getX();
      })();

      const DURATION_OPTIONS = [
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

      const KEY_SIG_OPTIONS = [
        { value: "", label: "Key (inherit)" },
        { value: "C", label: "C (0)" },
        { value: "G", label: "G (1 sharp)" },
        { value: "D", label: "D (2 sharps)" },
        { value: "A", label: "A (3 sharps)" },
        { value: "E", label: "E (4 sharps)" },
        { value: "B", label: "B (5 sharps)" },
        { value: "F#", label: "F# (6 sharps)" },
        { value: "C#", label: "C# (7 sharps)" },
        { value: "F", label: "F (1 flat)" },
        { value: "Bb", label: "Bb (2 flats)" },
        { value: "Eb", label: "Eb (3 flats)" },
        { value: "Ab", label: "Ab (4 flats)" },
        { value: "Db", label: "Db (5 flats)" },
        { value: "Gb", label: "Gb (6 flats)" },
        { value: "Cb", label: "Cb (7 flats)" }
      ];

      const TIME_SIG_OPTIONS = [
        { value: "", label: "Time (inherit)" },
        { value: "4/4", label: "4/4" },
        { value: "3/4", label: "3/4" },
        { value: "2/4", label: "2/4" },
        { value: "5/4", label: "5/4" },
        { value: "6/8", label: "6/8" },
        { value: "7/8", label: "7/8" },
        { value: "9/8", label: "9/8" },
        { value: "12/8", label: "12/8" },
        { value: "custom", label: "Custom..." }
      ];

      const BARLINE_OPTIONS = [
        { value: "", label: "Barline (none)" },
        { value: "single", label: "Single" },
        { value: "double", label: "Double" },
        { value: "final", label: "Final" },
        { value: "repeat_begin", label: "Repeat Begin" },
        { value: "repeat_end", label: "Repeat End" },
        { value: "none", label: "Invisible" }
      ];

      let ID_SEQ = 1;
      function makeId(prefix = "e") {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return `${prefix}${crypto.randomUUID()}`;
        }
        return `${prefix}${Date.now().toString(36)}_${(ID_SEQ++)}`;
      }

      // ---------- Pitch helpers ----------
      const NOTE_NAMES_FLAT = ["c","db","d","eb","e","f","gb","g","ab","a","bb","b"];
      const NOTE_NAMES_SHARP = ["c","c#","d","d#","e","f","f#","g","g#","a","a#","b"];

      const FLAT_KEYS = new Set(["F","Bb","Eb","Ab","Db","Gb","Cb"]);
      const SHARP_KEYS = new Set(["G","D","A","E","B","F#","C#"]);

      function chooseSpellingList(keySig, prefer = "key") {
        if (prefer === "flats") return NOTE_NAMES_FLAT;
        if (prefer === "sharps") return NOTE_NAMES_SHARP;
        if (FLAT_KEYS.has(keySig)) return NOTE_NAMES_FLAT;
        if (SHARP_KEYS.has(keySig)) return NOTE_NAMES_SHARP;
        return NOTE_NAMES_FLAT;
      }

      const NOTATION_OCTAVE_OFFSET = 12;

      function midiToKey(midi, noteNames) {
        const pc = ((midi % 12) + 12) % 12;
        const octave = Math.floor(midi / 12) - 1;
        return `${noteNames[pc]}/${octave}`;
      }

      function toneToMidi(tone, tuningMidiByString) {
        return tuningMidiByString[tone.string] + tone.fret;
      }

      // ---------- Duration helpers ----------
      const DURATION_BEATS = { w: 4, h: 2, q: 1, "8": 0.5, "16": 0.25, "32": 0.125 };
      function baseDuration(duration) {
        return DURATION_BEATS[duration.replace("r", "")] ?? 0;
      }
      function durationForBeats(beats) {
        const entries = Object.entries(DURATION_BEATS);
        for (const [dur, val] of entries) {
          if (Math.abs(val - beats) < 1e-6) return dur;
        }
        return null;
      }
      function applyDotsToNote(note, dots = 0) {
        if (!dots) return;
        if (typeof note.addDotToAll === "function") {
          for (let i = 0; i < dots; i++) note.addDotToAll();
          return;
        }
        if (Flow.Dot && typeof Flow.Dot.buildAndAttach === "function") {
          for (let i = 0; i < dots; i++) Flow.Dot.buildAndAttach([note], { all: true });
        }
      }
      function durationWithDotsBeats(duration, dots = 0) {
        const b = baseDuration(duration);
        let add = 0, frac = b / 2;
        for (let i = 0; i < dots; i++) { add += frac; frac /= 2; }
        return b + add;
      }

      function shouldUseSoftMode(events, barLen) {
        const eps = 1e-6;
        if (events.some(e => e.tupletGroupId)) return true;
        const total = events.reduce((sum, ev) =>
          sum + durationWithDotsBeats(ev.duration.replace("r", ""), ev.dots || 0), 0);
        return total > barLen + eps;
      }

      function barIsPolyphonic(bar) {
        const soundingVoices = bar.voices.filter(v =>
          v.events.some(ev => !ev.duration.includes("r") && ev.tones && ev.tones.length > 0)
        );
        return soundingVoices.length >= 2;
      }

      function computeGridStep(bar) {
        let min = null;
        bar.voices.forEach(v => {
          v.events.forEach(ev => {
            if (isHiddenRestFiller(ev)) return;
            const beats = baseDuration(ev.duration);
            if (!beats) return;
            if (min === null || beats < min) min = beats;
          });
        });
        return min;
      }

      // ---------- Beaming ----------
      function createBeamsForVoice(sortedEvents, tickables, { autoStem = false } = {}) {
        const beams = [];
        const maxBeamDur = 0.5;

        let group = [];
        let groupBeat = null;
        let groupTuplet = null;

        const flush = () => {
          if (group.length >= 2) beams.push(new Flow.Beam(group, { auto_stem: autoStem }));
          group = [];
          groupBeat = null;
          groupTuplet = null;
        };

        sortedEvents.forEach((ev, i) => {
          const note = tickables[i];
          const isRest = ev.duration.includes("r") || ev.tones.length === 0;
          const durForBeam = baseDuration(ev.duration);
          const beatIndex = Math.floor(ev.start);
          const tupletId = ev.tupletGroupId || null;

          const beamable = !isRest && durForBeam > 0 && durForBeam <= maxBeamDur;
          if (!beamable) return flush();

          if (group.length === 0) {
            group.push(note);
            groupBeat = beatIndex;
            groupTuplet = tupletId;
            return;
          }

          const sameTuplet = tupletId === groupTuplet;
          const allowCrossBeat = tupletId && sameTuplet;
          const sameBeat = beatIndex === groupBeat;

          if ((sameBeat || allowCrossBeat) && sameTuplet) group.push(note);
          else { flush(); group.push(note); groupBeat = beatIndex; groupTuplet = tupletId; }
        });

        flush();
        return beams;
      }

      // ---------- Tuplets ----------
      function buildTupletsForVoice(sortedEvents, tickables, barTuplets) {
        const tupletsById = new Map((barTuplets || []).map(t => [t.id, t]));
        const notesByTuplet = new Map();

        sortedEvents.forEach((ev, i) => {
          const tid = ev.tupletGroupId;
          if (!tid) return;
          if (!notesByTuplet.has(tid)) notesByTuplet.set(tid, []);
          notesByTuplet.get(tid).push(tickables[i]);
        });

        const tupletObjects = [];
        for (const [tid, notes] of notesByTuplet.entries()) {
          const def = tupletsById.get(tid);
          if (!def || notes.length < 2) continue;

          const tup = new Flow.Tuplet(notes, {
            num_notes: def.numNotes,
            notes_occupied: def.notesOccupied,
            ratioed: def.ratioed === false ? false : true,
            bracketed: def.bracketed === false ? false : true
          });

          if (typeof tup.setYOffset === "function") tup.setYOffset(6);
          tupletObjects.push(tup);
        }
        return tupletObjects;
      }

      // ---------- Barlines ----------
      function mapBarlineType(name) {
        const t = Flow.Barline.type;
        switch ((name || "single").toLowerCase()) {
          case "double": return t.DOUBLE;
          case "final": return t.END;
          case "repeat_begin":
          case "repeatstart":
          case "repeat-start": return t.REPEAT_BEGIN;
          case "repeat_end":
          case "repeatend":
          case "repeat-end": return t.REPEAT_END;
          case "none": return t.NONE;
          case "single":
          default: return t.SINGLE;
        }
      }

      // ---------- Slurs & ties ----------
      function buildTies(ties, noteById) {
        const out = [];
        (ties || []).forEach(t => {
          const a = noteById.get(t.from);
          const b = noteById.get(t.to);
          if (!a || !b) return;
          out.push(new Flow.StaveTie({
            first_note: a,
            last_note: b,
            first_indices: [t.fromIndex ?? 0],
            last_indices: [t.toIndex ?? 0]
          }));
        });
        return out;
      }

      function buildTiesGlobal(ties, noteById) {
        return buildTies(ties, noteById);
      }

      function buildSlurs(slurs, noteById) {
        const out = [];
        (slurs || []).forEach(s => {
          const a = noteById.get(s.from);
          const b = noteById.get(s.to);
          if (!a || !b) return;
          out.push(new Flow.Curve(a, b, {
            cps: [{ x: 0, y: 10 }, { x: 0, y: 10 }],
            thickness: 2
          }));
        });
        return out;
      }

      // ---------- Chord lane ----------
      function drawChordLane({ context, y, anchors, leftX, rightX, font = { family: "Arial", size: 14, weight: "" } }) {
        if (!anchors.length) return;

        const PAD = 8;
        const CLAMP_PAD = 2;

        const items = anchors
          .map(a => ({ text: a.text, note: a.note, x: a.note.getAbsoluteX() }))
          .sort((a, b) => a.x - b.x);

        const occupied = [];

        function collides(x0, x1) {
          for (const [a0, a1] of occupied) {
            if (x1 <= a0) return null;
            if (x0 < a1 && x1 > a0) return [a0, a1];
          }
          return null;
        }

        function insertSpan(span) {
          occupied.push(span);
          occupied.sort((p, q) => p[0] - q[0]);
        }

        function findFirstFree(x0, x1) {
          let start = x0;
          let end = x1;
          while (true) {
            const hit = collides(start, end);
            if (!hit) return [start, end];
            const shift = (hit[1] - start) + PAD;
            start += shift;
            end += shift;
            if (end > rightX - CLAMP_PAD) return [start, end];
          }
        }

        context.save();
        context.setFont(font.family, font.size, font.weight || "");

        for (const it of items) {
          const w = context.measureText(it.text).width;
          let x0 = it.x - w / 2;
          let x1 = it.x + w / 2;

          const minX = leftX + CLAMP_PAD;
          const maxX = rightX - CLAMP_PAD;
          if (x0 < minX) { x1 += (minX - x0); x0 = minX; }
          if (x1 > maxX) { x0 -= (x1 - maxX); x1 = maxX; }

          [x0, x1] = findFirstFree(x0, x1);

          if (x0 < minX) { x1 += (minX - x0); x0 = minX; }
          if (x1 > maxX) { x0 -= (x1 - maxX); x1 = maxX; }

          const drawX = (x0 + x1) / 2;
          context.fillText(it.text, drawX - w / 2, y);

          insertSpan([x0, x1]);
        }

        context.restore();
      }

      // ---------- TAB anchor helpers ----------
      function tabYForString(tabStave, str) {
        const line = Math.max(0, Math.min(5, (str ?? 1) - 1));
        return tabStave.getYForLine(line);
      }

      function getTabAnchor(tabStave, tabNote, index = 0) {
        const x = tabNote.getAbsoluteX();
        let str = 1;
        if (tabNote.positions && tabNote.positions.length) {
          const pos = tabNote.positions[Math.max(0, Math.min(tabNote.positions.length - 1, index))];
          str = pos.str;
        }
        const y = tabYForString(tabStave, str);
        return { x, y };
      }

      function drawArrowHead(context, x, y, dx, dy, size = 5) {
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        const px = -uy, py = ux;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - ux * size + px * (size * 0.6), y - uy * size + py * (size * 0.6));
        context.lineTo(x - ux * size - px * (size * 0.6), y - uy * size - py * (size * 0.6));
        context.closePath();
        context.fill();
      }

      function drawGuitarTechniques({ context, tabStave, tech = [], tabNoteById }) {
        if (!tech.length) return;

        context.save();
        context.setFont("Arial", 8, "");
        if (context.setLineWidth) context.setLineWidth(1.2);

        for (const t of tech) {
          const type = (t.type || "").toLowerCase();

          if (type === "hammer" || type === "pull") {
            const a = tabNoteById.get(t.from);
            const b = tabNoteById.get(t.to);
            if (!a || !b) continue;

            const A = getTabAnchor(tabStave, a, t.fromIndex ?? 0);
            const B = getTabAnchor(tabStave, b, t.toIndex ?? 0);

            const midX = (A.x + B.x) / 2;
            const topLineY = tabStave.getYForLine(0);
            const y = topLineY - 4;

            const label = type === "hammer" ? "H" : "P";
            context.fillText(label, midX - context.measureText(label).width / 2, y);
            continue;
          }

          if (type === "slide") {
            const a = tabNoteById.get(t.from);
            const b = tabNoteById.get(t.to);
            if (!a || !b) continue;

            const A = getTabAnchor(tabStave, a, t.fromIndex ?? 0);
            const B = getTabAnchor(tabStave, b, t.toIndex ?? 0);

            const inset = 12;
            const x1 = A.x + inset;
            const y1 = A.y - 3;
            const x2 = B.x - inset;
            const y2 = B.y - 3;

            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            drawArrowHead(context, x2, y2, x2 - x1, y2 - y1, 5);
            continue;
          }

          if (type === "slide-in") {
            const n = tabNoteById.get(t.on);
            if (!n) continue;

            const A = getTabAnchor(tabStave, n, t.index ?? 0);
            const inset = 14;
            const x2 = A.x - 2;
            const y2 = A.y - 3;
            const x1 = x2 - inset;
            const y1 = y2;

            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();

            drawArrowHead(context, x2, y2, x2 - x1, y2 - y1, 5);
            continue;
          }

          if (type === "bend") {
            const n = tabNoteById.get(t.on);
            if (!n) continue;

            const A = getTabAnchor(tabStave, n, t.index ?? 0);

            const up = 22;
            const x = A.x + 14;
            const y1 = A.y - 4;
            const y2 = y1 - up;

            context.beginPath();
            context.moveTo(x, y1);
            context.lineTo(x, y2);
            context.stroke();

            drawArrowHead(context, x, y2, 0, -1, 6);

            const txt = t.amount || "";
            if (txt) context.fillText(txt, x + 6, y2 + 5);
            continue;
          }
        }

        context.restore();
      }

      // ---------- Build runtime for a bar (FRESH objects each render) ----------
      function buildBarRuntime(piece, bar) {
        const tuning = piece.tuningMidiByString;

        const [beats, beatValue] = (bar.meta?.timeSig || piece.defaults?.timeSig || [4, 4]);
        const barLen = beats * (4 / beatValue);
        const keySig = (bar.meta?.keySig || piece.defaults?.keySig || "C");
        const clef = (piece.defaults?.clef || "treble");
        const polyphonic = barIsPolyphonic(bar);

        const notationVoices = [];
        const beams = [];
        const tuplets = [];
        const chordAnchors = [];
        const noteById = new Map();
        const tabNoteById = new Map();

        for (const voiceDef of bar.voices) {
          const sortedEvents = [...voiceDef.events].sort((a, b) => a.start - b.start);

          const tickables = sortedEvents.map(ev => {
            const isRest = ev.duration.includes("r") || ev.tones.length === 0;

            if (isRest) {
              const r = new Flow.StaveNote({ keys: ["b/4"], duration: ev.duration });
              if (ev.hidden) r.setStyle({ fillStyle: "transparent", strokeStyle: "transparent" });
              if (ev.dots) applyDotsToNote(r, ev.dots);
              if (ev.id) noteById.set(ev.id, r);
              return r;
            }

            const noteNames = chooseSpellingList(keySig, piece.defaults?.spelling?.prefer || "key");
            const keys = ev.tones.map(tone => {
              const midi = toneToMidi(tone, tuning) + NOTATION_OCTAVE_OFFSET;
              return midiToKey(midi, noteNames);
            });

            const n = new Flow.StaveNote({ keys, duration: ev.duration });
            if (ev.dots) applyDotsToNote(n, ev.dots);

            if (polyphonic) n.setStemDirection(voiceDef.stemDirection);

            if (ev.id) noteById.set(ev.id, n);
            if (ev.chord) chordAnchors.push({ text: ev.chord, note: n });

            return n;
          });

          const hasTuplets = sortedEvents.some(e => !!e.tupletGroupId);

          const voice = new Flow.Voice({ num_beats: beats, beat_value: beatValue });
          const softMode = shouldUseSoftMode(sortedEvents, barLen);
          voice.setMode(softMode ? Flow.Voice.Mode.SOFT : Flow.Voice.Mode.FULL);
          voice.addTickables(tickables);
          notationVoices.push(voice);

          if (hasTuplets) {
            beams.push(...createBeamsForVoice(sortedEvents, tickables, { autoStem: !polyphonic }));
            tuplets.push(...buildTupletsForVoice(sortedEvents, tickables, bar.tuplets || []));
          } else if (polyphonic) {
            beams.push(...createBeamsForVoice(sortedEvents, tickables, { autoStem: false }));
          } else {
            beams.push(...Flow.Beam.generateBeams(tickables, { beam_rests: false }));
          }
        }

        const tabVoices = [];
        const tabEventsByVoice = [];

        for (const voiceDef of bar.voices) {
          const spineEvents = [...voiceDef.events].sort((a, b) => a.start - b.start);
          const tabTickables = spineEvents.map(ev => {
            const isRest = ev.duration.includes("r") || !ev.tones || ev.tones.length === 0;

            let t;
          if (isRest) {
            t = new Flow.GhostNote({ duration: ev.duration.replace("r", "") });
            if (ev.dots) applyDotsToNote(t, ev.dots);
          } else {
            const positions = ev.tones.map(p => ({ str: p.string, fret: String(p.fret) }));
            t = new Flow.TabNote({ positions, duration: ev.duration });
            if (ev.dots) applyDotsToNote(t, ev.dots);
            t.render_options.draw_stem = false;
          }

            if (ev.id) tabNoteById.set(ev.id, t);
            return t;
          });

          const tabVoice = new Flow.Voice({ num_beats: beats, beat_value: beatValue });
          const tabSoft = shouldUseSoftMode(spineEvents, barLen);
          tabVoice.setMode(tabSoft ? Flow.Voice.Mode.SOFT : Flow.Voice.Mode.FULL);
          tabVoice.addTickables(tabTickables);
          tabVoices.push(tabVoice);
          tabEventsByVoice.push({ voiceId: voiceDef.id, events: spineEvents });

          if (spineEvents.some(e => !!e.tupletGroupId)) {
            buildTupletsForVoice(spineEvents, tabTickables, bar.tuplets || []);
          }
        }

        const ties = buildTies(bar.ties, noteById);
        const slurs = buildSlurs(bar.slurs, noteById);

        return {
          beats, beatValue, keySig, clef, polyphonic,
          notationVoices, tabVoices, tabNoteById,
          beams, tuplets,
          chordAnchors,
          ties, slurs,
          noteById,
          tabEventsByVoice
        };
      }

      // ---------- Measure min width ----------
      function modifierLeftInset({ clef, keySig, timeSig, cancelKey }) {
        const s = new Flow.Stave(0, 0, 100);
        if (clef) s.addClef(clef);
        if (timeSig) s.addTimeSignature(`${timeSig[0]}/${timeSig[1]}`);
        if (keySig) s.addKeySignature(keySig, cancelKey);
        return s.getNoteStartX() - s.getX();
      }

      function measureBarMinWidth(runtime) {
        const voices = [...runtime.notationVoices, ...(runtime.tabVoices || [])];
        const f = new Flow.Formatter();
        const w = f.preCalculateMinTotalWidth(voices);
        const base = Math.max(MIN_BAR_W, Math.ceil(w + BAR_PAD + BARLINE_PAD_R));

        const timeSig = [runtime.beats, runtime.beatValue];
          const insetWithModifiers = modifierLeftInset({
            clef: runtime.clef,
            keySig: runtime.keySig,
            timeSig,
            cancelKey: null
          });
        const extraFirst = Math.max(0, Math.ceil(insetWithModifiers - BASE_LEFT_INSET));

        return { base, extraFirst };
      }

      // ---------- Line breaking ----------
      function layoutSystems(barWidths, barExtraFirst, barExtraChange, maxWidth) {
        const systems = [];
        let current = [];
        let used = 0;

        for (let i = 0; i < barWidths.length; i++) {
          const w = barWidths[i];
          if (current.length === 0) {
            current.push(i);
            used = w + barExtraFirst[i];
            continue;
          }
          const extra = barExtraChange[i] || 0;
          if (used + w + extra <= maxWidth) { current.push(i); used += w + extra; }
          else { systems.push(current); current = [i]; used = w + barExtraFirst[i]; }
        }
        if (current.length) systems.push(current);
        return systems;
      }

      function timeSigKey(sig) { return `${sig[0]}/${sig[1]}`; }

      // ============== EDITOR HELPERS (JSON mutations) ==============
      function clone(obj) { return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)); }

      function findEventRef(piece, eventId) {
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

      function ensureToneSlot(ev, stringIndex /*0..5*/) {
        // store tones as array of {string,fret}; we map stringIndex -> actual string number (1..6)
        const str = Math.max(1, Math.min(6, stringIndex + 1));
        ev.tones ||= [];
        // find existing tone on that string
        let ti = ev.tones.findIndex(t => t.string === str);
        if (ti === -1) {
          ev.tones.push({ string: str, fret: 0 });
          // keep tones stable top-to-bottom (1..6)
          ev.tones.sort((a, b) => a.string - b.string);
          ti = ev.tones.findIndex(t => t.string === str);
        }
        return ti;
      }

      function setFret(piece, eventId, stringIndex, fret) {
        const next = clone(piece);
        const ref = findEventRef(next, eventId);
        if (!ref) return next;
        const ti = ensureToneSlot(ref.ev, stringIndex);
        ref.ev.tones[ti].fret = Math.max(0, Math.min(24, fret));
        // if event was a rest, force to sounding
        if (ref.ev.duration.includes("r")) ref.ev.duration = ref.ev.duration.replace("r", "");
        propagateTiedTones(next, ref.ev.id);
        return next;
      }

      function setRest(piece, eventId) {
        const next = clone(piece);
        const ref = findEventRef(next, eventId);
        if (!ref) return next;
        ref.ev.tones = [];
        if (!ref.ev.duration.includes("r")) ref.ev.duration = `${ref.ev.duration}r`;
        return next;
      }

      function setDuration(piece, eventId, dur) {
        const next = clone(piece);
        const ref = findEventRef(next, eventId);
        if (!ref) return next;
        ref.ev.duration = dur;
        if (!ref.ev.tones || ref.ev.tones.length === 0) {
          if (!ref.ev.duration.includes("r")) ref.ev.duration = `${ref.ev.duration}r`;
        }
        return next;
      }

      function applyRestState(piece, eventId, isRest) {
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

      function isHiddenRestFiller(ev) {
        return !!(ev && ev.hidden && ev.duration && ev.duration.includes("r"));
      }

      function toggleDot(piece, eventId) {
        const next = clone(piece);
        const ref = findEventRef(next, eventId);
        if (!ref) return next;
        ref.ev.dots = (ref.ev.dots || 0) ? 0 : 1;
        return next;
      }

      function setChord(piece, eventId, chord) {
        const next = clone(piece);
        const ref = findEventRef(next, eventId);
        if (!ref) return next;
        if (!chord) delete ref.ev.chord;
        else ref.ev.chord = chord;
        return next;
      }

      function addTechnique(piece, type, payload) {
        const next = clone(piece);
        // techniques are stored per bar on bar.guitar
        const ref = findEventRef(next, payload.on || payload.from || payload.to);
        if (!ref) return next;
        ref.bar.guitar ||= [];
        ref.bar.guitar.push({ type, ...payload });
        return next;
      }

      function propagateTiedTones(piece, startId) {
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

      function removeTechnique(piece, predicate) {
        const next = clone(piece);
        next.bars.forEach(b => {
          if (!b.guitar) return;
          b.guitar = b.guitar.filter(t => !predicate(t));
        });
        return next;
      }

      function createEmptyBarLike(bar) {
        return {
          meta: {},
          voices: bar.voices.map(v => ({
            id: v.id,
            stemDirection: v.stemDirection,
            events: []
          }))
        };
      }

      function createEventAt(piece, barIndex, voiceIndex, start, baseDuration, dots = 0, explicitRest = false) {
        const refBar = piece.bars[barIndex];
        const barLen = barLengthBeats(refBar, piece);
        const templateVoice = refBar?.voices?.[voiceIndex] || refBar?.voices?.[0];
        const templateId = templateVoice?.id || "melody";
        const templateStem = templateVoice?.stemDirection ?? 1;
        const baseDur = baseDuration.replace("r", "");
        const totalBeats = durationWithDotsBeats(baseDur, dots);

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

      // naive â€œcreate next noteâ€ (same duration, same voice, next start)
      function createNextEvent(piece, eventId, opts = {}) {
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
            if (!firstId) { firstId = id; firstBar = currentBar; }
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
          b.voices[ref.vi].events.sort((a,b)=>a.start-b.start);
        });

        return { piece: next, newEventId: firstId, newEventBar: firstBar };
      }

      function barLengthBeats(bar, piece) {
        const [beats, beatValue] = (bar.meta?.timeSig || piece.defaults?.timeSig || [4, 4]);
        return beats * (4 / beatValue);
      }

      function normalizeBeats(beats) {
        const unit = 0.125;
        return Math.max(0, Math.round(beats / unit) * unit);
      }

      function chooseDurationForBeats(maxBeats) {
        const eps = 1e-6;
        for (const opt of DURATION_OPTIONS) {
          if (opt.beats <= maxBeats + eps) return opt;
        }
        return DURATION_OPTIONS[DURATION_OPTIONS.length - 1];
      }

      function durationPartsFromBeats(beats) {
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

      function addTie(piece, fromId, toId) {
        const ref = findEventRef(piece, fromId);
        if (!ref) return;
        ref.bar.ties ||= [];
        ref.bar.ties.push({ from: fromId, to: toId });
      }

      function restOptions() {
        return DURATION_OPTIONS;
      }

      function isOnBeat(value, beatUnit) {
        const eps = 1e-6;
        return Math.abs((value / beatUnit) - Math.round(value / beatUnit)) < eps;
      }

      function restFitsBoundary(start, dur, beatUnit) {
        const end = start + dur;
        const eps = 1e-6;
        if (dur < beatUnit - eps) {
          return Math.floor(start / beatUnit) === Math.floor((end - eps) / beatUnit);
        }
        return isOnBeat(start, beatUnit) && isOnBeat(end, beatUnit);
      }

      function chooseRestForSpan(start, remaining, beatUnit) {
        const eps = 1e-6;
        for (const opt of restOptions()) {
          if (opt.beats > remaining + eps) continue;
          const startAligned = isOnBeat(start, beatUnit);
          const endAligned = isOnBeat(start + opt.beats, beatUnit);
          const dottedOk = opt.dots ? (startAligned && endAligned) : true;
          if (!dottedOk) continue;
          if (restFitsBoundary(start, opt.beats, beatUnit)) return opt;
        }
        return restOptions()[restOptions().length - 1];
      }

      function formatRests(remaining, startAt, bar, hidden) {
        const rests = [];
        let cursor = normalizeBeats(startAt);
        let left = normalizeBeats(remaining);
        const [beats, beatValue] = (bar.meta?.timeSig || [4, 4]);
        const beatUnit = 4 / beatValue;
        const eps = 1e-6;

        while (left > eps) {
          const opt = chooseRestForSpan(cursor, left, beatUnit);
          rests.push({
            id: makeId("r"),
            start: cursor,
            duration: `${opt.dur}r`,
            dots: opt.dots,
            tones: [],
            hidden
          });
          cursor = normalizeBeats(cursor + opt.beats);
          left = normalizeBeats(left - opt.beats);
        }
        return rests;
      }

      function isRestEvent(ev) {
        return !!(ev && ev.duration && ev.duration.includes("r") && (!ev.tones || ev.tones.length === 0));
      }

      function isSoundingEvent(ev) {
        return !!(ev && ev.tones && ev.tones.length > 0 && !ev.duration.includes("r"));
      }

      function pruneRestEventsFrom(piece, eventId) {
        const ref = findEventRef(piece, eventId);
        if (!ref) return piece;
        const start = ref.ev.start ?? 0;
        ref.voice.events = ref.voice.events.filter(ev =>
          ev.id === eventId || !isRestEvent(ev) || (ev.start ?? 0) < start
        );
        return piece;
      }

      function consolidateRestsIfEmpty(piece, barIndex, voiceIndex) {
        const bar = piece.bars?.[barIndex];
        const voice = bar?.voices?.[voiceIndex];
        if (!bar || !voice) return piece;
        const hasSounding = voice.events.some(ev => ev.tones && ev.tones.length > 0 && !ev.duration.includes("r"));
        if (hasSounding) return piece;
        const barLen = barLengthBeats(bar, piece);
        voice.events = formatRests(barLen, 0, bar, false);
        return piece;
      }

      function consolidateRestsForBar(piece, barIndex, voiceIndex) {
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
            rebuilt.push(...formatRests(gap, cursor, bar, false));
          }
          rebuilt.push(ev);
          cursor = normalizeBeats((ev.start ?? 0) + durationWithDotsBeats(ev.duration, ev.dots || 0));
        });
        const tail = normalizeBeats(barLengthBeats(bar, piece) - cursor);
        if (tail > 0) {
          rebuilt.push(...formatRests(tail, cursor, bar, false));
        }

        voice.events = rebuilt.sort((a, b) => a.start - b.start);
        return piece;
      }

      function normalizeVoiceForEvent(piece, eventId, { reflow = false } = {}) {
        const ref = findEventRef(piece, eventId);
        if (!ref) return piece;

        const barLen = barLengthBeats(ref.bar, piece);
        let events = [...ref.voice.events]
          .filter(e => !isHiddenRestFiller(e))
          .sort((a, b) => a.start - b.start);
        if (events.some(e => e.tupletGroupId)) return piece;

        if (reflow) {
          let t = 0;
          events.forEach(ev => {
            ev.start = t;
            t += durationWithDotsBeats(ev.duration, ev.dots || 0);
          });
        }

        const evIndex = events.findIndex(e => e.id === eventId);
        let total = events.reduce((sum, ev) => sum + durationWithDotsBeats(ev.duration, ev.dots || 0), 0);
        total = normalizeBeats(total);

        if (total > barLen) {
          // remove trailing hidden rest fillers first
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
          // drop events after the selected one (or from end if not found)
          const cutIndex = evIndex !== -1 ? evIndex + 1 : events.length;
          events = events.slice(0, cutIndex);
          total = events.reduce((sum, e) => sum + durationWithDotsBeats(e.duration, e.dots || 0), 0);
          total = normalizeBeats(total);
        }

        if (total < barLen) {
          const last = events[events.length - 1];
          const startAt = last ? last.start + durationWithDotsBeats(last.duration, last.dots || 0) : 0;
          events.push(...formatRests(barLen - total, startAt, ref.bar, true));
        }

        ref.voice.events = events.sort((a, b) => a.start - b.start);
        return piece;
      }

      // ============== WEB COMPONENT WITH OVERLAY EDITOR ==============
      class JGScoreView extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });

          this.shadowRoot.innerHTML = `
            <style>
              :host { display:block; width:100%; height:100%; box-sizing:border-box;
                      border:1px solid #ccc; padding:8px; border-radius:4px;
                      font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
              .shell { width:100%; display:flex; flex-direction:column; gap:8px; }
              .wrap { position:relative; width:100%; }
              .score-container { width:100%; }

              /* hit targets + selection */
              .hit {
                position:absolute;
                width: 22px; height: 18px;
                transform: translate(-11px, -9px);
                border-radius: 6px;
                cursor: pointer;
              }
              .hit:hover { outline: 1px solid rgba(0,0,0,.15); }
              .hit.selected { outline: 2px solid #00bcd4; box-shadow: 0 0 0 3px rgba(0,188,212,.15); }

              /* caret line */
              .caret {
                position:absolute; top:0; bottom:0;
                width:2px; transform: translateX(-1px);
                background: rgba(0,188,212,.8);
                pointer-events:none;
              }

              /* inspector */
              .inspector {
                width: 100%;
                background: rgba(255,255,255,.96);
                border: 1px solid rgba(0,0,0,.12);
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,.12);
                padding: 10px;
                backdrop-filter: blur(6px);
                box-sizing: border-box;
              }
              .inspector h4 { margin: 0 0 8px; font-size: 13px; letter-spacing:.2px; }
              .toolbar-grid { display:grid; grid-template-columns: 1.2fr 1.1fr 1fr; gap:10px; }
              .group { display:flex; flex-direction:column; gap:6px; }
              .group-title { font-size: 11px; text-transform: uppercase; letter-spacing: .6px; opacity:.6; }
              .row { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
              .row.tight { gap:4px; }
              .btn {
                font: inherit;
                font-size: 12px;
                padding: 6px 8px;
                border-radius: 10px;
                border: 1px solid rgba(0,0,0,.14);
                background: #fff;
                cursor: pointer;
              }
              .btn.on { background: rgba(0,188,212,.12); border-color: rgba(0,188,212,.6); }
              .btn.wide { flex: 1 1 auto; }
              .btn.toggle { font-weight: 600; }
              .btn.toggle.alt { background: #f7f7f7; }
              .btn.pill { border-radius: 999px; padding: 6px 10px; }
              .btn.slim { padding: 4px 8px; font-size: 11px; }
              input[type="text"]{
                font: inherit;
                font-size: 12px;
                padding: 6px 8px;
                border-radius: 10px;
                border: 1px solid rgba(0,0,0,.14);
                width: 100%;
                box-sizing:border-box;
              }
              .label { font-size: 11px; opacity: .7; }
              .title-chip { font-size: 12px; opacity: .8; }
              .divider { height: 1px; background: rgba(0,0,0,.08); margin: 6px 0; }
              .advanced { display:none; }
              .advanced.open { display:block; }
            </style>

            <div class="shell" aria-label="Score editor">
              <div class="inspector">
                <h4>Editing</h4>

                <div class="toolbar-grid">
                  <div class="group">
                    <div class="group-title">Rhythm</div>
                    <div class="row tight">
                      <button class="btn pill dur" data-dur="w">W</button>
                      <button class="btn pill dur" data-dur="h">H</button>
                      <button class="btn pill dur" data-dur="q">Q</button>
                      <button class="btn pill dur" data-dur="8">8</button>
                      <button class="btn pill dur" data-dur="16">16</button>
                      <button class="btn pill dur" data-dur="32">32</button>
                      <button class="btn pill" data-action="dot">.</button>
                    </div>
                    <div class="row">
                      <button class="btn toggle pill" data-action="toggle-rest">Rest</button>
                      <button class="btn toggle pill" data-action="toggle-reflow">Reflow</button>
                      <button class="btn toggle pill alt" data-action="toggle-entry">Entry: Linear</button>
                    </div>
                  </div>

                  <div class="group">
                    <div class="group-title">Pitch + Articulation</div>
                    <div class="row">
                      <input class="chord" type="text" placeholder="Chord (e.g. Ebmaj7)"/>
                    </div>
                    <div class="row">
                      <button class="btn pill" data-action="slur-range">Slur</button>
                      <button class="btn pill" data-action="tie-range">Tie</button>
                      <button class="btn pill" data-action="open-tuplet">Tuplet: 3 in 2</button>
                    </div>
                    <div class="row">
                      <button class="btn pill slim" data-action="tech-h">H</button>
                      <button class="btn pill slim" data-action="tech-p">P</button>
                      <button class="btn pill slim" data-action="tech-slide">Slide</button>
                      <button class="btn pill slim" data-action="tech-slide-in">Slide In</button>
                      <button class="btn pill slim" data-action="tech-bend">Bend</button>
                    </div>
                  </div>

                  <div class="group">
                    <div class="group-title">Structure</div>
                    <div class="row">
                      <button class="btn toggle pill" data-action="toggle-voice">Voice: Melody</button>
                      <button class="btn pill" data-action="add-bass">Add Bass</button>
                      <button class="btn pill" data-action="remove-bass">Remove Bass</button>
                    </div>
                    <div class="row">
                      <button class="btn pill" data-action="open-meta">Meta</button>
                      <span class="title-chip piece-title">Untitled</span>
                    </div>
                    <div class="row">
                      <button class="btn pill" data-action="new-note">New Note</button>
                      <button class="btn pill" data-action="reset-piece">Reset</button>
                      <button class="btn pill" data-action="open-data">Data</button>
                    </div>
                  </div>
                </div>

                <div class="divider"></div>
                <div class="row">
                  <button class="btn pill" data-action="toggle-advanced">Advanced</button>
                  <button class="btn pill" data-action="copy-range">Copy</button>
                  <button class="btn pill" data-action="cut-range">Cut</button>
                  <button class="btn pill" data-action="paste-range">Paste</button>
                  <button class="btn toggle pill" data-action="toggle-paste">Paste: Replace</button>
                  <button class="btn pill" data-action="delete-range">Delete Range</button>
                </div>

                <div class="advanced">
                  <div class="row">
                    <button class="btn pill" data-action="clear-slur">Clear Slur</button>
                    <button class="btn pill" data-action="clear-tie">Clear Tie</button>
                    <button class="btn pill" data-action="clear-tech">Clear Tech</button>
                    <button class="btn pill" data-action="toggle-debug">Debug: Off</button>
                  </div>
                </div>
              </div>
              <div class="wrap" tabindex="0">
                <div class="score-container"></div>

                <!-- overlay layer -->
                <div class="overlay"></div>
                <div class="caret" hidden></div>
              </div>
            </div>
          `;

          this.wrap = this.shadowRoot.querySelector(".wrap");
          this.container = this.shadowRoot.querySelector(".score-container");
          this.overlay = this.shadowRoot.querySelector(".overlay");
          this.caretEl = this.shadowRoot.querySelector(".caret");
          this.inspector = this.shadowRoot.querySelector(".inspector");

          this.piece = null;
          this.systemW = DEFAULT_SYSTEM_W;
          this.restMode = false;
          this.reflowEnabled = false;
          this.entryMode = "linear"; // linear | chord
          this.activeDuration = { dur: "q", dots: 0 };
          this.debugEnabled = false;
          this.tupletSettings = { numNotes: 3, notesOccupied: 2, ratioed: true, bracketed: false };
          this.tupletEntry = { active: false };
          this.advancedOpen = false;
          this._debugLogKey = null;
          this.pasteMode = "replace"; // replace | merge
          this._clipboard = null;
          this._dirty = false;
          this._resizeHandler = () => {
            const next = this.getSystemWidth();
            if (next !== this.systemW) {
              this.systemW = next;
              this.renderScore();
            }
          };

          // selection state
          this.sel = {
            eventId: null,
            stringIndex: 0, // 0..5 corresponds to string 1..6
            voiceId: "melody",
            anchorId: null,
            rangeIds: [],
            rangeStringIndex: 0
          };
          this._fretBuffer = ""; // multi-digit entry
          this._fretBufferTimer = null;

          this._hitIndex = []; // built each render: [{eventId,stringIndex,x,y}]
        }

        connectedCallback() {

          this.shadowRoot.addEventListener("keydown", (e) => this.onKeyDown(e));
          this.wrap.addEventListener("mousedown", () => this.wrap.focus());

          // inspector UI
          this.inspector.addEventListener("click", (e) => this.onInspectorClick(e));
          this.shadowRoot.querySelector(".chord").addEventListener("change", (e) => this.onChordChange(e));

          const loaded = this.loadFromStorage() || clone(PIECE_JSON);
          this.loadPiece(loaded);
          this.systemW = this.getSystemWidth();
          window.addEventListener("resize", this._resizeHandler);
          requestAnimationFrame(() => this.renderScore());
        }

        disconnectedCallback() {
          window.removeEventListener("resize", this._resizeHandler);
        }

        getSystemWidth() {
          const wrapW = this.wrap ? this.wrap.getBoundingClientRect().width : 0;
          const hostW = this.getBoundingClientRect().width;
          const w = Math.floor(wrapW || hostW);
          return Math.max(480, w || DEFAULT_SYSTEM_W);
        }

        markDirty() {
          this._dirty = true;
        }

        persistIfDirty() {
          if (!this._dirty) return;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.piece));
          } catch {
            // ignore storage failures
          }
          this.updateJsonTextarea();
          this._dirty = false;
        }

        loadFromStorage() {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.bars)) return null;
            return parsed;
          } catch {
            return null;
          }
        }

        serializePiece() {
          return JSON.stringify(this.piece, null, 2);
        }

        getPieceClone() {
          return clone(this.piece);
        }

        getEmptyPieceClone() {
          return clone(EMPTY_PIECE);
        }

        updateJsonTextarea() {
          const ta = this.shadowRoot.querySelector(".json-io");
          if (ta) ta.value = this.serializePiece();
        }

        loadPiece(piece) {
          this.piece = piece;
          const firstVoice = this.piece?.bars?.[0]?.voices?.[0];
          const first = firstVoice?.events?.[0]?.id || null;
          const voiceId = firstVoice?.id || "melody";
          this.setSingleSelection(first, 0, voiceId);
          this.updateActiveDurationFromSelection();
          this.markDirty();
          this.renderScore(() => this.syncInspectorFields());
          this.updateJsonTextarea();
        }
        
        setSingleSelection(eventId, stringIndex = this.sel.stringIndex, voiceId = this.sel.voiceId) {
          this.sel.eventId = eventId;
          this.sel.stringIndex = stringIndex;
          if (!voiceId && eventId) {
            const ref = findEventRef(this.piece, eventId);
            voiceId = ref?.voice?.id || voiceId;
          }
          this.sel.voiceId = voiceId || this.sel.voiceId;
          this.sel.anchorId = eventId;
          this.sel.rangeIds = eventId ? [eventId] : [];
          this.sel.rangeStringIndex = stringIndex;
        }

        selectRange(startId, endId, stringIndex = this.sel.stringIndex, voiceId = this.sel.voiceId) {
          if (!startId || !endId) {
            this.setSingleSelection(endId, stringIndex, voiceId);
            return;
          }
          const ordered = this.getOrderedEventRefs(voiceId);
          const orderedIds = ordered.map(o => o.id);
          const a = orderedIds.indexOf(startId);
          const b = orderedIds.indexOf(endId);
          if (a === -1 || b === -1) {
            this.setSingleSelection(endId, stringIndex, voiceId);
            return;
          }
          const lo = Math.min(a, b);
          const hi = Math.max(a, b);
          this.sel.rangeIds = orderedIds.slice(lo, hi + 1);
          this.sel.anchorId = startId;
          this.sel.eventId = endId;
          this.sel.stringIndex = stringIndex;
          this.sel.rangeStringIndex = stringIndex;
          this.sel.voiceId = voiceId;
        }

        exportJsonFile() {
          const text = this.serializePiece();
          const blob = new Blob([text], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "piece.json";
          a.click();
          URL.revokeObjectURL(url);
        }

        async copyJsonToClipboard() {
          const text = this.serializePiece();
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(text);
              return;
            }
          } catch {
            // fall through to textarea copy
          }
          const ta = this.shadowRoot.querySelector(".json-io");
          if (ta) {
            ta.value = text;
            ta.select();
            ta.setSelectionRange(0, ta.value.length);
            try { document.execCommand("copy"); } catch {}
          }
        }

        importJsonFromText(text) {
          if (!text) return;
          try {
            const parsed = JSON.parse(text);
            if (!parsed || !Array.isArray(parsed.bars)) return;
            this.loadPiece(parsed);
          } catch {
            // ignore invalid JSON
          }
        }

        getSelectedEventIds() {
          if (this.sel.rangeIds && this.sel.rangeIds.length) return this.sel.rangeIds;
          return this.sel.eventId ? [this.sel.eventId] : [];
        }

        getOrderedEventRefs(voiceId) {
          const out = [];
          this.piece.bars.forEach((bar, bi) => {
            const vi = this.findVoiceIndex(bar, voiceId);
            if (vi === -1) return;
            const voice = bar.voices[vi];
            const sorted = voice.events
              .filter(ev => !isHiddenRestFiller(ev))
              .map((ev, ei) => ({ ev, ei }))
              .sort((a, b) => (a.ev.start - b.ev.start) || (a.ei - b.ei));
            sorted.forEach(item => out.push({
              id: item.ev.id,
              bi,
              vi,
              ev: item.ev
            }));
          });
          return out;
        }

        getSelectionRefs() {
          const voiceId = this.sel.voiceId || "melody";
          const ordered = this.getOrderedEventRefs(voiceId);
          const ids = new Set(this.getSelectedEventIds());
          return ordered.filter(o => ids.has(o.id));
        }

        getSelectionSpan(refs) {
          if (!refs.length) return null;
          const bar = this.piece.bars[refs[0].bi];
          const barLen = barLengthBeats(bar, this.piece);
          const startRef = refs[0];
          const startAbs = (startRef.bi * barLen) + (startRef.ev.start ?? 0);
          let endAbs = startAbs;
          refs.forEach(r => {
            const dur = durationWithDotsBeats(r.ev.duration.replace("r", ""), r.ev.dots || 0);
            const abs = (r.bi * barLen) + (r.ev.start ?? 0) + dur;
            endAbs = Math.max(endAbs, abs);
          });
          return { barLen, startAbs, endAbs };
        }

        getCurrentBarIndex() {
          const ref = findEventRef(this.piece, this.sel.eventId);
          return ref ? ref.bi : 0;
        }

        getCurrentBar() {
          const bi = this.getCurrentBarIndex();
          return this.piece?.bars?.[bi] || null;
        }

        findVoiceIndex(bar, voiceId) {
          return bar?.voices?.findIndex(v => v.id === voiceId) ?? -1;
        }

        ensureVoiceInBar(voiceId, { stemDirection = 1 } = {}) {
          const next = clone(this.piece);
          const bi = this.getCurrentBarIndex();
          const bar = next.bars?.[bi];
          if (!bar) return this.piece;
          bar.voices ||= [];

          if (this.findVoiceIndex(bar, voiceId) !== -1) return next;

          const barLen = barLengthBeats(bar, next);
          const events = formatRests(barLen, 0, bar, false);
          bar.voices.push({ id: voiceId, stemDirection, events });
          return next;
        }

        ensureVoiceInBarAt(barIndex, voiceId, { stemDirection = 1 } = {}) {
          const next = clone(this.piece);
          const bar = next.bars?.[barIndex];
          if (!bar) return { piece: this.piece, voiceIndex: -1 };
          bar.voices ||= [];
          let vi = this.findVoiceIndex(bar, voiceId);
          if (vi !== -1) return { piece: next, voiceIndex: vi };

          const barLen = barLengthBeats(bar, next);
          const events = formatRests(barLen, 0, bar, false);
          bar.voices.push({ id: voiceId, stemDirection, events });
          vi = bar.voices.length - 1;
          return { piece: next, voiceIndex: vi };
        }

        removeVoiceFromBar(voiceId) {
          const next = clone(this.piece);
          const bi = this.getCurrentBarIndex();
          const bar = next.bars?.[bi];
          if (!bar) return this.piece;
          bar.voices = (bar.voices || []).filter(v => v.id !== voiceId);
          return next;
        }

        selectFirstEventInVoice(voiceId) {
          const bi = this.getCurrentBarIndex();
          const bar = this.piece?.bars?.[bi];
          const vi = this.findVoiceIndex(bar, voiceId);
          const ev = vi >= 0 ? bar.voices[vi].events[0] : null;
          if (ev?.id) this.setSingleSelection(ev.id, this.sel.stringIndex, voiceId);
        }

        getAdjacentPairFromSelection() {
          const ids = this.getSelectedEventIds();
          if (!ids.length) return null;

          if (ids.length === 1) {
            const from = this.sel.eventId;
            const ordered = [...this._hitIndex]
              .filter(h => h.stringIndex === this.sel.stringIndex && h.voiceId === this.sel.voiceId)
              .sort((a,b)=> (a.x-b.x) || (a.y-b.y));
            const i = ordered.findIndex(h => h.eventId === from);
            const to = ordered[Math.min(ordered.length - 1, i + 1)]?.eventId;
            if (!to || to === from) return null;
            return { fromId: from, toId: to };
          }

          if (ids.length !== 2) return null;
          const a = findEventRef(this.piece, ids[0]);
          const b = findEventRef(this.piece, ids[1]);
          if (!a || !b) return null;
          if (a.bi !== b.bi || a.vi !== b.vi) return null;

          const voice = a.bar.voices[a.vi];
          const ordered = voice.events
            .map((ev, ei) => ({ ev, ei }))
            .sort((x, y) => (x.ev.start - y.ev.start) || (x.ei - y.ei));
          const ia = ordered.findIndex(o => o.ev.id === ids[0]);
          const ib = ordered.findIndex(o => o.ev.id === ids[1]);
          if (ia === -1 || ib === -1) return null;
          if (Math.abs(ia - ib) !== 1) return null;
          const fromId = ia < ib ? ids[0] : ids[1];
          const toId = ia < ib ? ids[1] : ids[0];
          return { fromId, toId };
        }

        addSlurFromSelection() {
          const ids = this.getSelectedEventIds();
          if (ids.length < 2) return;
          const fromId = ids[0];
          const toId = ids[ids.length - 1];
          const next = clone(this.piece);
          const fromRef = findEventRef(next, fromId);
          const toRef = findEventRef(next, toId);
          if (!fromRef || !toRef) return;
          if (fromRef.bi !== toRef.bi) {
            alert("Slurs must be within the same bar.");
            return;
          }
          const bar = next.bars[fromRef.bi];
          bar.slurs ||= [];
          if (!bar.slurs.some(s => s.from === fromId && s.to === toId)) {
            bar.slurs.push({ from: fromId, to: toId });
          }
          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        addTieFromSelection() {
          const ids = this.getSelectedEventIds();
          if (ids.length < 2) return;
          const fromId = ids[0];
          const toId = ids[ids.length - 1];
          const next = clone(this.piece);
          const fromRef = findEventRef(next, fromId);
          const toRef = findEventRef(next, toId);
          if (!fromRef || !toRef) return;
          const bar = next.bars[fromRef.bi];
          bar.ties ||= [];
          if (!bar.ties.some(t => t.from === fromId && t.to === toId)) {
            bar.ties.push({ from: fromId, to: toId });
          }
          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        clearSlurFromSelection() {
          const ids = this.getSelectedEventIds();
          if (!ids.length) return;
          const idSet = new Set(ids);
          const next = clone(this.piece);
          next.bars.forEach(b => {
            if (!b.slurs) return;
            b.slurs = b.slurs.filter(s => !(idSet.has(s.from) || idSet.has(s.to)));
          });
          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        clearTieFromSelection() {
          const ids = this.getSelectedEventIds();
          if (!ids.length) return;
          const idSet = new Set(ids);
          const next = clone(this.piece);
          next.bars.forEach(b => {
            if (!b.ties) return;
            b.ties = b.ties.filter(t => !(idSet.has(t.from) || idSet.has(t.to)));
          });
          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        buildClipboardFromSelection() {
          const refs = this.getSelectionRefs();
          if (!refs.length) return null;
          const baseRef = refs[0];
          const baseBar = baseRef.bi;
          const baseStart = baseRef.ev.start ?? 0;
          const barLen = barLengthBeats(this.piece.bars[baseBar], this.piece);
          const voiceId = this.sel.voiceId || "melody";

          const events = refs.map(r => ({
            id: r.ev.id,
            barOffset: r.bi - baseBar,
            start: r.ev.start ?? 0,
            duration: r.ev.duration,
            dots: r.ev.dots || 0,
            tones: (r.ev.tones || []).map(t => ({ string: t.string, fret: t.fret })),
            chord: r.ev.chord || null,
            tupletGroupId: r.ev.tupletGroupId || null
          }));

          const tuplets = [];
          const tupletIdsByBar = new Map();
          refs.forEach(r => {
            if (!r.ev.tupletGroupId) return;
            const key = r.bi;
            if (!tupletIdsByBar.has(key)) tupletIdsByBar.set(key, new Set());
            tupletIdsByBar.get(key).add(r.ev.tupletGroupId);
          });
          tupletIdsByBar.forEach((ids, bi) => {
            const bar = this.piece.bars[bi];
            const defs = (bar.tuplets || []).filter(t => ids.has(t.id))
              .map(t => ({
                id: t.id,
                numNotes: t.numNotes,
                notesOccupied: t.notesOccupied,
                ratioed: t.ratioed,
                bracketed: t.bracketed
              }));
            if (defs.length) tuplets.push({ barOffset: bi - baseBar, defs });
          });

          const idSet = new Set(refs.map(r => r.ev.id));
          const techniques = [];
          this.piece.bars.forEach((bar, bi) => {
            (bar.guitar || []).forEach(t => {
              if (idSet.has(t.on) || idSet.has(t.from) || idSet.has(t.to)) {
                techniques.push({ barOffset: bi - baseBar, tech: { ...t } });
              }
            });
          });

          return {
            version: 1,
            voiceId,
            barLen,
            baseStart,
            events,
            tuplets,
            techniques
          };
        }

        async copySelectionToClipboard() {
          const payload = this.buildClipboardFromSelection();
          if (!payload) return;
          this._clipboard = payload;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(JSON.stringify(payload));
            }
          } catch {
            // ignore clipboard errors
          }
        }

        deleteSelectionRange() {
          const ids = this.getSelectedEventIds();
          if (!ids.length) return;
          const idSet = new Set(ids);
          const next = clone(this.piece);
          const affectedBars = new Set();

          next.bars.forEach((bar, bi) => {
            const vi = this.findVoiceIndex(bar, this.sel.voiceId || "melody");
            if (vi === -1) return;
            const voice = bar.voices[vi];
            const before = voice.events.length;
            voice.events = voice.events.filter(ev => !idSet.has(ev.id));
            if (voice.events.length !== before) affectedBars.add(bi);
          });

          next.bars.forEach(b => {
            if (!b.guitar) return;
            b.guitar = b.guitar.filter(t => !(idSet.has(t.on) || idSet.has(t.from) || idSet.has(t.to)));
          });

          affectedBars.forEach(bi => {
            const bar = next.bars[bi];
            const vi = this.findVoiceIndex(bar, this.sel.voiceId || "melody");
            if (vi === -1) return;
            consolidateRestsForBar(next, bi, vi);
            if (bar.tuplets) {
              const used = new Set();
              bar.voices.forEach(v => v.events.forEach(e => {
                if (e.tupletGroupId) used.add(e.tupletGroupId);
              }));
              bar.tuplets = bar.tuplets.filter(t => used.has(t.id));
            }
            consolidateRestsIfEmpty(next, bi, vi);
          });

          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        applyPieceMeta() {
          const title = (this.shadowRoot.querySelector('[data-meta="piece-title"]')?.value || "").trim();
          const type = (this.shadowRoot.querySelector('[data-meta="piece-type"]')?.value || "").trim();
          const arranger = (this.shadowRoot.querySelector('[data-meta="piece-arranger"]')?.value || "").trim();
          const composer = (this.shadowRoot.querySelector('[data-meta="piece-composer"]')?.value || "").trim();
          const bpm = parseInt(this.shadowRoot.querySelector('[data-meta="piece-bpm"]')?.value || "", 10);
          const style = (this.shadowRoot.querySelector('[data-meta="piece-style"]')?.value || "").trim();
          const notes = (this.shadowRoot.querySelector('[data-meta="piece-notes"]')?.value || "").trim();
          const num = parseInt(this.shadowRoot.querySelector('[data-meta="piece-time-num"]')?.value || "", 10);
          const den = parseInt(this.shadowRoot.querySelector('[data-meta="piece-time-den"]')?.value || "", 10);
          const key = (this.shadowRoot.querySelector('[data-meta="piece-key"]')?.value || "").trim();
          const clef = (this.shadowRoot.querySelector('[data-meta="piece-clef"]')?.value || "").trim();
          const spell = (this.shadowRoot.querySelector('[data-meta="piece-spell"]')?.value || "").trim();

          const next = clone(this.piece);
          next.meta ||= {};
          if (title) next.meta.title = title;
          else delete next.meta.title;
          if (type) next.meta.type = type;
          else delete next.meta.type;
          if (arranger) next.meta.arranger = arranger;
          else delete next.meta.arranger;
          if (composer) next.meta.composer = composer;
          else delete next.meta.composer;
          if (Number.isFinite(bpm) && bpm > 0) next.meta.bpm = bpm;
          else delete next.meta.bpm;
          if (style) next.meta.style = style;
          else delete next.meta.style;
          if (notes) next.meta.notes = notes;
          else delete next.meta.notes;
          next.defaults ||= {};
          if (Number.isFinite(num) && Number.isFinite(den) && num > 0 && den > 0) {
            next.defaults.timeSig = [num, den];
          }
          if (key) next.defaults.keySig = key;
          else delete next.defaults.keySig;
          if (clef) next.defaults.clef = clef;
          else delete next.defaults.clef;
          if (spell) next.defaults.spelling = { prefer: spell };
          else delete next.defaults.spelling;
          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.syncInspectorFields());
        }

        applyBarMeta() {
          const bar = this.getCurrentBar();
          if (!bar) return;
          const num = parseInt(this.shadowRoot.querySelector('[data-meta="bar-time-num"]')?.value || "", 10);
          const den = parseInt(this.shadowRoot.querySelector('[data-meta="bar-time-den"]')?.value || "", 10);
          const key = (this.shadowRoot.querySelector('[data-meta="bar-key"]')?.value || "").trim();
          const clef = (this.shadowRoot.querySelector('[data-meta="bar-clef"]')?.value || "").trim();
          const barlineRight = (this.shadowRoot.querySelector('[data-meta="barline-right"]')?.value || "").trim();
          const section = (this.shadowRoot.querySelector('[data-meta="bar-section"]')?.value || "").trim();

          const next = clone(this.piece);
          const bi = this.getCurrentBarIndex();
          const target = next.bars[bi];
          target.meta ||= {};

          if (Number.isFinite(num) && Number.isFinite(den) && num > 0 && den > 0) {
            target.meta.timeSig = [num, den];
          }
          if (key) target.meta.keySig = key;
          else delete target.meta.keySig;
          if (clef) target.meta.clef = clef;
          else delete target.meta.clef;
          if (barlineRight) {
            target.meta.barline ||= {};
            target.meta.barline.right = barlineRight;
          } else if (target.meta.barline) {
            delete target.meta.barline.right;
            if (Object.keys(target.meta.barline).length === 0) {
              delete target.meta.barline;
            }
          }
          if (section) {
            target.meta.section = { label: section };
          } else if (target.meta.section) {
            delete target.meta.section;
          }

          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.syncInspectorFields());
        }

        clearBarMeta() {
          const next = clone(this.piece);
          const bi = this.getCurrentBarIndex();
          const target = next.bars?.[bi];
          if (!target) return;
          target.meta = {};
          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.syncInspectorFields());
        }
        applyPieceMetaFromValues(values) {
          const next = clone(this.piece);
          next.meta ||= {};
          next.defaults ||= {};

          const setOrDelete = (obj, key, value) => {
            if (value) obj[key] = value;
            else delete obj[key];
          };

          setOrDelete(next.meta, "title", (values.piece_title || "").trim());
          setOrDelete(next.meta, "type", (values.piece_type || "").trim());
          setOrDelete(next.meta, "arranger", (values.piece_arranger || "").trim());
          setOrDelete(next.meta, "composer", (values.piece_composer || "").trim());
          setOrDelete(next.meta, "style", (values.piece_style || "").trim());
          setOrDelete(next.meta, "notes", (values.piece_notes || "").trim());

          const bpm = parseInt(values.piece_bpm || "", 10);
          if (Number.isFinite(bpm) && bpm > 0) next.meta.bpm = bpm;
          else delete next.meta.bpm;

          const preset = values.piece_time_preset || "";
          if (preset && preset !== "custom") {
            const parts = preset.split("/");
            const num = parseInt(parts[0], 10);
            const den = parseInt(parts[1], 10);
            if (Number.isFinite(num) && Number.isFinite(den) && num > 0 && den > 0) {
              next.defaults.timeSig = [num, den];
            }
          } else {
            const num = parseInt(values.piece_time_num || "", 10);
            const den = parseInt(values.piece_time_den || "", 10);
            if (Number.isFinite(num) && Number.isFinite(den) && num > 0 && den > 0) {
              next.defaults.timeSig = [num, den];
            }
          }

          const key = (values.piece_key || "").trim();
          if (key) next.defaults.keySig = key;
          else delete next.defaults.keySig;

          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.syncInspectorFields());
        }

        applyBarMetaFromValues(values) {
          const next = clone(this.piece);
          const bi = this.getCurrentBarIndex();
          const target = next.bars[bi];
          target.meta ||= {};

          const preset = values.bar_time_preset || "";
          if (preset && preset !== "custom") {
            if (!preset) {
              delete target.meta.timeSig;
            } else {
              const parts = preset.split("/");
              const num = parseInt(parts[0], 10);
              const den = parseInt(parts[1], 10);
              if (Number.isFinite(num) && Number.isFinite(den) && num > 0 && den > 0) {
                target.meta.timeSig = [num, den];
              }
            }
          } else if (preset === "custom") {
            const num = parseInt(values.bar_time_num || "", 10);
            const den = parseInt(values.bar_time_den || "", 10);
            if (Number.isFinite(num) && Number.isFinite(den) && num > 0 && den > 0) {
              target.meta.timeSig = [num, den];
            }
          } else {
            delete target.meta.timeSig;
          }

          const key = (values.bar_key || "").trim();
          if (key) target.meta.keySig = key;
          else delete target.meta.keySig;

          const barlineRight = (values.bar_barline_right || "").trim();
          if (barlineRight) {
            target.meta.barline ||= {};
            target.meta.barline.right = barlineRight;
          } else if (target.meta.barline) {
            delete target.meta.barline.right;
            if (Object.keys(target.meta.barline).length === 0) delete target.meta.barline;
          }

          const section = (values.bar_section || "").trim();
          if (section) target.meta.section = { label: section };
          else delete target.meta.section;

          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.syncInspectorFields());
        }

        pasteClipboardAtSelection() {
          const payload = this._clipboard;
          if (!payload || !payload.events || !payload.events.length) return;

          const ref = findEventRef(this.piece, this.sel.eventId);
          if (!ref) return;
          const baseBar = ref.bi;
          const baseStart = ref.ev.start ?? 0;
          const barLen = barLengthBeats(ref.bar, this.piece);
          const voiceId = this.sel.voiceId || payload.voiceId || "melody";

          const offsetBeats = (ev) => (ev.barOffset * payload.barLen) + (ev.start - payload.baseStart);
          const maxSpan = payload.events.reduce((acc, ev) => {
            const dur = durationWithDotsBeats(ev.duration.replace("r", ""), ev.dots || 0);
            return Math.max(acc, offsetBeats(ev) + dur);
          }, 0);

          const next = clone(this.piece);
          const absStart = (baseBar * barLen) + baseStart;
          const absEnd = absStart + maxSpan;

          if (this.pasteMode === "replace") {
            next.bars.forEach((bar, bi) => {
              const vi = this.findVoiceIndex(bar, voiceId);
              if (vi === -1) return;
              const voice = bar.voices[vi];
              const removed = new Set();
              voice.events = voice.events.filter(ev => {
                const evAbs = (bi * barLen) + (ev.start ?? 0);
                const keep = evAbs < absStart || evAbs >= absEnd;
                if (!keep) removed.add(ev.id);
                return keep;
              });
              if (bar.guitar && removed.size) {
                bar.guitar = bar.guitar.filter(t => !(removed.has(t.on) || removed.has(t.from) || removed.has(t.to)));
              }
              if (bar.tuplets && removed.size) {
                const used = new Set();
                bar.voices.forEach(v => v.events.forEach(e => {
                  if (e.tupletGroupId) used.add(e.tupletGroupId);
                }));
                bar.tuplets = bar.tuplets.filter(t => used.has(t.id));
              }
              consolidateRestsIfEmpty(next, bi, vi);
            });
          }

          // create tuplets mapping per bar offset
          const tupletMap = new Map(); // key: barOffset -> Map(oldId->newId)
          (payload.tuplets || []).forEach(entry => {
            const targetBar = baseBar + entry.barOffset;
            while (targetBar >= next.bars.length) {
              next.bars.push(createEmptyBarLike(next.bars[next.bars.length - 1]));
            }
            const bar = next.bars[targetBar];
            bar.tuplets ||= [];
            const map = new Map();
            entry.defs.forEach(def => {
              let tid;
              do { tid = makeId("t"); } while (bar.tuplets.some(t => t.id === tid));
              bar.tuplets.push({
                id: tid,
                numNotes: def.numNotes,
                notesOccupied: def.notesOccupied,
                ratioed: def.ratioed,
                bracketed: def.bracketed
              });
              map.set(def.id, tid);
            });
            tupletMap.set(entry.barOffset, map);
          });

          const idMap = new Map();
          const sortedEvents = [...payload.events].sort((a, b) =>
            (a.barOffset - b.barOffset) || (a.start - b.start)
          );

          sortedEvents.forEach(ev => {
            const offset = offsetBeats(ev);
            let abs = absStart + offset;
            let barIndex = Math.floor(abs / barLen);
            let start = abs - (barIndex * barLen);
            while (barIndex >= next.bars.length) {
              next.bars.push(createEmptyBarLike(next.bars[next.bars.length - 1]));
            }

            const bar = next.bars[barIndex];
            let vi = this.findVoiceIndex(bar, voiceId);
            if (vi === -1) {
              bar.voices.push({ id: voiceId, stemDirection: -1, events: [] });
              vi = bar.voices.length - 1;
            }

            const id = makeId("n");
            idMap.set(ev.id, id);
            const isRest = ev.duration.includes("r") || (ev.tones || []).length === 0;
            const duration = isRest ? (ev.duration.includes("r") ? ev.duration : `${ev.duration}r`) : ev.duration.replace("r", "");
            const mappedTuplet = ev.tupletGroupId && tupletMap.get(ev.barOffset)?.get(ev.tupletGroupId);

            bar.voices[vi].events.push({
              id,
              start: normalizeBeats(start),
              duration,
              dots: ev.dots || 0,
              tones: (ev.tones || []).map(t => ({ string: t.string, fret: t.fret })),
              chord: ev.chord || undefined,
              tupletGroupId: mappedTuplet || undefined
            });
          });

          // copy techniques with remapped IDs
          (payload.techniques || []).forEach(entry => {
            const targetBar = baseBar + entry.barOffset;
            if (targetBar < 0) return;
            while (targetBar >= next.bars.length) {
              next.bars.push(createEmptyBarLike(next.bars[next.bars.length - 1]));
            }
            const tech = { ...entry.tech };
            if (tech.on) tech.on = idMap.get(tech.on);
            if (tech.from) tech.from = idMap.get(tech.from);
            if (tech.to) tech.to = idMap.get(tech.to);
            if (!tech.on && !tech.from && !tech.to) return;
            next.bars[targetBar].guitar ||= [];
            next.bars[targetBar].guitar.push(tech);
          });

          next.bars.forEach(bar => {
            const vi = this.findVoiceIndex(bar, voiceId);
            if (vi === -1) return;
            bar.voices[vi].events.sort((a, b) => a.start - b.start);
          });

          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        getTupletDefForSelection() {
          const ids = this.getSelectedEventIds();
          if (!ids.length) return null;
          const ref = findEventRef(this.piece, ids[0]);
          if (!ref) return null;
          const bar = this.piece.bars[ref.bi];
          const voice = ref.voice;
          const selected = voice.events.filter(ev => ids.includes(ev.id));
          const groupIds = new Set(selected.map(ev => ev.tupletGroupId).filter(Boolean));
          if (groupIds.size !== 1) return null;
          const tid = [...groupIds][0];
          return (bar.tuplets || []).find(t => t.id === tid) || null;
        }

        updateTupletButtonLabel() {
          const btn = this.shadowRoot.querySelector('[data-action="open-tuplet"]');
          if (!btn) return;
          const def = this.getTupletDefForSelection();
          if (def) {
            const on = this.tupletEntry?.active ? " (On)" : "";
            btn.textContent = `Tuplet: ${def.numNotes} in ${def.notesOccupied}${on}`;
            return;
          }
          const { numNotes, notesOccupied } = this.tupletSettings;
          const on = this.tupletEntry?.active ? " (On)" : "";
          btn.textContent = `Tuplet: ${numNotes} in ${notesOccupied}${on}`;
        }

        applyTupletFromSelection() {
          const ids = this.getSelectedEventIds();
          if (ids.length < 2) return;

          const numNotes = this.tupletSettings.numNotes;
          const notesOccupied = this.tupletSettings.notesOccupied;
          if (!Number.isFinite(numNotes) || !Number.isFinite(notesOccupied) || numNotes < 2 || notesOccupied < 1) {
            alert("Tuplet values must be numbers like 3 in 2.");
            return;
          }

          const next = clone(this.piece);
          const refs = ids.map(id => findEventRef(next, id)).filter(Boolean);
          if (refs.length < 2) return;
          const { bi, vi } = refs[0];
          if (!refs.every(r => r.bi === bi && r.vi === vi)) {
            alert("Tuplet ranges must be within the same bar.");
            return;
          }

          const bar = next.bars[bi];
          bar.tuplets ||= [];
          let tid;
          do { tid = makeId("t"); } while (bar.tuplets.some(t => t.id === tid));

          const voice = bar.voices[vi];
          const selectedIds = new Set(ids);
          const selectedRefs = voice.events
            .map((ev, ei) => ({ ev, ei }))
            .filter(r => selectedIds.has(r.ev.id))
            .sort((a, b) => (a.ev.start - b.ev.start) || (a.ei - b.ei));

          const startAt = selectedRefs[0].ev.start;
          const lastRef = selectedRefs[selectedRefs.length - 1];
          const lastDur = durationWithDotsBeats(lastRef.ev.duration.replace("r", ""), lastRef.ev.dots || 0);
          const lastEnd = lastRef.ev.start + lastDur;
          const hasInterlopers = voice.events.some(ev => {
            if (selectedIds.has(ev.id)) return false;
            if (isHiddenRestFiller(ev)) return false;
            if (isRestEvent(ev)) return false;
            return ev.start >= startAt && ev.start < lastEnd;
          });
          if (hasInterlopers) {
            alert("Tuplet ranges must be contiguous.");
            return;
          }

          const factor = notesOccupied / numNotes;
          const roundBeat = (v) => Math.round(v * 100000) / 100000;
          let cursor = startAt;
          selectedRefs.forEach(r => {
            const baseDur = durationWithDotsBeats(r.ev.duration.replace("r", ""), r.ev.dots || 0);
            r.ev.start = roundBeat(cursor);
            r.ev.tupletGroupId = tid;
            cursor += baseDur * factor;
          });

          const originalSpan = lastEnd - startAt;
          const newSpan = cursor - startAt;
          const delta = newSpan - originalSpan;
          if (delta !== 0) {
            voice.events.forEach(ev => {
              if (selectedIds.has(ev.id)) return;
              if (ev.start >= lastEnd) {
                ev.start = roundBeat(ev.start + delta);
              }
            });
          }

          bar.tuplets.push({
            id: tid,
            numNotes,
            notesOccupied,
            ratioed: !!this.tupletSettings.ratioed,
            bracketed: !!this.tupletSettings.bracketed
          });

          // remove tuplets no longer referenced in this bar
          const used = new Set();
          bar.voices.forEach(v => v.events.forEach(e => {
            if (e.tupletGroupId) used.add(e.tupletGroupId);
          }));
          bar.tuplets = bar.tuplets.filter(t => used.has(t.id));

          this.piece = next;
          this.markDirty();
          const stringIndex = this.sel.rangeStringIndex ?? this.sel.stringIndex;
          const lastSelectedId = selectedRefs[selectedRefs.length - 1].ev.id;
          this.renderScore(() => {
            this.setSingleSelection(lastSelectedId, stringIndex);
            const startId = this.getTieChainEndId(this.sel.eventId) || this.sel.eventId;
            const { nextId } = this.ensureNextSlotFrom(startId);
            if (nextId) this.setSingleSelection(nextId, stringIndex);
            this.refreshOverlaySelection();
          });
        }

        startTupletEntryAtSelection() {
          const ref = findEventRef(this.piece, this.sel.eventId);
          if (!ref) return;
          const bar = this.piece.bars[ref.bi];
          if (!bar) return;
          bar.tuplets ||= [];
          let tid;
          do { tid = makeId("t"); } while (bar.tuplets.some(t => t.id === tid));
          bar.tuplets.push({
            id: tid,
            numNotes: this.tupletSettings.numNotes,
            notesOccupied: this.tupletSettings.notesOccupied,
            ratioed: !!this.tupletSettings.ratioed,
            bracketed: !!this.tupletSettings.bracketed
          });
          this.tupletEntry = {
            active: true,
            tid,
            numNotes: this.tupletSettings.numNotes,
            notesOccupied: this.tupletSettings.notesOccupied,
            ratioed: !!this.tupletSettings.ratioed,
            bracketed: !!this.tupletSettings.bracketed,
            barIndex: ref.bi,
            voiceId: ref.voice?.id || this.sel.voiceId,
            cursorStart: ref.ev.start ?? 0,
            count: 0
          };
          this.markDirty();
          this.updateTupletButtonLabel();
        }

        applyTupletEntryToEvent(eventId) {
          const entry = this.tupletEntry;
          if (!entry || !entry.active) return null;
          const ref = findEventRef(this.piece, eventId);
          if (!ref) return null;
          if (ref.bi !== entry.barIndex || ref.voice?.id !== entry.voiceId) {
            this.tupletEntry = { active: false };
            this.updateTupletButtonLabel();
            return null;
          }

          const bar = this.piece.bars[entry.barIndex];
          const barLen = barLengthBeats(bar, this.piece);
          const factor = entry.notesOccupied / entry.numNotes;
          const roundBeat = (v) => Math.round(v * 100000) / 100000;
          const baseDur = durationWithDotsBeats(ref.ev.duration.replace("r", ""), ref.ev.dots || 0);
          const oldStart = ref.ev.start ?? 0;
          const oldEnd = oldStart + baseDur;
          const newStart = roundBeat(entry.cursorStart);
          const newEnd = roundBeat(newStart + baseDur * factor);

          if (newStart >= barLen) {
            this.tupletEntry = { active: false };
            this.updateTupletButtonLabel();
            return null;
          }

          ref.ev.start = roundBeat(newStart);
          ref.ev.tupletGroupId = entry.tid;

          const delta = newEnd - oldEnd;
          if (delta !== 0) {
            ref.voice.events.forEach(ev => {
              if (ev.id === ref.ev.id) return;
              if (ev.start >= oldEnd) {
                ev.start = roundBeat(ev.start + delta);
              }
            });
          }

          entry.cursorStart = newEnd;
          entry.count += 1;
          if (entry.count >= entry.numNotes) {
            entry.active = false;
          }
          this.updateTupletButtonLabel();
          return {
            nextStart: entry.cursorStart,
            barIndex: entry.barIndex,
            voiceId: entry.voiceId,
            done: !entry.active
          };
        }

        ensureEventAtStart(barIndex, voiceId, start, duration, dots, explicitRest, { tupletId = null, noSplit = false } = {}) {
          const bar = this.piece.bars[barIndex];
          if (!bar) return null;
          let vi = this.findVoiceIndex(bar, voiceId);
          if (vi === -1) {
            bar.voices.push({ id: voiceId, stemDirection: 1, events: [] });
            vi = bar.voices.length - 1;
          }
          const voice = bar.voices[vi];
          const eps = 1e-6;
          const existing = voice.events.find(ev => Math.abs((ev.start ?? 0) - start) < eps);
          if (existing) return existing.id;
          if (noSplit) {
            const ev = {
              id: makeId("n"),
              start,
              duration: explicitRest ? duration : `${duration.replace("r", "")}r`,
              dots: dots || 0,
              tones: []
            };
            if (tupletId) ev.tupletGroupId = tupletId;
            voice.events.push(ev);
            voice.events.sort((a, b) => a.start - b.start);
            return ev.id;
          }
          const res = createEventAt(this.piece, barIndex, vi, start, duration, dots, explicitRest);
          return res.newEventId || null;
        }

        clearTupletFromSelection() {
          const ids = this.getSelectedEventIds();
          if (!ids.length) return;

          const next = clone(this.piece);
          const refs = ids.map(id => findEventRef(next, id)).filter(Boolean);
          if (!refs.length) return;
          const { bi, vi } = refs[0];
          if (!refs.every(r => r.bi === bi && r.vi === vi)) {
            alert("Tuplet ranges must be within the same bar.");
            return;
          }

          refs.forEach(r => {
            delete r.ev.tupletGroupId;
          });

          const bar = next.bars[bi];
          if (bar && bar.tuplets) {
            const used = new Set();
            bar.voices.forEach(v => v.events.forEach(e => {
              if (e.tupletGroupId) used.add(e.tupletGroupId);
            }));
            bar.tuplets = bar.tuplets.filter(t => used.has(t.id));
          }

          this.piece = next;
          this.markDirty();
          this.renderScore(() => this.refreshOverlaySelection());
        }

        onJsonFileChange(e) {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const text = String(reader.result || "");
            this.importJsonFromText(text);
          };
          reader.readAsText(file);
          e.target.value = "";
        }

        // ---------- Keyboard editing ----------
        onKeyDown(e) {
          const target = e.target;
          if (target && target.closest && target.closest("input, textarea")) return;
          if (!this.sel.eventId) return;

          const key = e.key;

          // navigation
          if (key === "ArrowLeft") { e.preventDefault(); this.moveNote(-1); return; }
          if (key === "ArrowRight") {
            e.preventDefault();
            const startId = this.getTieChainEndId(this.sel.eventId) || this.sel.eventId;
            const { nextId, created } = this.ensureNextSlotFrom(startId);
              if (nextId) this.setSingleSelection(nextId);
            this.renderScore(() => this.refreshOverlaySelection());
            return;
          }
          if (key === "ArrowUp") { e.preventDefault(); this.sel.stringIndex = Math.max(0, this.sel.stringIndex - 1); this.refreshOverlaySelection(); return; }
          if (key === "ArrowDown") { e.preventDefault(); this.sel.stringIndex = Math.min(5, this.sel.stringIndex + 1); this.refreshOverlaySelection(); return; }

          // enter: create new note (or just advance if shift)
          if (key === "Enter") {
            e.preventDefault();
            if (e.shiftKey) return; // stay put
            const dur = this.activeDuration.dur;
            const dots = this.activeDuration.dots || 0;
            const duration = this.restMode ? `${dur}r` : dur;
            const res = createNextEvent(this.piece, this.sel.eventId, { duration, dots, explicitRest: this.restMode });
            const keepId = res.newEventId || this.sel.eventId;
            this.piece = normalizeVoiceForEvent(res.piece, keepId, { reflow: this.reflowEnabled });
              if (res.newEventId) this.setSingleSelection(res.newEventId);
            this.markDirty();
            // select the closest note to the right after re-render (best-effort)
            this.renderScore(() => this.moveNote(1, { clamp: true }));
            return;
          }

          // digits => fret input (multi-digit)
          if (/^\d$/.test(key)) {
            e.preventDefault();
            this._fretBuffer += key;
            clearTimeout(this._fretBufferTimer);
            this._fretBufferTimer = setTimeout(() => this.commitFretBuffer(), 500);
            // if buffer already looks like 2 digits, commit immediately (covers 10â€“24 fast)
            if (this._fretBuffer.length >= 2) this.commitFretBuffer();
            return;
          }

          if (key === "Delete") {
            e.preventDefault();
            if (this.sel.rangeIds && this.sel.rangeIds.length > 1) {
              this.deleteSelectionRange();
              return;
            }
            this.piece = setRest(this.piece, this.sel.eventId);
            this.piece = normalizeVoiceForEvent(this.piece, this.sel.eventId, { reflow: this.reflowEnabled });
            const ref = findEventRef(this.piece, this.sel.eventId);
            if (ref && !ref.ev.hidden) this.piece = consolidateRestsForBar(this.piece, ref.bi, ref.vi);
            this.markDirty();
            this.renderScore();
            return;
          }

          if (key === "r" || key === "R") {
            e.preventDefault();
            if (this._fretBuffer) {
              this._fretBuffer = "";
            }
            if (this.restMode === false) {
              this.piece = setRest(this.piece, this.sel.eventId);
              this.piece = normalizeVoiceForEvent(this.piece, this.sel.eventId, { reflow: this.reflowEnabled });
              const ref = findEventRef(this.piece, this.sel.eventId);
              if (ref && !ref.ev.hidden) this.piece = consolidateRestsForBar(this.piece, ref.bi, ref.vi);
              this.markDirty();
              this.renderScore(() => this.refreshOverlaySelection());
              return;
            }
            this.restMode = !this.restMode;
            this.syncToggleButtons();
            return;
          }

          // backspace clears buffer, or sets fret 0 if buffer empty
          if (key === "Backspace") {
            e.preventDefault();
            if (this.sel.rangeIds && this.sel.rangeIds.length > 1) {
              this.deleteSelectionRange();
              return;
            }
            if (this._fretBuffer) {
              this._fretBuffer = this._fretBuffer.slice(0, -1);
            } else {
              this.piece = setRest(this.piece, this.sel.eventId);
              this.piece = normalizeVoiceForEvent(this.piece, this.sel.eventId, { reflow: this.reflowEnabled });
              const ref = findEventRef(this.piece, this.sel.eventId);
              if (ref && !ref.ev.hidden) this.piece = consolidateRestsForBar(this.piece, ref.bi, ref.vi);
              this.markDirty();
              this.renderScore();
            }
            return;
          }
        }

        commitFretBuffer() {
          if (!this._fretBuffer) return;
          const fret = Math.max(0, Math.min(24, parseInt(this._fretBuffer, 10)));
          this._fretBuffer = "";
          const refBefore = findEventRef(this.piece, this.sel.eventId);
          const wasEmpty = !refBefore || !refBefore.ev.tones || refBefore.ev.tones.length === 0;
          if (wasEmpty) {
            const dur = this.activeDuration.dur;
            this.piece = setDuration(this.piece, this.sel.eventId, dur);
            const refAfter = findEventRef(this.piece, this.sel.eventId);
            if (refAfter) {
              const dots = this.activeDuration.dots || 0;
              if (dots) refAfter.ev.dots = dots;
              else delete refAfter.ev.dots;
            }
          }
          this.piece = setFret(this.piece, this.sel.eventId, this.sel.stringIndex, fret);
          if (wasEmpty) {
            this.piece = pruneRestEventsFrom(this.piece, this.sel.eventId);
          }
          if (!this.tupletEntry?.active) {
            this.piece = normalizeVoiceForEvent(this.piece, this.sel.eventId, { reflow: this.reflowEnabled });
          }
          this.markDirty();

          if (this.entryMode === "chord") {
            if (this.sel.stringIndex < 5) {
              this.sel.stringIndex++;
              this.renderScore(() => this.refreshOverlaySelection());
            } else {
              this.sel.stringIndex = 0;
              this.renderScore(() => this.moveNote(1, { clamp: true }));
            }
            return;
          }

          if (wasEmpty) {
            const tupletAdvance = this.applyTupletEntryToEvent(this.sel.eventId);
            if (tupletAdvance) {
              const dur = this.activeDuration.dur;
              const dots = this.activeDuration.dots || 0;
              const duration = this.restMode ? `${dur}r` : dur;
              const bar = this.piece.bars[tupletAdvance.barIndex];
              const barLen = barLengthBeats(bar, this.piece);
              const eps = 1e-6;
              let nextId = null;
              const isDone = tupletAdvance.done || tupletAdvance.nextStart >= barLen - eps;
              if (isDone) {
                let nextBarIndex = tupletAdvance.barIndex + 1;
                while (nextBarIndex >= this.piece.bars.length) {
                  this.piece.bars.push(createEmptyBarLike(bar));
                }
                nextId = this.ensureEventAtStart(nextBarIndex, tupletAdvance.voiceId, 0, duration, dots, this.restMode, { noSplit: true });
              } else {
                nextId = this.ensureEventAtStart(
                  tupletAdvance.barIndex,
                  tupletAdvance.voiceId,
                  tupletAdvance.nextStart,
                  duration,
                  dots,
                  this.restMode,
                  { tupletId: this.tupletEntry?.active ? this.tupletEntry.tid : null, noSplit: true }
                );
              }
              if (nextId) this.setSingleSelection(nextId);
              this.renderScore(() => this.refreshOverlaySelection());
              return;
            }
            const startId = this.getTieChainEndId(this.sel.eventId) || this.sel.eventId;
            const { nextId } = this.ensureNextSlotFrom(startId);
              if (nextId) this.setSingleSelection(nextId);
            this.renderScore(() => this.refreshOverlaySelection());
            return;
          }

          this.renderScore(() => this.refreshOverlaySelection());
        }

        moveNote(dir, { clamp = false } = {}) {
          if (!this._hitIndex.length) return;

          // order by x, then y (so row order is stable)
          const ordered = [...this._hitIndex]
            .filter(h => h.stringIndex === this.sel.stringIndex && h.voiceId === this.sel.voiceId)
            .sort((a,b)=> (a.x-b.x) || (a.y-b.y));

          const i = ordered.findIndex(h => h.eventId === this.sel.eventId);
          if (i === -1) return;

          let ni = i + dir;
          if (clamp) ni = Math.max(0, Math.min(ordered.length - 1, ni));
          else {
            if (ni < 0) ni = 0;
            if (ni >= ordered.length) ni = ordered.length - 1;
          }
            this.setSingleSelection(ordered[ni].eventId, this.sel.stringIndex, this.sel.voiceId);
          this.refreshOverlaySelection();
          this.syncInspectorFields();
        }

        ensureNextSlotFrom(eventId) {
          const ordered = [...this._hitIndex]
            .filter(h => h.stringIndex === this.sel.stringIndex && h.voiceId === this.sel.voiceId)
            .sort((a,b)=> (a.x-b.x) || (a.y-b.y));

          const i = ordered.findIndex(h => h.eventId === eventId);
          if (i === -1) return { nextId: null, created: false };
          if (i < ordered.length - 1) {
            const currentRef = findEventRef(this.piece, eventId);
            const nextId = ordered[i + 1].eventId;
            const nextRef = findEventRef(this.piece, nextId);
            if (currentRef && nextRef) {
              const barLen = barLengthBeats(currentRef.bar, this.piece);
              const step = durationWithDotsBeats(currentRef.ev.duration, currentRef.ev.dots || 0);
              let expectedStart = normalizeBeats((currentRef.ev.start ?? 0) + step);
              let expectedBar = currentRef.bi;
              while (expectedStart >= barLen) {
                expectedStart = normalizeBeats(expectedStart - barLen);
                expectedBar += 1;
              }
              if (nextRef.bi > expectedBar) {
                // Gap before the next bar: create the missing slot instead of skipping.
                const dur = this.activeDuration.dur;
                const dots = this.activeDuration.dots || 0;
                const duration = this.restMode ? `${dur}r` : dur;
                const res = createNextEvent(this.piece, eventId, { duration, dots, explicitRest: this.restMode });
                const keepId = res.newEventId || eventId;
                this.piece = normalizeVoiceForEvent(res.piece, keepId, { reflow: this.reflowEnabled });
                this.markDirty();
                return { nextId: res.newEventId || null, created: true };
              }
            }
            return { nextId, created: false };
          }

          const ref = findEventRef(this.piece, eventId);
          if (!ref) return { nextId: null, created: false };
          const barLen = barLengthBeats(ref.bar, this.piece);
          const step = durationWithDotsBeats(ref.ev.duration, ref.ev.dots || 0);
          let expectedStart = normalizeBeats((ref.ev.start ?? 0) + step);
          let barIndex = ref.bi;
          while (expectedStart >= barLen) {
            expectedStart = normalizeBeats(expectedStart - barLen);
            barIndex += 1;
          }
          while (barIndex >= this.piece.bars.length) {
            this.piece.bars.push(createEmptyBarLike(ref.bar));
          }

          const dur = this.activeDuration.dur;
          const dots = this.activeDuration.dots || 0;
          const duration = this.restMode ? `${dur}r` : dur;
          const ensured = this.ensureVoiceInBarAt(barIndex, ref.voice.id, { stemDirection: ref.voice.stemDirection });
          this.piece = ensured.piece;
          const voiceIndex = ensured.voiceIndex === -1 ? ref.vi : ensured.voiceIndex;
          const res = createEventAt(this.piece, barIndex, voiceIndex, expectedStart, duration, dots, this.restMode);
          const keepId = res.newEventId || eventId;
          this.piece = normalizeVoiceForEvent(res.piece, keepId, { reflow: this.reflowEnabled });
          this.markDirty();
          return { nextId: res.newEventId || null, created: true };
        }


        // ---------- Inspector actions ----------
        onInspectorClick(e) {
          const btn = e.target.closest("button");
          if (!btn) return;

          const dur = btn.dataset.dur;
          const action = btn.dataset.action;

          if (dur) {
            const targetDur = this.restMode ? `${dur}r` : dur;
            this.piece = setDuration(this.piece, this.sel.eventId, targetDur);
            this.piece = applyRestState(this.piece, this.sel.eventId, this.restMode);
            const ref = findEventRef(this.piece, this.sel.eventId);
            if (ref && isRestEvent(ref.ev)) {
              this.piece = pruneRestEventsFrom(this.piece, this.sel.eventId);
            }
            this.piece = normalizeVoiceForEvent(this.piece, this.sel.eventId, { reflow: this.reflowEnabled });
            this.activeDuration = { dur, dots: 0 };
            this.markDirty();
            this.renderScore(() => this.syncInspectorFields());
            this.wrap.focus();
            return;
          }

          if (action === "dot") {
            this.piece = toggleDot(this.piece, this.sel.eventId);
            this.piece = normalizeVoiceForEvent(this.piece, this.sel.eventId, { reflow: this.reflowEnabled });
            this.updateActiveDurationFromSelection();
            this.markDirty();
            this.renderScore(() => this.syncInspectorFields());
            this.wrap.focus();
            return;
          }

          if (action === "new-note") {
            const dur = this.activeDuration.dur;
            const dots = this.activeDuration.dots || 0;
            const duration = this.restMode ? `${dur}r` : dur;
            const res = createNextEvent(this.piece, this.sel.eventId, { duration, dots, explicitRest: this.restMode });
            const keepId = res.newEventId || this.sel.eventId;
            this.piece = normalizeVoiceForEvent(res.piece, keepId, { reflow: this.reflowEnabled });
              if (res.newEventId) this.setSingleSelection(res.newEventId);
            this.markDirty();
            this.renderScore(() => this.moveNote(1, { clamp: true }));
            this.wrap.focus();
            return;
          }

          if (action === "open-meta") {
            const piece = this.piece || {};
            const bar = this.getCurrentBar() || {};
            const [pNum, pDen] = piece.defaults?.timeSig || [4, 4];
            const bTime = bar.meta?.timeSig || [];
            const bNum = bTime[0] || "";
            const bDen = bTime[1] || "";
            const pieceTimeKey = `${pNum}/${pDen}`;
            const pieceTimePreset = TIME_SIG_OPTIONS.some(o => o.value === pieceTimeKey)
              ? pieceTimeKey
              : "custom";
            const barTimeKey = bNum && bDen ? `${bNum}/${bDen}` : "";
            const barTimePreset = TIME_SIG_OPTIONS.some(o => o.value === barTimeKey)
              ? barTimeKey
              : (barTimeKey ? "custom" : "");
            const barHasOverride = !!(bar.meta?.timeSig || bar.meta?.keySig || bar.meta?.barline || bar.meta?.section);

            showModal({
              title: "Meta",
              body: "Piece defaults apply globally. Bar overrides affect the selected bar.",
              activeTab: barHasOverride ? "bar" : "piece",
              layout: "grid",
              columns: 2,
              tabs: [
                {
                  id: "piece",
                  label: "Piece",
                  fields: [
                    { name: "piece_title", label: "Title", value: piece.meta?.title || "", span: 2 },
                    { name: "piece_type", label: "Type", value: piece.meta?.type || "" },
                    { name: "piece_style", label: "Style", value: piece.meta?.style || "" },
                    { name: "piece_composer", label: "Composer", value: piece.meta?.composer || "" },
                    { name: "piece_arranger", label: "Arranger", value: piece.meta?.arranger || "" },
                    { name: "piece_bpm", label: "BPM", type: "number", value: piece.meta?.bpm || "" },
                    { name: "piece_key", label: "Key", type: "select", value: piece.defaults?.keySig || "", options: KEY_SIG_OPTIONS },
                    { name: "piece_time_preset", label: "Time Signature", type: "select", value: pieceTimePreset, options: TIME_SIG_OPTIONS },
                    { name: "piece_time_num", label: "Time Sig Num", type: "number", value: pNum, showWhen: { field: "piece_time_preset", value: "custom" } },
                    { name: "piece_time_den", label: "Time Sig Den", type: "number", value: pDen, showWhen: { field: "piece_time_preset", value: "custom" } },
                    { name: "piece_notes", label: "Notes", type: "textarea", value: piece.meta?.notes || "", span: 2 }
                  ]
                },
                {
                  id: "bar",
                  label: "Bar",
                  fields: [
                    { name: "bar_section", label: "Section Label", value: bar.meta?.section?.label || "" },
                    { name: "bar_time_preset", label: "Bar Time Signature", type: "select", value: barTimePreset, options: TIME_SIG_OPTIONS },
                    { name: "bar_time_num", label: "Bar Time Num", type: "number", value: bNum, showWhen: { field: "bar_time_preset", value: "custom" } },
                    { name: "bar_time_den", label: "Bar Time Den", type: "number", value: bDen, showWhen: { field: "bar_time_preset", value: "custom" } },
                    { name: "bar_key", label: "Bar Key", type: "select", value: bar.meta?.keySig || "", options: KEY_SIG_OPTIONS },
                    { name: "bar_barline_right", label: "Barline Right", type: "select", value: bar.meta?.barline?.right || "", options: BARLINE_OPTIONS }
                  ]
                }
              ],
              actions: [
                { id: "apply_meta", label: "Apply", kind: "primary" },
                { id: "clear_bar", label: "Clear Bar", kind: "secondary", onlyTab: "bar" },
                { id: "close", label: "Close", kind: "secondary" }
              ]
            }).then((result) => {
              if (!result || !result.values) return;
              const v = result.values;

              if (result.action === "clear_bar") {
                if (result.activeTab === "bar") this.clearBarMeta();
                this.wrap.focus();
                return;
              }
              if (result.action === "apply_meta") {
                if (result.activeTab === "bar") {
                  this.applyBarMetaFromValues(v);
                } else {
                  this.applyPieceMetaFromValues(v);
                }
                this.wrap.focus();
                return;
              }
            });
            this.wrap.focus();
            return;
          }

          if (action === "open-tuplet") {
            const def = this.getTupletDefForSelection();
            const settings = def ? {
              numNotes: def.numNotes,
              notesOccupied: def.notesOccupied,
              ratioed: !!def.ratioed,
              bracketed: !!def.bracketed
            } : this.tupletSettings;

            showModal({
              title: "Tuplet",
              body: "Apply tuplet settings to the selected range.",
              fields: [
                { name: "tuplet_num", label: "Notes", type: "number", value: settings.numNotes },
                { name: "tuplet_occ", label: "In the time of", type: "number", value: settings.notesOccupied },
                { name: "tuplet_ratio", label: "Show ratio", type: "checkbox", value: settings.ratioed },
                { name: "tuplet_bracket", label: "Show bracket", type: "checkbox", value: settings.bracketed }
              ],
              actions: [
                { id: "apply", label: "Apply", kind: "primary" },
                { id: "clear", label: "Clear Tuplet", kind: "secondary" },
                { id: "close", label: "Close", kind: "secondary" }
              ]
            }).then((result) => {
              if (!result) return;
              if (result.action === "clear") {
                this.clearTupletFromSelection();
                this.wrap.focus();
                return;
              }
              if (result.action === "apply") {
                const numNotes = parseInt(result.values.tuplet_num || "", 10);
                const notesOccupied = parseInt(result.values.tuplet_occ || "", 10);
                if (Number.isFinite(numNotes) && Number.isFinite(notesOccupied)) {
                  this.tupletSettings = {
                    numNotes,
                    notesOccupied,
                    ratioed: !!result.values.tuplet_ratio,
                    bracketed: !!result.values.tuplet_bracket
                  };
                  if (this.getSelectedEventIds().length >= 2) {
                    this.applyTupletFromSelection();
                  } else {
                    this.startTupletEntryAtSelection();
                  }
                }
                this.updateTupletButtonLabel();
                this.wrap.focus();
              }
            });
            this.wrap.focus();
            return;
          }

          if (action === "toggle-advanced") {
            this.advancedOpen = !this.advancedOpen;
            this.syncToggleButtons();
            this.wrap.focus();
            return;
          }

          // Techniques: kept intentionally simple (single-note or adjacent-note)
            if (action === "tech-bend") {
              this.piece = addTechnique(this.piece, "bend", { on: this.sel.eventId, amount: "1/2", index: 0 });
              this.markDirty();
              this.renderScore();
              this.wrap.focus();
              return;
            }

            if (action === "clear-tech") {
              const ids = this.getSelectedEventIds();
              const idSet = new Set(ids);
              this.piece = removeTechnique(this.piece, t =>
                idSet.has(t.on) || idSet.has(t.from) || idSet.has(t.to)
              );
              this.markDirty();
              this.renderScore();
              this.wrap.focus();
              return;
            }

          if (action === "slur-range") {
            this.addSlurFromSelection();
            this.wrap.focus();
            return;
          }

          if (action === "tie-range") {
            this.addTieFromSelection();
            this.wrap.focus();
            return;
          }

          if (action === "clear-slur") {
            this.clearSlurFromSelection();
            this.wrap.focus();
            return;
          }

          if (action === "clear-tie") {
            this.clearTieFromSelection();
            this.wrap.focus();
            return;
          }

          if (action === "copy-range") {
            this.copySelectionToClipboard();
            this.wrap.focus();
            return;
          }

          if (action === "cut-range") {
            this.copySelectionToClipboard();
            this.deleteSelectionRange();
            this.wrap.focus();
            return;
          }

          if (action === "paste-range") {
            this.pasteClipboardAtSelection();
            this.wrap.focus();
            return;
          }

          if (action === "delete-range") {
            this.deleteSelectionRange();
            this.wrap.focus();
            return;
          }

          if (action === "open-data") {
            showModal({
              title: "Data",
              body: "Export or paste JSON to import.",
              fields: [
                { name: "json", type: "textarea", value: this.serializePiece() }
              ],
              actions: [
                { id: "export", label: "Export", kind: "secondary" },
                { id: "copy", label: "Copy", kind: "secondary" },
                { id: "import", label: "Import", kind: "primary" },
                { id: "close", label: "Close", kind: "secondary" }
              ]
            }).then((result) => {
              if (!result) return;
              if (result.action === "export") {
                this.exportJsonFile();
                return;
              }
              if (result.action === "copy") {
                this.copyJsonToClipboard();
                return;
              }
              if (result.action === "import") {
                const text = (result.values?.json || "").trim();
                this.importJsonFromText(text);
              }
            });
            this.wrap.focus();
            return;
          }

          if (action === "toggle-paste") {
            this.pasteMode = this.pasteMode === "replace" ? "merge" : "replace";
            this.syncToggleButtons();
            this.wrap.focus();
            return;
          }

            if (action === "tech-slide-in") {
              this.piece = addTechnique(this.piece, "slide-in", { on: this.sel.eventId, index: 0 });
              this.markDirty();
              this.renderScore();
              this.wrap.focus();
              return;
            }

            // H/P/Slide need adjacent â€œfrom/toâ€
            if (action === "tech-h" || action === "tech-p" || action === "tech-slide") {
              const pair = this.getAdjacentPairFromSelection();
              if (!pair) {
                alert("Select two adjacent notes for this technique.");
                return;
              }

              const type = action === "tech-h" ? "hammer" : action === "tech-p" ? "pull" : "slide";
              this.piece = addTechnique(this.piece, type, { from: pair.fromId, to: pair.toId, fromIndex: 0, toIndex: 0 });
              this.markDirty();
              this.renderScore();
              this.wrap.focus();
              return;
            }

          if (action === "toggle-rest") {
            this.restMode = !this.restMode;
            this.syncToggleButtons();
            this.wrap.focus();
            return;
          }

          if (action === "toggle-reflow") {
            this.reflowEnabled = !this.reflowEnabled;
            this.syncToggleButtons();
            this.wrap.focus();
            return;
          }

          if (action === "toggle-entry") {
            this.entryMode = this.entryMode === "linear" ? "chord" : "linear";
            this.syncToggleButtons();
            this.wrap.focus();
            return;
          }

          if (action === "toggle-debug") {
            this.debugEnabled = !this.debugEnabled;
            this.syncToggleButtons();
            this.renderScore();
            this.wrap.focus();
            return;
          }

          if (action === "toggle-voice") {
            const target = this.sel.voiceId === "bass" ? "melody" : "bass";
            if (target === "bass") {
              this.piece = this.ensureVoiceInBar("bass", { stemDirection: -1 });
            }
            this.selectFirstEventInVoice(target);
            this._fretBuffer = "";
            clearTimeout(this._fretBufferTimer);
            this.markDirty();
            this.renderScore(() => this.syncInspectorFields());
            this.wrap.focus();
            return;
          }

          if (action === "add-bass") {
            this.piece = this.ensureVoiceInBar("bass", { stemDirection: -1 });
            this.selectFirstEventInVoice("bass");
            this._fretBuffer = "";
            clearTimeout(this._fretBufferTimer);
            this.markDirty();
            this.renderScore(() => this.syncInspectorFields());
            this.wrap.focus();
            return;
          }

          if (action === "remove-bass") {
            this.piece = this.removeVoiceFromBar("bass");
            if (this.sel.voiceId === "bass") {
              this.selectFirstEventInVoice("melody");
            }
            this._fretBuffer = "";
            clearTimeout(this._fretBufferTimer);
            this.markDirty();
            this.renderScore(() => this.syncInspectorFields());
            this.wrap.focus();
            return;
          }

          if (action === "reset-piece") {
            this.loadPiece(clone(EMPTY_PIECE));
            return;
          }
        }

        onChordChange(e) {
          const chord = e.target.value.trim();
          this.piece = setChord(this.piece, this.sel.eventId, chord);
          this.markDirty();
          this.renderScore();
        }

        syncInspectorFields() {
          const ref = findEventRef(this.piece, this.sel.eventId);
          if (!ref) return;

          // duration button state
          this.shadowRoot.querySelectorAll(".btn.dur").forEach(b => {
            const baseDur = ref.ev.duration.replace("r", "");
            b.classList.toggle("on", b.dataset.dur === baseDur);
          });

          // dot
          const dotBtn = this.shadowRoot.querySelector('[data-action="dot"]');
          dotBtn.classList.toggle("on", !!(ref.ev.dots || 0));

          // chord input
          const chordInput = this.shadowRoot.querySelector(".chord");
          chordInput.value = ref.ev.chord || "";

          this.updateActiveDurationFromSelection();
          this.syncToggleButtons();
          this.updateTupletButtonLabel();
          const titleEl = this.shadowRoot.querySelector(".piece-title");
          if (titleEl) {
            titleEl.textContent = this.piece?.meta?.title || "Untitled";
          }
        }

        syncToggleButtons() {
          const restBtn = this.shadowRoot.querySelector('[data-action="toggle-rest"]');
          const reflowBtn = this.shadowRoot.querySelector('[data-action="toggle-reflow"]');
          const entryBtn = this.shadowRoot.querySelector('[data-action="toggle-entry"]');
          const voiceBtn = this.shadowRoot.querySelector('[data-action="toggle-voice"]');
          const pasteBtn = this.shadowRoot.querySelector('[data-action="toggle-paste"]');
          const advBtn = this.shadowRoot.querySelector('[data-action="toggle-advanced"]');
          const advPanel = this.shadowRoot.querySelector(".advanced");
          if (restBtn) restBtn.classList.toggle("on", this.restMode);
          if (reflowBtn) reflowBtn.classList.toggle("on", this.reflowEnabled);
          if (entryBtn) {
            entryBtn.classList.toggle("on", this.entryMode === "linear");
            entryBtn.textContent = `Entry: ${this.entryMode === "linear" ? "Linear" : "Chord"}`;
          }
          if (voiceBtn) {
            const label = this.sel.voiceId === "bass" ? "Bass" : "Melody";
            voiceBtn.classList.toggle("on", this.sel.voiceId === "bass");
            voiceBtn.textContent = `Voice: ${label}`;
          }
          if (pasteBtn) {
            pasteBtn.classList.toggle("on", this.pasteMode === "merge");
            pasteBtn.textContent = `Paste: ${this.pasteMode === "merge" ? "Merge" : "Replace"}`;
          }
          if (advBtn) advBtn.classList.toggle("on", this.advancedOpen);
          if (advPanel) advPanel.classList.toggle("open", this.advancedOpen);
          const debugBtn = this.shadowRoot.querySelector('[data-action="toggle-debug"]');
          if (debugBtn) {
            debugBtn.classList.toggle("on", this.debugEnabled);
            debugBtn.textContent = `Debug: ${this.debugEnabled ? "On" : "Off"}`;
          }
        }

        getTieChainEndId(startId) {
          if (!startId) return null;
          const forward = new Map();
          this.piece?.bars?.forEach(b => {
            (b.ties || []).forEach(t => forward.set(t.from, t.to));
          });
          let cur = startId;
          while (forward.has(cur)) {
            cur = forward.get(cur);
          }
          return cur;
        }

        updateActiveDurationFromSelection() {
          const ref = findEventRef(this.piece, this.sel.eventId);
          if (!ref) return;
          if (ref.ev.duration.includes("r") || ref.ev.hidden) return;
          this.activeDuration = {
            dur: ref.ev.duration.replace("r", ""),
            dots: ref.ev.dots || 0
          };
        }

        // ---------- Overlay rendering (hit targets + selection) ----------
        refreshOverlaySelection() {
          // update selected class on hits
          this.shadowRoot.querySelectorAll(".hit").forEach(el => {
            const sameVoice = el.dataset.voiceId === (this.sel.voiceId || "melody");
            const isPrimary = sameVoice
              && el.dataset.eventId === this.sel.eventId
              && Number(el.dataset.stringIndex) === this.sel.stringIndex;
            const isRange = sameVoice
              && this.sel.rangeIds
              && this.sel.rangeIds.includes(el.dataset.eventId)
              && Number(el.dataset.stringIndex) === this.sel.rangeStringIndex;
            el.classList.toggle("selected", isPrimary || isRange);
          });

          // caret
          const hit = this._hitIndex.find(h =>
            h.eventId === this.sel.eventId
            && h.stringIndex === this.sel.stringIndex
            && h.voiceId === this.sel.voiceId
          ) || this._hitIndex.find(h => h.eventId === this.sel.eventId && h.voiceId === this.sel.voiceId);
          if (hit) {
            this.caretEl.hidden = false;
            this.caretEl.style.left = `${hit.x}px`;
          } else {
            this.caretEl.hidden = true;
          }
        }

        rebuildOverlayHits(hits, totalH) {
          this._hitIndex = hits;

          this.overlay.innerHTML = "";
          this.overlay.style.position = "absolute";
          this.overlay.style.left = "0";
          this.overlay.style.top = "0";
          this.overlay.style.width = `${this.systemW}px`;
          this.overlay.style.height = `${totalH}px`;

          for (const h of hits) {
            const div = document.createElement("div");
            div.className = "hit";
            div.style.left = `${h.x}px`;
            div.style.top = `${h.y}px`;
            div.dataset.eventId = h.eventId;
            div.dataset.stringIndex = String(h.stringIndex);
            div.dataset.voiceId = h.voiceId;

            div.addEventListener("mousedown", (ev) => {
              ev.preventDefault();
              if (ev.shiftKey) {
                const anchor = this.sel.anchorId || this.sel.eventId || h.eventId;
                this.selectRange(anchor, h.eventId, h.stringIndex, h.voiceId);
              } else {
                this.setSingleSelection(h.eventId, h.stringIndex, h.voiceId);
              }
              this._fretBuffer = "";
              clearTimeout(this._fretBufferTimer);
              this.refreshOverlaySelection();
              this.syncInspectorFields();
              this.wrap.focus();
            });

            this.overlay.appendChild(div);
          }

          this.refreshOverlaySelection();
          this.syncInspectorFields();
        }

        // ---------- Main render ----------
        renderScore(afterRenderCb) {
          const piece = this.piece;
          const bars = piece.bars || [];
          if (!bars.length) return;
          this.systemW = this.getSystemWidth();
          const systemW = this.systemW;

          // build runtimes + widths
          const runtimes = bars.map(b => buildBarRuntime(piece, b));
          const measures = runtimes.map(rt => measureBarMinWidth(rt));
          const barWidths = measures.map(m => m.base);
          const barExtraFirst = measures.map(m => m.extraFirst);

          const barTimeSigs = [];
          const barKeySigs = [];
          let lastTimeSig = piece.defaults?.timeSig || [4, 4];
          let lastKeySig = piece.defaults?.keySig || "C";
          bars.forEach((bar, i) => {
            const timeSig = bar.meta?.timeSig || lastTimeSig;
            const keySig = bar.meta?.keySig || lastKeySig;
            barTimeSigs[i] = timeSig;
            barKeySigs[i] = keySig;
            lastTimeSig = timeSig;
            lastKeySig = keySig;
          });

          const barExtraChange = bars.map((bar, i) => {
            if (i === 0) return 0;
            const timeChanged = timeSigKey(barTimeSigs[i]) !== timeSigKey(barTimeSigs[i - 1]);
            const keyChanged = barKeySigs[i] !== barKeySigs[i - 1];
            const hasKeyOverride = !!bar.meta?.keySig;
            if (!timeChanged && !keyChanged && !hasKeyOverride) return 0;
            const insetWithModifiers = modifierLeftInset({
              clef: null,
              keySig: barKeySigs[i],
              timeSig: barTimeSigs[i],
              cancelKey: keyChanged ? barKeySigs[i - 1] : null
            });
            return Math.max(0, Math.ceil(insetWithModifiers - BASE_LEFT_INSET));
          });
          if (barWidths.length) barWidths[barWidths.length - 1] += LAST_ROW_BONUS;

          // line-break
          const maxSystemContentW = systemW - PAD_L - PAD_R;
          const systems = layoutSystems(barWidths, barExtraFirst, barExtraChange, maxSystemContentW);

          // renderer height
          const rowHeight = TOP_LANE + TAB_GAP + 95;
          const totalH = STAVE_Y0 + systems.length * (rowHeight + SYSTEM_GAP);

          this.container.innerHTML = "";
          const renderer = new Flow.Renderer(this.container, Flow.Renderer.Backends.SVG);
          renderer.resize(systemW, totalH);
          const context = renderer.getContext();

          // courtesy tracking
          let activeTimeSig = piece.defaults?.timeSig || [4, 4];
          let activeKeySig = piece.defaults?.keySig || "C";

          // hits weâ€™ll build for the overlay (tab â€œcellsâ€)
          const overlayHits = [];
          const globalNoteById = new Map();
          const globalTies = bars.flatMap(b => b.ties || []);

          systems.forEach((barIdxs, row) => {
            const rowStaveY = STAVE_Y0 + row * (rowHeight + SYSTEM_GAP);
            const rowTabY = rowStaveY + TAB_GAP;
            const chordLaneY = rowStaveY - 18;

            const rowMin = barIdxs.reduce((sum, bi, idx) =>
              sum + barWidths[bi] + (idx === 0 ? barExtraFirst[bi] : barExtraChange[bi]), 0);
            const slack = Math.max(0, maxSystemContentW - rowMin);
            const p = 1.4;
            const weights = barIdxs.map((bi, idx) =>
              Math.pow(barWidths[bi] + (idx === 0 ? barExtraFirst[bi] : barExtraChange[bi]), p));
            const W = weights.reduce((a, b) => a + b, 0);
            const extraForBar = (j) => (W <= 0 ? 0 : slack * (weights[j] / W));

            let x = PAD_L;
            const rowChordAnchors = [];

            barIdxs.forEach((bi, j) => {
              const bar = bars[bi];
              const rt = buildBarRuntime(piece, bar);

              const barTimeSig = bar.meta?.timeSig || activeTimeSig;
              const barKeySig = bar.meta?.keySig || activeKeySig;

              const isFirstInRow = j === 0;
              const isLastInRow = j === barIdxs.length - 1;
              const barW = Math.floor(
                barWidths[bi]
                + (isFirstInRow ? barExtraFirst[bi] : barExtraChange[bi])
                + extraForBar(j)
              );

              const stave = new Flow.Stave(x, rowStaveY, barW);
              const tabStave = new Flow.TabStave(x, rowTabY, barW);

              if (isFirstInRow) stave.addClef(rt.clef);

              const timeChanged = timeSigKey(barTimeSig) !== timeSigKey(activeTimeSig);
              const showTime = (row === 0 && isFirstInRow) || timeChanged;
              const keyChanged = barKeySig !== activeKeySig;
              const hasKeyOverride = !!bar.meta?.keySig;
              const showKey = isFirstInRow || keyChanged || hasKeyOverride;

              if (showTime) stave.addTimeSignature(`${barTimeSig[0]}/${barTimeSig[1]}`);
              if (showKey && barKeySig) {
                const cancelKey = keyChanged ? activeKeySig : null;
                stave.addKeySignature(barKeySig, cancelKey);
              }

              activeTimeSig = barTimeSig;
              activeKeySig = barKeySig;

              const rightBarline = mapBarlineType(bar.meta?.barline?.right);
              stave.setEndBarType(rightBarline);
              tabStave.setEndBarType(rightBarline);

              stave.setContext(context).draw();
              tabStave.setContext(context).draw();

              tabStave.setNoteStartX(stave.getNoteStartX() + 2);

              if (isFirstInRow) {
                const bracket = new Flow.StaveConnector(stave, tabStave);
                bracket.setType(Flow.StaveConnector.type.BRACKET);
                bracket.setContext(context).draw();

                const leftLine = new Flow.StaveConnector(stave, tabStave);
                leftLine.setType(Flow.StaveConnector.type.SINGLE_LEFT);
                leftLine.setContext(context).draw();
              }

              const sectionLabel = bar.meta?.section?.label;
              if (sectionLabel) {
                context.save();
                context.setFont("Arial", 14, "");
                context.fillText(sectionLabel, x + 2, chordLaneY);
                context.restore();
              }

              if (isLastInRow) {
                const rightLine = new Flow.StaveConnector(stave, tabStave);
                rightLine.setType(Flow.StaveConnector.type.SINGLE_RIGHT);
                rightLine.setContext(context).draw();
              }

              Flow.Accidental.applyAccidentals(rt.notationVoices, barKeySig);

              const leftInset = stave.getNoteStartX() - stave.getX();
              const available = Math.max(40, barW - leftInset - BARLINE_PAD_R);

              rt.notationVoices.forEach(v => v.setStave(stave));
              (rt.tabVoices || []).forEach(v => v.setStave(tabStave));

              const hasTuplets = bar.voices.some(v => v.events.some(e => e.tupletGroupId));
              const gridStep = hasTuplets ? null : computeGridStep(bar);
              const gridDur = gridStep ? durationForBeats(gridStep) : null;
              let gridVoice = null;
              if (gridDur) {
                const gridNotes = [];
                const [beats, beatValue] = barTimeSig;
                const barLen = beats * (4 / beatValue);
                const count = Math.max(1, Math.round(barLen / gridStep));
                for (let i = 0; i < count; i++) {
                  gridNotes.push(new Flow.GhostNote({ duration: gridDur }));
                }
                gridVoice = new Flow.Voice({ num_beats: beats, beat_value: beatValue });
                gridVoice.setMode(Flow.Voice.Mode.FULL);
                gridVoice.addTickables(gridNotes);
              }

              const allVoices = [
                ...rt.notationVoices,
                ...(rt.tabVoices || []),
                ...(gridVoice ? [gridVoice] : [])
              ];
              const formatter = new Flow.Formatter();
              if (typeof formatter.setSoftmaxFactor === "function") {
                formatter.setSoftmaxFactor(0);
              }
              formatter.joinVoices(allVoices);
              formatter.format(allVoices, available);

              // draw
              rt.notationVoices.forEach(v => v.draw(context, stave));
              rt.beams.forEach(b => b.setContext(context).draw());
              rt.tuplets.forEach(t => t.setContext(context).draw());
              rt.slurs.forEach(s => s.setContext(context).draw());
              (rt.tabVoices || []).forEach(v => v.draw(context, tabStave));

              drawGuitarTechniques({
                context,
                tabStave,
                tech: bar.guitar || [],
                tabNoteById: rt.tabNoteById
              });

              if (this.debugEnabled) {
                const yTop = stave.getY() - 10;
                const yBottom = tabStave.getY() + tabStave.getHeight() + 10;
                context.save();
                context.setLineWidth(1);
                context.setStrokeStyle("rgba(200,0,0,0.35)");
                rt.notationVoices.forEach(v => {
                  (v.getTickables() || []).forEach(t => {
                    const xAbs = t.getAbsoluteX ? t.getAbsoluteX() : null;
                    if (typeof xAbs !== "number") return;
                    context.beginPath();
                    context.moveTo(xAbs, yTop);
                    context.lineTo(xAbs, yBottom);
                    context.stroke();
                  });
                });
                context.setStrokeStyle("rgba(0,100,200,0.35)");
                (rt.tabVoices || []).forEach(v => {
                  (v.getTickables() || []).forEach(t => {
                    const xAbs = t.getAbsoluteX ? t.getAbsoluteX() : null;
                    if (typeof xAbs !== "number") return;
                    context.beginPath();
                    context.moveTo(xAbs, yTop);
                    context.lineTo(xAbs, yBottom);
                    context.stroke();
                  });
                });
                context.restore();

                const currentBi = this.getCurrentBarIndex();
                if (bi === currentBi) {
                  const logKey = `${bi}:${bars[bi]?.voices?.length || 0}:${this.sel.eventId || ""}`;
                  if (this._debugLogKey !== logKey) {
                    this._debugLogKey = logKey;
                    const rows = [];
                    bars[bi].voices.forEach((v) => {
                      v.events.forEach((ev) => {
                        const note = rt.noteById.get(ev.id);
                        const tabNote = rt.tabNoteById.get(ev.id);
                        const noteX = note && note.getAbsoluteX ? note.getAbsoluteX() : null;
                        const tabX = tabNote && tabNote.getAbsoluteX ? tabNote.getAbsoluteX() : null;
                        const tickCtx = note && note.getTickContext ? note.getTickContext() : null;
                        const tickX = tickCtx && tickCtx.getX ? tickCtx.getX() : null;
                        const width = note && note.getWidth ? note.getWidth() : null;
                        const ticks = note && note.getTicks && note.getTicks().value ? note.getTicks().value() : null;
                        rows.push({
                          voice: v.id,
                          id: ev.id,
                          start: ev.start,
                          duration: ev.duration,
                          dots: ev.dots || 0,
                          noteX,
                          tabX,
                          tickX,
                          width,
                          ticks
                        });
                      });
                    });
                    console.group(`debug bar ${bi}`);
                    console.table(rows);
                    console.groupEnd();
                  }
                }
              }

              rt.noteById.forEach((val, key) => globalNoteById.set(key, val));

              rowChordAnchors.push(...rt.chordAnchors);

              // ---- build overlay â€œhit targetsâ€ for each sounding tab position ----
              // We anchor to each string line (1..6). If the event doesnâ€™t have that string, still allow selecting it.
              const spines = rt.tabEventsByVoice || [];
              spines.forEach(spine => {
                spine.events.forEach(ev => {
                  if (isHiddenRestFiller(ev)) return;
                  if (!ev.id) return;
                  const tabNote = rt.tabNoteById.get(ev.id);
                  if (!tabNote) return;

                  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
                    // place hit at this noteâ€™s X and the corresponding string line Y
                    const xAbs = tabNote.getAbsoluteX();
                    const yAbs = tabYForString(tabStave, stringIndex + 1);
                    overlayHits.push({ eventId: ev.id, stringIndex, voiceId: spine.voiceId, x: xAbs, y: yAbs });
                  }
                });
              });

              x += barW;
            });

            drawChordLane({
              context,
              y: chordLaneY,
              anchors: rowChordAnchors,
              leftX: PAD_L,
              rightX: systemW - PAD_R
            });
          });

          const tieObjects = buildTiesGlobal(globalTies, globalNoteById);
          tieObjects.forEach(t => t.setContext(context).draw());

          // build overlay after drawing (so getAbsoluteX/Y are valid)
          this.rebuildOverlayHits(overlayHits, totalH);

          this.persistIfDirty();
          if (typeof afterRenderCb === "function") afterRenderCb();
        }
      }

      customElements.define("jg-score-view", JGScoreView);
    }





