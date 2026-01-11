import { showModal } from "./modal.js";

const SONGBOOK_KEY = "jg-tab-editor:songbook";

function clone(obj) {
  return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

function emptySongbook() {
  return { version: 1, pieces: [] };
}

function loadSongbook() {
  try {
    const raw = localStorage.getItem(SONGBOOK_KEY);
    if (!raw) return emptySongbook();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.pieces)) return emptySongbook();
    return parsed;
  } catch {
    return emptySongbook();
  }
}

function saveSongbook(book) {
  try {
    localStorage.setItem(SONGBOOK_KEY, JSON.stringify(book));
  } catch {
    // ignore storage failures
  }
}

function makeId(prefix = "p") {
  return `${prefix}${Math.random().toString(36).slice(2, 10)}`;
}

function formatDate(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString();
}

function normalizePieceMeta(piece) {
  const meta = piece?.meta || {};
  return {
    title: meta.title || "Untitled",
    type: meta.type || "",
    arranger: meta.arranger || "",
    composer: meta.composer || "",
    style: meta.style || "",
    bpm: meta.bpm || ""
  };
}

function summarizeMeta(meta) {
  const bits = [];
  if (meta.type) bits.push(meta.type);
  if (meta.composer) bits.push(`Composer: ${meta.composer}`);
  if (meta.arranger) bits.push(`Arr: ${meta.arranger}`);
  if (meta.style) bits.push(meta.style);
  if (meta.bpm) bits.push(`${meta.bpm} bpm`);
  return bits.join(" · ");
}

export function initSongbook() {
  if (customElements.get("jg-songbook")) return;

  class JGSongbook extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.book = loadSongbook();
      this.query = "";
      this.sort = "updated-desc";
      this.selectedId = null;
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; width:100%; height:100%; box-sizing:border-box;
                  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
          .shell { height:100%; display:flex; flex-direction:column; gap:10px; padding:12px; }
          .toolbar { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
          .toolbar .spacer { flex:1 1 auto; }
          .btn {
            font: inherit;
            font-size: 12px;
            padding: 6px 8px;
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,.14);
            background: #fff;
            cursor: pointer;
          }
          .btn.primary { background: rgba(0,188,212,.12); border-color: rgba(0,188,212,.6); }
          .btn.danger { border-color: rgba(200,0,0,.4); color: #b00000; }
          .field, select {
            font: inherit;
            font-size: 12px;
            padding: 6px 8px;
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,.14);
          }
          .list { display:flex; flex-direction:column; gap:8px; }
          .row {
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 12px;
            padding: 10px;
            display:flex;
            gap:10px;
            align-items:center;
          }
          .row.selected { outline: 2px solid rgba(0,188,212,.6); }
          .meta { font-size: 12px; opacity: .75; }
          .title { font-size: 14px; font-weight: 600; }
          .col { display:flex; flex-direction:column; gap:4px; flex:1 1 auto; }
          .actions { display:flex; gap:6px; flex-wrap:wrap; }
          .empty { opacity:.6; font-size:12px; padding:12px; border:1px dashed rgba(0,0,0,.2); border-radius:10px; }
        </style>
        <div class="shell">
          <div class="toolbar">
            <button class="btn primary" data-action="save-current">Save Current Piece</button>
            <button class="btn" data-action="new-piece">New Piece</button>
            <input class="field" type="file" accept="application/json" data-action="import-file" />
            <button class="btn" data-action="import-json">Import JSON</button>
            <button class="btn" data-action="export-selected">Export Selected</button>
            <button class="btn" data-action="export-all">Export All</button>
            <span class="spacer"></span>
            <input class="field" type="text" placeholder="Search" data-action="search" />
            <select class="field" data-action="sort">
              <option value="updated-desc">Recently Updated</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="created-desc">Newest</option>
              <option value="created-asc">Oldest</option>
              <option value="bpm-asc">BPM (Low-High)</option>
              <option value="bpm-desc">BPM (High-Low)</option>
            </select>
          </div>
          <div class="list"></div>
        </div>
      `;

      this.shadowRoot.addEventListener("click", (e) => this.onClick(e));
      this.shadowRoot.querySelector('[data-action="search"]').addEventListener("input", (e) => {
        this.query = e.target.value || "";
        this.renderList();
      });
      this.shadowRoot.querySelector('[data-action="sort"]').addEventListener("change", (e) => {
        this.sort = e.target.value || "updated-desc";
        this.renderList();
      });
      this.shadowRoot.querySelector('[data-action="import-file"]').addEventListener("change", (e) => {
        this._importFile = e.target.files?.[0] || null;
      });

      this.renderList();
    }

    getPieces() {
      return this.book.pieces || [];
    }

    persist() {
      saveSongbook(this.book);
      this.renderList();
    }

    setSelected(id) {
      this.selectedId = id;
      this.renderList();
    }

    addPiece(piece) {
      const meta = normalizePieceMeta(piece);
      const now = Date.now();
      piece.meta ||= {};
      let id = piece.meta.id;
      const existingIndex = id ? this.book.pieces.findIndex(p => p.id === id) : -1;
      if (!id || existingIndex === -1) {
        id = makeId();
        piece.meta.id = id;
        piece.meta.createdAt = piece.meta.createdAt || now;
      }
      piece.meta.updatedAt = now;

      const entry = {
        id,
        title: meta.title,
        type: meta.type,
        arranger: meta.arranger,
        composer: meta.composer,
        style: meta.style,
        bpm: meta.bpm,
        createdAt: piece.meta.createdAt || now,
        updatedAt: now,
        piece: clone(piece)
      };

      if (existingIndex >= 0) {
        this.book.pieces.splice(existingIndex, 1, entry);
      } else {
        this.book.pieces.push(entry);
      }
      this.selectedId = id;
      this.persist();
    }

    importPayload(payload) {
      if (!payload) return;
      if (payload.pieces && Array.isArray(payload.pieces)) {
        payload.pieces.forEach(entry => {
          if (entry.piece) this.addPiece(entry.piece);
        });
        return;
      }
      if (payload.bars && Array.isArray(payload.bars)) {
        this.addPiece(payload);
      }
    }

    exportPayload(payload, filename) {
      const text = JSON.stringify(payload, null, 2);
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }

    getVisiblePieces() {
      const q = this.query.trim().toLowerCase();
      let items = [...this.getPieces()];
      if (q) {
        items = items.filter(entry => {
          const fields = [
            entry.title,
            entry.type,
            entry.arranger,
            entry.composer,
            entry.style
          ].join(" ").toLowerCase();
          return fields.includes(q);
        });
      }

      const sorter = {
        "updated-desc": (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0),
        "created-desc": (a, b) => (b.createdAt || 0) - (a.createdAt || 0),
        "created-asc": (a, b) => (a.createdAt || 0) - (b.createdAt || 0),
        "title-asc": (a, b) => (a.title || "").localeCompare(b.title || ""),
        "title-desc": (a, b) => (b.title || "").localeCompare(a.title || ""),
        "bpm-asc": (a, b) => (Number(a.bpm || 0) - Number(b.bpm || 0)),
        "bpm-desc": (a, b) => (Number(b.bpm || 0) - Number(a.bpm || 0))
      }[this.sort] || ((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

      items.sort(sorter);
      return items;
    }

    renderList() {
      const list = this.shadowRoot.querySelector(".list");
      if (!list) return;
      const items = this.getVisiblePieces();
      if (!items.length) {
        list.innerHTML = `<div class="empty">No pieces yet. Save a piece from the editor or import JSON.</div>`;
        return;
      }

      list.innerHTML = items.map(entry => {
        const meta = summarizeMeta(entry);
        const updated = formatDate(entry.updatedAt);
        const selected = entry.id === this.selectedId ? "selected" : "";
        return `
          <div class="row ${selected}" data-id="${entry.id}">
            <div class="col">
              <div class="title">${entry.title || "Untitled"}</div>
              <div class="meta">${meta || " "}</div>
              <div class="meta">${updated ? `Updated: ${updated}` : ""}</div>
            </div>
            <div class="actions">
              <button class="btn" data-action="load" data-id="${entry.id}">Load</button>
              <button class="btn" data-action="export" data-id="${entry.id}">Export</button>
              <button class="btn danger" data-action="delete" data-id="${entry.id}">Delete</button>
            </div>
          </div>
        `;
      }).join("");
    }

    async onClick(e) {
      const btn = e.target.closest("button");
      const row = e.target.closest(".row");
      if (row && row.dataset.id && !btn) {
        this.setSelected(row.dataset.id);
      }
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if (action === "save-current") {
        this.dispatchEvent(new CustomEvent("request-current-piece", { bubbles: true }));
        return;
      }

      if (action === "new-piece") {
        const result = await showModal({
          title: "New Piece",
          body: "Set a title and type now, or leave blank and fill it later.",
          fields: [
            { name: "title", label: "Title", placeholder: "Untitled" },
            { name: "type", label: "Type", placeholder: "Arrangement / Lead sheet / Exercise" }
          ],
          actions: [
            { id: "cancel", label: "Cancel", kind: "secondary" },
            { id: "confirm", label: "Create", kind: "primary" }
          ]
        });
        if (!result || result.action !== "confirm") return;
        const meta = {
          title: (result.values.title || "").trim(),
          type: (result.values.type || "").trim()
        };
        this.dispatchEvent(new CustomEvent("open-empty-piece", {
          detail: { meta },
          bubbles: true
        }));
        return;
      }

      if (action === "import-json") {
        if (this._importFile) {
          const file = this._importFile;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const parsed = JSON.parse(reader.result);
              this.importPayload(parsed);
            } catch {
              alert("Import failed. Invalid JSON.");
            }
          };
          reader.readAsText(file);
        }
        return;
      }

      if (action === "export-all") {
        this.exportPayload({ version: 1, pieces: this.book.pieces }, "songbook.json");
        return;
      }

      if (action === "export-selected") {
        const entry = this.book.pieces.find(p => p.id === this.selectedId);
        if (entry) this.exportPayload(entry.piece, `${entry.title || "piece"}.json`);
        return;
      }

      if (!id) return;
      const entry = this.book.pieces.find(p => p.id === id);
      if (!entry) return;

      if (action === "load") {
        this.dispatchEvent(new CustomEvent("open-piece", {
          detail: { piece: clone(entry.piece) },
          bubbles: true
        }));
        return;
      }

      if (action === "export") {
        this.exportPayload(entry.piece, `${entry.title || "piece"}.json`);
        return;
      }

      if (action === "delete") {
        if (!confirm("Delete this piece from the songbook?")) return;
        this.book.pieces = this.book.pieces.filter(p => p.id !== id);
        if (this.selectedId === id) this.selectedId = null;
        this.persist();
      }
    }
  }

  customElements.define("jg-songbook", JGSongbook);
}
