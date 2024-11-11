import { LitElement, html, css } from 'lit';
import { Constants } from '../styles/_constants.js';
import { getTranslation } from '../i18n/index.js';

export class Pagination extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    translations: { type: Object },
  };

  render() {
    return html`
      <div class="pagination">
        <custom-button
          variant="link"
          @click="${this._prevPage}"
          ?disabled="${this.currentPage === 1}"
        >
          <icon-leftarrow color="${this.currentPage === 1 ? "gray" : "orange"}" size="20px"></icon-leftarrow>
        </custom-button>

        ${this._renderPageNumbers()}

        <custom-button
          variant="link"
          @click="${this._nextPage}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          <icon-rightarrow color="${this.currentPage === this.totalPages ? "gray" : "orange"}" ></icon-rightarrow>
        </custom-button>
      </div>
    `;
  }

  _renderPageNumbers() {
    const pageNumbers = [];
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(html`
        <button
          class="page-number ${i === this.currentPage ? 'active' : ''}"
          @click="${() => this._emitPageChange(i)}"
        >
          ${i}
        </button>
      `);
    }
    return pageNumbers;
  }

  _goToFirstPage() {
    this._emitPageChange(1);
  }

  _prevPage() {
    this._emitPageChange(this.currentPage - 1);
  }

  _nextPage() {
    this._emitPageChange(this.currentPage + 1);
  }

  _goToLastPage() {
    this._emitPageChange(this.totalPages);
  }

  _emitPageChange(page) {
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: { page },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    Constants,
    css`
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        gap: 0.5rem;
      }

      .page-number {
        background: var(--c-white, #fff);
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 32px;
        width: 32px;
        height: 32px
      }

      .page-number.active {
        background: var(--c-orange-700, #ff6200);
        color: white;
        font-weight: bold;
      }

      .page-number:hover:not(.active) {
        background: var(--c-gray-light, #f0f0f0);
      }
    `,
  ];
}

customElements.define('pagination-element', Pagination);
