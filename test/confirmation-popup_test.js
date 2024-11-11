import {ConfirmationPopup} from '../src/components/confirmation-popup.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';


suite('confirmation-popup', () => {
  test('is defined', () => {
    const el = document.createElement('confirmation-popup');
    assert.instanceOf(el, ConfirmationPopup);
  });

});