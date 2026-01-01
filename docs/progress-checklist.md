# Progress Checklist

Use this as a living checklist for the jazz guitar tab editor.

## Foundations
- [ ] Define the score JSON format as the canonical data model (done: docs/score-json.md)
- [ ] Add a minimal empty piece template for testing
- [ ] Add import/export JSON (file + clipboard)
- [ ] Add localStorage persistence (with clear/reset)

## Editor Refactor (Vanilla + Vite)
- [ ] Split editor into `src/` modules (model, renderer, editor state, UI)
- [ ] Define web component API: `setPiece`, `getPiece`, `setEditable`, `onChange`
- [ ] Make editor component usable standalone in read-only mode

## Editing Reliability
- [ ] Stabilize selection/caret across rerenders
- [ ] Fix any remaining overlap/layout glitches on resize
- [ ] Improve keyboard navigation across voices and strings
- [ ] Add undo/redo stack

## Input Workflows
- [ ] Lead sheet input (melody + chords + structure)
- [ ] Full tab input (multi-voice + tuplets)
- [ ] Exercises (placeholder structure + renderer)

## Arrangement Tools
- [ ] Transpose selection (melody + chords)
- [ ] Reharmonize selection (basic chord substitution)
- [ ] Borrow phrases from other pieces + auto-transpose
- [ ] Add section builder (cycle of 5ths, turnarounds)

## Output
- [ ] Print/export to PDF (read-only render)
- [ ] Embed renderer in static pages

## Testing
- [ ] Add Playwright for E2E tests (smoke: load, resize, edit, import/export)
