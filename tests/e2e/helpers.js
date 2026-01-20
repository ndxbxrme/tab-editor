const { expect } = require("@playwright/test");

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

module.exports = {
  openEditor,
  openSongbook,
  getPiece
};
