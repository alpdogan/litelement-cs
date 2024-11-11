import {ViewToggle} from '../src/components/view-toggle.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('view-toggle', () => {
  test('is defined', () => {
    const el = document.createElement('view-toggle');
    assert.instanceOf(el, ViewToggle);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<view-toggle></view-toggle>`);
    assert.shadowDom.equal(
      el,
      `<button class="view-button active"><icon-list></icon-list></button><button class="view-button"><icon-table></icon-table></button>`
    );
  });
});