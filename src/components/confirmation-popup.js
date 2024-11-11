import { LitElement, html, css } from 'lit';
import { getTranslation } from '../i18n/index.js';
import { Constants } from '../styles/_constants.js';
import store from '../store/index.js';

export class ConfirmationPopup extends LitElement {
  static properties = {
    message: { type: String },
    confirmText: { type: String },
    cancelText: { type: String },
    translations: { type: Object },
  };

  constructor() {
    super();
    this.message = '';
    this.confirmText = 'Confirm';
    this.cancelText = 'Cancel';
    this.translations = store.getState().translations;
  }

  confirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    this.close();
  }

  close() {
    this.remove();
  }

  render() {
    return html`
      <div class="popup-overlay" @click="${this.close}">
        <div class="popup-content" @click="${(e) => e.stopPropagation()}">
          <div class="popup-header">
            <span>${getTranslation(this.translations, 'confirmation')}</span>
            <span class="close-icon" @click="${this.close}">&times;</span>
          </div>
          <p>${this.message}</p>
          <div class="popup-custom-buttons">
            <button class="proceed-button" @click="${this.confirm}">
              ${this.confirmText || getTranslation(this.translations, 'confirm')}
            </button>
            <button class="cancel-button" @click="${this.close}">
              ${this.cancelText || getTranslation(this.translations, 'cancel')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    Constants,
    css`
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .popup-content {
        background: white;
        padding: 1rem;
        border-radius: 0.25rem;
        width: 24rem;
        text-align: center;
      }

      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .popup-header span {
        color: #ff6f15;
        font-weight: bold;
      }

      .close-icon {
        cursor: pointer;
        font-size: 2em;
      }

      .popup-custom-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.5rem; /* Adds spacing between the buttons */
        width: 100%;
      }

      .popup-custom-buttons button {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        box-sizing: border-box;
      }

      /* Proceed button styles */
      .proceed-button {
        background-color: #ff6200; /* Orange background */
        color: white; /* White text */
        border: none;
      }

      /* Cancel button styles */
      .cancel-button {
        background-color: white; /* White background */
        color: #000; /* Black text */
        border: 1px solid gray; /* Gray border */
      }

      /* Responsive styles using media queries */
      @media (max-width: 768px) {
        .popup-content {
          width: 90%;
          padding: 1rem;
        }
      }
    `,
  ];
}

customElements.define('confirmation-popup', ConfirmationPopup);
