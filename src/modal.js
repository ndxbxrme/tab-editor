export function initModal() {
  if (customElements.get("jg-modal")) return;

  class JGModal extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._resolver = null;
      this._opts = null;
      this._open = false;
      this._activeTab = null;
      this._values = {};
    }

    connectedCallback() {
      this.render();
    }

    open(opts = {}) {
      this._opts = opts;
      this._open = true;
      this._values = {};
      const tabs = Array.isArray(opts.tabs) ? opts.tabs : null;
      const requestedTab = opts.activeTab;
      if (requestedTab && tabs && tabs.some(t => t.id === requestedTab)) {
        this._activeTab = requestedTab;
      } else {
        this._activeTab = tabs && tabs.length ? tabs[0].id : null;
      }
      this.render();
      return new Promise((resolve) => {
        this._resolver = resolve;
      });
    }

    close(result) {
      this._open = false;
      this.render();
      if (this._resolver) {
        this._resolver(result);
        this._resolver = null;
      }
    }

    render() {
      const opts = this._opts || {};
      const title = opts.title || "";
      const body = opts.body || "";
      const fields = Array.isArray(opts.fields) ? opts.fields : [];
      const tabs = Array.isArray(opts.tabs) ? opts.tabs : null;
      const tabDefs = tabs ? tabs : [{ id: "default", fields }];
      const layout = opts.layout || "stack";
      const columns = Number.isFinite(opts.columns) ? Math.max(1, opts.columns) : 1;
      const actions = Array.isArray(opts.actions) && opts.actions.length
        ? opts.actions
        : [
            { id: "cancel", label: "Cancel", kind: "secondary" },
            { id: "confirm", label: "Confirm", kind: "primary" }
          ];

      const activeTab = tabs && tabs.length ? (this._activeTab || tabs[0].id) : null;
      this.primeValues(tabDefs);

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            inset: 0;
            display: ${this._open ? "block" : "none"};
            z-index: 1000;
            font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          }
          .backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.35);
          }
          .dialog {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 12px;
            border: 1px solid rgba(0,0,0,.12);
            box-shadow: 0 20px 40px rgba(0,0,0,.2);
            padding: 16px;
            min-width: 320px;
            max-width: 90vw;
          }
          h3 { margin: 0 0 8px; font-size: 16px; }
          .body { font-size: 12px; opacity: .8; margin-bottom: 10px; }
          .fields { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
          .fields.grid { display: grid; gap: 10px; grid-template-columns: repeat(${columns}, minmax(0, 1fr)); }
          .tabs { display: flex; gap: 6px; margin-bottom: 10px; }
          .tab {
            font: inherit;
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 8px;
            border: 1px solid rgba(0,0,0,.14);
            background: #fff;
            cursor: pointer;
          }
          .tab.active { background: rgba(0,188,212,.12); border-color: rgba(0,188,212,.6); }
          .field { display: flex; flex-direction: column; gap: 4px; }
          .label { font-size: 11px; opacity: .7; }
          input, textarea, select {
            font: inherit;
            font-size: 12px;
            padding: 6px 8px;
            border-radius: 8px;
            border: 1px solid rgba(0,0,0,.14);
          }
          textarea { min-height: 60px; resize: vertical; }
          .actions { display: flex; gap: 8px; justify-content: flex-end; }
          .btn {
            font: inherit;
            font-size: 12px;
            padding: 6px 10px;
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,.14);
            background: #fff;
            cursor: pointer;
          }
          .btn.primary { background: rgba(0,188,212,.12); border-color: rgba(0,188,212,.6); }
        </style>
        <div class="backdrop" data-action="cancel"></div>
        <div class="dialog" role="dialog" aria-modal="true">
          ${title ? `<h3>${title}</h3>` : ""}
          ${body ? `<div class="body">${body}</div>` : ""}
          ${tabs ? `
            <div class="tabs">
              ${tabs.map(t => `
                <button class="tab ${t.id === activeTab ? "active" : ""}" data-action="tab" data-tab="${t.id}">
                  ${t.label}
                </button>
              `).join("")}
            </div>
          ` : ""}
          <div class="fields ${layout === "grid" ? "grid" : ""}">
            ${tabDefs.flatMap(tab => {
              const tabFields = tab.fields || [];
              return tabFields.map(f => {
                const value = this._values[f.name] ?? f.value ?? "";
                const whenField = f.showWhen?.field || "";
                const whenValue = f.showWhen?.value ?? "";
                const span = Number.isFinite(f.span) ? Math.max(1, f.span) : 1;
                const spanStyle = layout === "grid" ? `grid-column: span ${span};` : "";
                return `
                  <label class="field" data-tab="${tab.id}" data-when-field="${whenField}" data-when-value="${whenValue}" style="${spanStyle}">
                    ${f.label ? `<span class="label">${f.label}</span>` : ""}
                ${f.type === "textarea"
                  ? `<textarea data-field="${f.name}" placeholder="${f.placeholder || ""}">${value}</textarea>`
                  : f.type === "select"
                    ? `<select data-field="${f.name}">
                        ${(f.options || []).map(opt => `
                          <option value="${opt.value}" ${String(value) === String(opt.value) ? "selected" : ""}>
                            ${opt.label}
                          </option>
                        `).join("")}
                      </select>`
                    : f.type === "checkbox"
                      ? `<input data-field="${f.name}" type="checkbox" ${value ? "checked" : ""} />`
                      : `<input data-field="${f.name}" type="${f.type || "text"}" placeholder="${f.placeholder || ""}" value="${value}" />`}
              </label>
            `;
          });
        }).join("")}
          </div>
          <div class="actions">
            ${actions.map(a => {
              const hide = a.onlyTab && a.onlyTab !== activeTab;
              if (hide) return "";
              return `
                <button class="btn ${a.kind === "primary" ? "primary" : ""}" data-action="${a.id}">
                  ${a.label}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;

      this.shadowRoot.querySelectorAll("[data-action]").forEach(btn => {
        btn.addEventListener("click", (e) => this.onAction(e));
      });

      this.shadowRoot.querySelectorAll("[data-field]").forEach(input => {
        const eventName = (input.tagName === "SELECT" || input.type === "checkbox") ? "change" : "input";
        input.addEventListener(eventName, (e) => {
          const key = e.target.dataset.field;
          this._values[key] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
          this.applyFieldVisibility();
        });
      });

      this.applyFieldVisibility();
    }

    primeValues(tabDefs) {
      tabDefs.forEach(tab => {
        (tab.fields || []).forEach(f => {
          if (this._values[f.name] !== undefined) return;
          if (f.type === "checkbox") {
            this._values[f.name] = !!f.value;
            return;
          }
          if (f.type === "select") {
            if (f.value !== undefined) {
              this._values[f.name] = f.value;
              return;
            }
            const first = (f.options || [])[0];
            this._values[f.name] = first ? first.value : "";
            return;
          }
          this._values[f.name] = f.value ?? "";
        });
      });
    }

    applyFieldVisibility() {
      const opts = this._opts || {};
      const tabs = Array.isArray(opts.tabs) ? opts.tabs : null;
      const activeTab = tabs && tabs.length ? (this._activeTab || tabs[0].id) : null;

      this.shadowRoot.querySelectorAll(".field").forEach(field => {
        let visible = true;
        if (tabs && activeTab && field.dataset.tab !== activeTab) visible = false;
        const whenField = field.dataset.whenField;
        if (visible && whenField) {
          const expected = String(field.dataset.whenValue || "");
          const actual = String(this._values[whenField] ?? "");
          if (actual !== expected) visible = false;
        }
        field.style.display = visible ? "" : "none";
      });
    }

    onAction(e) {
      const action = e.target.dataset.action;
      if (!action) return;
      if (action === "tab") {
        const tabId = e.target.dataset.tab;
        if (tabId && tabId !== this._activeTab) {
          this._activeTab = tabId;
          this.render();
        }
        return;
      }
      if (action === "cancel") {
        this.close({ action: "cancel", values: {} });
        return;
      }

      const values = {};
      this.shadowRoot.querySelectorAll("[data-field]").forEach(el => {
        values[el.dataset.field] = el.type === "checkbox" ? el.checked : el.value;
      });
      this.close({ action, values, activeTab: this._activeTab });
    }
  }

  customElements.define("jg-modal", JGModal);
}

let modalSingleton = null;

export function showModal(opts) {
  if (!modalSingleton) {
    modalSingleton = document.createElement("jg-modal");
    document.body.appendChild(modalSingleton);
  }
  return modalSingleton.open(opts);
}
