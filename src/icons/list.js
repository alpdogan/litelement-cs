import { html, LitElement, css } from 'lit';
import { IconSVG } from '../styles/_icon-svg';

class IconList extends LitElement {
  static properties = {
    color: { type: String },
    size: { type: String },
  };

  static styles = [
    IconSVG,
    css`
      svg {
        width: var(--icon-size, 24px);
        height: var(--icon-size, 24px);
        stroke: var(--icon-color, currentColor);
      }
    `,
  ];

  updated() {
    this.style.setProperty('--icon-size', this.size || '24px');
    this.style.setProperty('--icon-color', this.color || 'currentColor');
  }

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <line x1="40" y1="128" x2="216" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="64" x2="216" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        <line x1="40" y1="192" x2="216" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
      </svg>
      <slot name="text" class="icon-text"></slot>
    `;
  }
}

customElements.define('icon-list', IconList);
