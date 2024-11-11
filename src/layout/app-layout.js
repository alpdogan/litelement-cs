import {LitElement, html} from 'lit';

class Layout extends LitElement {
 
  render() {
    return html`
      <section>
        <employee-header></employee-header>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define('employee-layout', Layout);
