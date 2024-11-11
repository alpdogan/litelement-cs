import {LitElement, html, css} from 'lit';

export class ViewToggle extends LitElement {
  static properties = {
    viewMode: {type: String},
  };

  constructor() {
    super();
    this.viewMode = 'list';
  }

  render() {
    return html`
      <button class="view-button ${this.viewMode === "list" ? "active" : ""}" @click="${this._switchToList}">
        <icon-list></icon-list>
      </button>
      <button class="view-button ${this.viewMode === "table" ? "active" : ""}" @click="${this._switchToTable}">
        <icon-table></icon-table>
      </button>
    `;
  }

  _switchToList() {
    if (this.viewMode !== 'list') {
      this.viewMode = 'list';
      this._emitViewModeChange();
    }
  }

  _switchToTable() {
    if (this.viewMode !== 'table') {
      this.viewMode = 'table';
      this._emitViewModeChange();
    }
  }

  _emitViewModeChange() {
    this.dispatchEvent(
      new CustomEvent('view-mode-change', {
        detail: {viewMode: this.viewMode},
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .view-button {
      background: transparent;
      border: 0px;
      cursor: pointer;
    }
    .view-button.active {
      // border: 1px solid #c9c9c9;
    }
  `;
}

customElements.define('view-toggle', ViewToggle);
