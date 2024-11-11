import {Pagination} from '../src/components/pagination.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('pagination-element', () => {
  test('is defined', () => {
    const el = document.createElement('pagination-element');
    assert.instanceOf(el, Pagination);
  });


  test('renders correct page numbers based on currentPage and totalPages', async () => {
    const el = await fixture(
      html`<pagination-element currentPage="3" totalPages="5"></pagination-element>`
    );
    const pageNumbers = el.shadowRoot.querySelectorAll('.page-number');
    assert.equal(pageNumbers.length, 5, 'renders correct number of page buttons');
    assert.include(pageNumbers[0].textContent, '1', 'renders page number 1');
    assert.include(pageNumbers[4].textContent, '5', 'renders page number 5');
  });

  test('disables previous button on first page and next button on last page', async () => {
    const firstPageEl = await fixture(
      html`<pagination-element currentPage="1" totalPages="5"></pagination-element>`
    );
    const prevButton = firstPageEl.shadowRoot.querySelector('custom-button[variant="link"]');
    assert.isTrue(prevButton.hasAttribute('disabled'), 'previous button is disabled on first page');

    const lastPageEl = await fixture(
      html`<pagination-element currentPage="5" totalPages="5"></pagination-element>`
    );
    const nextButton = lastPageEl.shadowRoot.querySelectorAll('custom-button[variant="link"]')[1];
    assert.isTrue(nextButton.hasAttribute('disabled'), 'next button is disabled on last page');
  });


  test('dispatches page-change event on next and previous button clicks', async () => {
    const el = await fixture(
      html`<pagination-element currentPage="2" totalPages="5"></pagination-element>`
    );

    // Test next button
    const nextButton = el.shadowRoot.querySelectorAll('custom-button[variant="link"]')[1];
    setTimeout(() => nextButton.click());
    let event = await oneEvent(el, 'page-change');
    assert.equal(event.detail.page, 3, 'next button click dispatches page-change event with correct page');

    // Test previous button
    const prevButton = el.shadowRoot.querySelector('custom-button[variant="link"]');
    setTimeout(() => prevButton.click());
    event = await oneEvent(el, 'page-change');
    assert.equal(event.detail.page, 1, 'previous button click dispatches page-change event with correct page');
  });
});