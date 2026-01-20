import "./style.css";
import { initTabEditor } from "./editor.js";
import { initSongbook } from "./songbook.js";
import { initModal } from "./modal.js";
import { initGuitarFretboard } from "./guitar-fretboard.js";

initTabEditor();
initSongbook();
initModal();
initGuitarFretboard();

const songbook = document.querySelector("jg-songbook");
const editor = document.querySelector("jg-score-view");
const viewButtons = document.querySelectorAll(".app-btn");

function setActiveView(name) {
  document.querySelectorAll(".view").forEach(el => {
    el.classList.toggle("active", el.dataset.view === name);
  });
  viewButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === name);
  });
}

viewButtons.forEach(btn => {
  btn.addEventListener("click", () => setActiveView(btn.dataset.view));
});

if (songbook) {
  songbook.addEventListener("open-piece", (e) => {
    if (editor && typeof editor.loadPiece === "function") {
      editor.loadPiece(e.detail.piece);
      setActiveView("editor");
    }
  });

  songbook.addEventListener("request-current-piece", () => {
    if (!editor || typeof editor.getPieceClone !== "function") return;
    songbook.addPiece(editor.getPieceClone());
  });

  songbook.addEventListener("open-empty-piece", (e) => {
    if (!editor || typeof editor.getEmptyPieceClone !== "function") return;
    const piece = editor.getEmptyPieceClone();
    if (e.detail?.meta) {
      piece.meta ||= {};
      Object.entries(e.detail.meta).forEach(([key, value]) => {
        if (value) piece.meta[key] = value;
      });
    }
    editor.loadPiece(piece);
    setActiveView("editor");
  });
}

setActiveView("songbook");
