import { html, LitElement, css } from 'lit';

class IconLeftArrow extends LitElement {
  static properties = {
    color: { type: String },
    size: { type: String },
  };

  static styles = css`
    svg {
      width: var(--icon-size, 24px);
      height: var(--icon-size, 24px);
      fill: var(--icon-color, currentColor);
    }
  `;

  updated() {
    this.style.setProperty('--icon-size', this.size || '24px');
    this.style.setProperty('--icon-color', this.color || 'currentColor');
  }

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path fill="currentColor" d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z"/>
      </svg>
    `;
  }
}

customElements.define('icon-leftarrow', IconLeftArrow);
