# Score JSON format

This document describes the current JSON schema used by the tab editor.
It is intentionally lightweight and reflects the runtime expectations in `index.html`.

## Top level

```json
{
  "defaults": { "timeSig": [4, 4], "keySig": "Eb", "clef": "treble" },
  "tuningMidiByString": { "6": 40, "5": 45, "4": 50, "3": 55, "2": 59, "1": 64 },
  "bars": [ ... ]
}
```

### defaults
- `timeSig`: `[beats, beatValue]` (e.g. `[4,4]`).
- `keySig`: VexFlow key signature string (e.g. `"Eb"`, `"C"`, `"F#"`).
- `clef`: VexFlow clef string (e.g. `"treble"`).

### tuningMidiByString
- Map of string number (1..6) to MIDI note number for the open string.
- String `1` is the high E; string `6` is the low E.

### bars
Array of bar objects (measures).

## Bar object

```json
{
  "meta": {
    "timeSig": [4, 4],
    "keySig": "Eb",
    "section": { "label": "A" },
    "barline": { "left": "single", "right": "final" }
  },
  "tuplets": [ ... ],
  "guitar": [ ... ],
  "voices": [ ... ],
  "ties": [ ... ],
  "slurs": [ ... ]
}
```

### meta (optional)
- `timeSig`: overrides defaults for this bar.
- `keySig`: overrides defaults for this bar.
- `section.label`: section marker printed above the staff.
- `barline.left` / `barline.right`: `"single"`, `"double"`, `"final"`, `"repeat_begin"`, `"repeat_end"`, `"none"`.

### tuplets (optional)
Tuplet definitions used by events in `voices`.

```json
{ "id": "t1", "numNotes": 6, "notesOccupied": 4, "ratioed": false, "bracketed": false }
```

### guitar (optional)
Technique annotations tied to events.

```json
{ "type": "hammer", "from": "b1n2", "to": "b1n3" }
{ "type": "pull", "from": "b1n5", "to": "b1n6" }
{ "type": "slide", "from": "b1n8", "to": "b1n9" }
{ "type": "bend", "on": "b1n9", "amount": "1/2" }
```

Supported types today: `hammer`, `pull`, `slide`, `bend`.

### voices
Array of voice objects. Each voice has an `events` array.

```json
{
  "id": "melody",
  "stemDirection": 1,
  "events": [ ... ]
}
```

### ties / slurs (optional)
Connect events by ID.

```json
{ "from": "b1n7", "to": "b1n8" }
```

## Event object

```json
{
  "id": "b1n1",
  "start": 0,
  "duration": "16",
  "dots": 1,
  "tupletGroupId": "t1",
  "chord": "C7alt",
  "tones": [ { "string": 1, "fret": 8 } ]
}
```

### event fields
- `id`: unique ID string.
- `start`: beat position as a number (0 = bar start, 1 = beat 2, 1.5 = the "and" of 2, etc).
- `duration`: `"w" | "h" | "q" | "8" | "16" | "32"` with optional `"r"` for rests (e.g. `"8r"`).
- `dots`: number of augmentation dots (optional).
- `tupletGroupId`: ID of a tuplets entry (optional).
- `chord`: chord symbol displayed above the staff (optional).
- `tones`: array of `{ string, fret }` (optional). If empty or omitted, the event is treated as a rest.
- `hidden`: if true, draws a transparent note/rest (editor uses this for spacing).

### tones
- `string`: 1..6.
- `fret`: integer 0..24 (the editor clamps to this).

## Notes
- `start` and `duration` are currently treated as beats, not ticks. Make sure that the sum of durations in each voice fits the time signature if you want strict layout.
- The renderer currently assumes standard 6-string guitar tuning based on `tuningMidiByString`.
