import { html, LitElement, css } from 'lit';
import { IconSVG } from '../styles/_icon-svg';

class IconRightArrow extends LitElement {
  static properties = {
    color: { type: String },
    size: { type: String },
  };

  static styles = [IconSVG];

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
        <polygon fill="${this.color}" points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256" />
      </svg>
      <slot name="text" class="icon-text"></slot>
    `;
  }
}

customElements.define('icon-rightarrow', IconRightArrow);
