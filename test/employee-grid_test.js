import { EmployeeGrid } from '../src/components/employee-grid.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('employee-grid', () => {
  test('is defined', () => {
    const el = document.createElement('employee-grid');
    assert.instanceOf(el, EmployeeGrid);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<employee-grid></employee-grid>`);
    assert.shadowDom.equal(
      el,
      `<div class="employee-container grid-view"><div class="no-results">No results found</div></div>`
    );
  });


  test('renders employees in grid view', async () => {
    const employees = [
      {
        id: '1',
        firstName: 'Alice',
        lastName: 'Smith',
        position: 'Developer',
        department: 'Engineering',
        phone: '123-456-7890',
        email: 'alice.smith@example.com'
      },
      {
        id: '2',
        firstName: 'Bob',
        lastName: 'Brown',
        position: 'Designer',
        department: 'Design',
        phone: '987-654-3210',
        email: 'bob.brown@example.com'
      }
    ];
    const el = await fixture(html`<employee-grid .employees=${employees}></employee-grid>`);
    const cards = el.shadowRoot.querySelectorAll('.employee-card');
    assert.equal(cards.length, employees.length, 'renders correct number of employee cards');
    assert.include(cards[0].textContent, 'Alice Smith', 'renders first employee name');
    assert.include(cards[1].textContent, 'Bob Brown', 'renders second employee name');
  });
});
