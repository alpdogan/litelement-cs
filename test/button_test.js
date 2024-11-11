import {Button} from '../src/components/button.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('custom-button', () => {
  test('is defined', () => {
    const el = document.createElement('custom-button');
    assert.instanceOf(el, Button);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<custom-button>Hello</custom-button>`);
    assert.shadowDom.equal(
      el,
      `<button class="primary" type="button"><slot></slot></button>`
    );
  });
});