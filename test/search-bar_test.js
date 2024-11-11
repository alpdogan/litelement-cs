import {SearchBar} from '../src/components/search-bar.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('search-bar', () => {
  test('is defined', () => {
    const el = document.createElement('search-bar');
    assert.instanceOf(el, SearchBar);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<search-bar></search-bar>`);
    assert.shadowDom.equal(
      el,
      `<input type="text" class="search-input" name="search-input" placeholder="" />`
    );
  });
});