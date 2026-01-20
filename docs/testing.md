# Testing

## E2E (Playwright)

Run everything:

```bash
npm test
```

Run a single spec file:

```bash
npx playwright test tests/e2e/editor-selection.spec.js
```

Run by tag:

```bash
npx playwright test -g "@smoke"
npx playwright test -g "@editor"
npx playwright test -g "@tuplets"
npx playwright test -g "@songbook"
npx playwright test -g "@editor @selection"
```

Convenience scripts:

```bash
npm run test:smoke
npm run test:editor
npm run test:tuplets
npm run test:songbook
```

## Unit (Vitest)

```bash
npm run test:unit
```
