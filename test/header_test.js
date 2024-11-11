import {EmployeeHeader} from '../src/components/header.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {Router} from '@vaadin/router';

suite('employee-header', () => {
  test('is defined', () => {
    const el = document.createElement('employee-header');
    assert.instanceOf(el, EmployeeHeader);
  });



  test('renders with default language (English)', async () => {
    const el = await fixture(html`<employee-header></employee-header>`);
    const employeeListText = el.shadowRoot.querySelector('span[slot="text"]').textContent;
    assert.include(employeeListText, 'Employees', 'renders with default English translation');
  });

  
});