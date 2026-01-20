export function initGuitarFretboard() {
  if (customElements.get("guitar-fretboard")) return;
  const WOOD_TEXTURE_URL = new URL("./assets/indian-rosewood.jpg", import.meta.url).href;
  class GuitarFretboard extends HTMLElement {
    static get observedAttributes() {
      return ['input-mode', 'notes', 'static'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      this._inputMode = 'chord'; // default
      this.currentNotes = [];
      this.isStatic = false;

      this.stringPositions = [50, 95, 140, 185, 230, 275];
      this.fretPositions = [
        50, 197.35, 336.4, 467.65, 591.55, 708.45,
        818.85, 923, 1021.35, 1114.15, 1201.75,
        1284.45, 1362.5, 1436.15, 1505.7, 1571.3,
        1633.25, 1691.75, 1746.9, 1799, 1848.2,
        1894.6, 1938.4
      ];
      this.notePositions = [
        50, 123.675, 266.875, 402.025, 529.6, 650,
        763.65, 870.925, 972.175, 1067.75, 1157.95,
        1243.1, 1323.475, 1399.325, 1470.925, 1538.5,
        1602.275, 1662.5, 1719.325, 1772.95, 1823.6,
        1871.4, 1916.5
      ];
      this.fretNoPositions = [
        402.025, 650, 870.925, 1067.75, 1323.475,
        1538.5, 1662.5, 1772.95
      ];
      this.lastHovered = null;
    }

    connectedCallback() {
      this.render();
      this.setupFretboard();
      if (!this.isStatic) {
        this.attachEvents();
      }
      this.drawNotes();
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'input-mode') {
        this._inputMode = newVal || 'chord';
      } else if (name === 'notes') {
        try {
          this.currentNotes = JSON.parse(newVal || '[]');
          this.drawNotes();
        } catch (e) {
          console.warn('Invalid notes attribute:', newVal);
        }
      } else if (name === 'static') {
        this.isStatic = this.hasAttribute('static');
      }
    }

    get inputMode() {
      return this._inputMode;
    }

    set inputMode(mode) {
      this._inputMode = mode;
      this.setAttribute('input-mode', mode);
    }

    getNotes() {
      return this.currentNotes;
    }

    setNotes(notes, fireEvent = false) {
      this.currentNotes = notes;
      this.drawNotes();
      if (fireEvent) this.dispatchNotesChange();
      this.setAttribute('notes', JSON.stringify(notes));
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .fretboard { display:block; width:100%; height:auto; user-select:none; }
          .note { opacity: 0; }
          .hovered { opacity: 1; }
          .note.hovered circle {
            transition: stroke 0.2s, filter 0.2s;
            stroke: #F4A261;
            stroke-width: 3;
            fill: black;
            filter: drop-shadow(0 0 4px rgba(244, 162, 97, 0.5));
            animation: pulse 1.2s ease-in-out infinite;
          }
          .active { opacity: 1; }
          .note.active circle {
            transition: stroke 0.2s, filter 0.2s;
            stroke: #61f4c0;
            stroke-width: 3;
            fill: black;
            filter: drop-shadow(0 0 4px rgba(244, 162, 97, 0.5));
          }
          @keyframes pulse {
            0% { stroke-width: 2; filter: drop-shadow(0 0 2px rgba(244, 162, 97, 0.4)); }
            50% { stroke-width: 5; filter: drop-shadow(0 0 6px rgba(244, 162, 97, 0.8)); }
            100% { stroke-width: 2; filter: drop-shadow(0 0 2px rgba(244, 162, 97, 0.4)); }
          }
        </style>
        <svg class="fretboard" viewBox="0 0 1988.4 325" width="100%">
          <defs>
            <clipPath id="path">
              <rect fill="none" width="1938.4" x="0" y="0" height="300"></rect>
            </clipPath>
            <radialGradient id="pearlGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#ddd" />
              <stop offset="100%" stop-color="#aaa" />
            </radialGradient>
          </defs>
          <g>
            <image href="${WOOD_TEXTURE_URL}" width="1888.4" x="50" y="25" clip-path="url(#path)"></image>
            <path d="M50 25 L1938.4 25" stroke="black" stroke-width="1"></path>
            <path d="M50 300 L1938.4 300" stroke="black" stroke-width="1"></path>
            <path d="M50 25 L50 300" stroke="black" stroke-width="1"></path>
            <path d="M1938.4 25 L1938.4 300" stroke="black" stroke-width="1"></path>
          </g>
        </svg>
      `;
    }

    setupFretboard() {
      const svg = this.shadowRoot.querySelector('svg');
      const g = svg.querySelector('g');
      const NS = "http://www.w3.org/2000/svg";

      // Frets
      for (const fretX of this.fretPositions) {
        const white = document.createElementNS(NS, "path");
        white.setAttribute("d", `M${fretX} 25 L${fretX} 300`);
        white.setAttribute("stroke", "white");
        white.setAttribute("stroke-width", "1");
        g.appendChild(white);

        const dark = document.createElementNS(NS, "path");
        dark.setAttribute("d", `M${fretX + 1} 25 L${fretX + 1} 300`);
        dark.setAttribute("stroke", "#555");
        dark.setAttribute("stroke-width", "1.5");
        g.appendChild(dark);
      }

      // Inlays
      const inlayY = (this.stringPositions[0] + this.stringPositions.at(-1)) / 2;
      const inlayFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21];
      const doubleDotFrets = [12, 24];
      const pearlRadius = 8;

      for (let i = 0; i < this.fretNoPositions.length; i++) {
        const x = this.fretNoPositions[i];
        const fretNum = inlayFrets[i];
        if (doubleDotFrets.includes(fretNum)) {
          for (let dy of [-90, 90]) {
            const dot = document.createElementNS(NS, "circle");
            dot.setAttribute("cx", x);
            dot.setAttribute("cy", inlayY + dy);
            dot.setAttribute("r", pearlRadius);
            dot.setAttribute("fill", "url(#pearlGradient)");
            g.appendChild(dot);
          }
        } else {
          const dot = document.createElementNS(NS, "circle");
          dot.setAttribute("cx", x);
          dot.setAttribute("cy", inlayY);
          dot.setAttribute("r", pearlRadius);
          dot.setAttribute("fill", "url(#pearlGradient)");
          g.appendChild(dot);
        }
      }

      // Strings and Notes
      for (let s = 0; s < this.stringPositions.length; s++) {
        const y = this.stringPositions[s];

        const stringWhite = document.createElementNS(NS, "path");
        stringWhite.setAttribute("d", `M50 ${y} L1938.4 ${y}`);
        stringWhite.setAttribute("stroke", "white");
        stringWhite.setAttribute("stroke-width", s + 1);
        g.appendChild(stringWhite);

        const stringDark = document.createElementNS(NS, "path");
        stringDark.setAttribute("d", `M50 ${y + 1} L1938.4 ${y + 1}`);
        stringDark.setAttribute("stroke", "black");
        stringDark.setAttribute("stroke-width", "1.5");
        g.appendChild(stringDark);

        for (let f = 0; f < this.notePositions.length; f++) {
          const x = this.notePositions[f];

          const group = document.createElementNS(NS, "g");
          group.classList.add("note");
          group.setAttribute("data-string", s + 1);
          group.setAttribute("data-fret", f);

          const circle = document.createElementNS(NS, "circle");
          circle.setAttribute("cx", x);
          circle.setAttribute("cy", y);
          circle.setAttribute("r", 16);
          circle.setAttribute("fill", "black");

          const text = document.createElementNS(NS, "text");
          text.setAttribute("x", x);
          text.setAttribute("y", y + 4);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("font-size", "10");
          text.setAttribute("fill", "white");
          text.textContent = "";

          group.appendChild(circle);
          group.appendChild(text);
          g.appendChild(group);
        }
      }
    }

    attachEvents() {
      const svg = this.shadowRoot.querySelector('svg');

      svg.addEventListener('mousedown', (event) => {
        event.preventDefault();
        const { string, fret } = this.getStringAndFretFromMouse(event);
        const exists = this.currentNotes.find(n => n.string === string && n.fret === fret);
        if (exists) {
          this.currentNotes = this.currentNotes.filter(n => !(n.string === string && n.fret === fret));
        } else {
          if (this.inputMode === 'scale') {
            this.currentNotes.push({ string, fret });
          } else {
            this.currentNotes = [...this.currentNotes.filter(n => n.string !== string), { string, fret }];
          }
        }
        this.drawNotes();
        this.setAttribute('notes', JSON.stringify(this.currentNotes));
        this.dispatchNotesChange();
      });

      svg.addEventListener('mouseover', (event) => {
        const { string, fret } = this.getStringAndFretFromMouse(event);
        const note = this.shadowRoot.querySelector(`[data-string="${string}"][data-fret="${fret}"]`);
        if (!note || note === this.lastHovered) return;
        if (this.lastHovered) this.lastHovered.classList.remove('hovered');
        note.classList.add('hovered');
        this.lastHovered = note;
      });

      svg.addEventListener('mouseleave', () => {
        if (this.lastHovered) {
          this.lastHovered.classList.remove('hovered');
          this.lastHovered = null;
        }
      });
    }

    getStringAndFretFromMouse(event) {
      const svg = this.shadowRoot.querySelector('svg');
      const rect = svg.getBoundingClientRect();
      const x = (event.clientX - rect.left) * (1988.4 / rect.width);
      const y = (event.clientY - rect.top) * (325 / rect.height);

      const fret = this.fretPositions.findIndex(pos => x < pos) || 0;

      let minDistance = Infinity;
      let string = 1;
      this.stringPositions.forEach((pos, index) => {
        const dist = Math.abs(pos - y);
        if (dist < minDistance) {
          minDistance = dist;
          string = index + 1;
        }
      });

      return { string, fret };
    }

    drawNotes() {
      this.shadowRoot.querySelectorAll('.note.active').forEach(n => n.classList.remove('active'));
      this.currentNotes.forEach(({ string, fret }) => {
        const note = this.shadowRoot.querySelector(`[data-string="${string}"][data-fret="${fret}"]`);
        if (note) note.classList.add('active');
      });
    }

    dispatchNotesChange() {
      this.dispatchEvent(new CustomEvent('noteschange', {
        detail: {
          notes: this.currentNotes,
          inputMode: this.inputMode
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  customElements.define('guitar-fretboard', GuitarFretboard); 
}
