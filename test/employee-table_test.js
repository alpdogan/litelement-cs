// test/employee-table_test.js

import {EmployeeTable} from '../src/components/employee-table.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-table', () => {
  test('is defined', () => {
    const el = document.createElement('employee-table');
    assert.instanceOf(el, EmployeeTable);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    assert.shadowDom.equal(
      el,
      `
      <table class="employee-table table">
        <thead>
          <tr>
            <th><input type="checkbox" name="checkbox" /></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th class="w-alignment">Date of Employment</th>
            <th class="w-alignment">Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="no-results">No results found</div>
      `
    );
  });

  test('renders employee data correctly', async () => {
    const employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2022',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      }
    ];
    const el = await fixture(html`<employee-table .employees=${employees}></employee-table>`);
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    assert.equal(rows.length, employees.length, 'renders correct number of rows');
    assert.include(rows[0].textContent, 'John', 'renders employee first name');
    assert.include(rows[0].textContent, 'Doe', 'renders employee last name');
    assert.include(rows[0].textContent, '01/01/2022', 'renders employee date of employment');
  });

  test('dispatches edit event on edit button click', async () => {
    const employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2022',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      }
    ];
    const el = await fixture(html`<employee-table .employees=${employees}></employee-table>`);
    const editButton = el.shadowRoot.querySelector('.actions custom-button');
    setTimeout(() => editButton.click());
    const event = await oneEvent(el, 'edit-employee');
    assert.equal(event.detail.id, employees[0].id, 'edit event fired with correct id');
  });

  test('dispatches delete event on delete button click', async () => {
    const employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2022',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      }
    ];
    const el = await fixture(html`<employee-table .employees=${employees}></employee-table>`);
    const deleteButton = el.shadowRoot.querySelectorAll('.actions custom-button')[1];
    setTimeout(() => deleteButton.click());
    const event = await oneEvent(el, 'delete-employee');
    assert.deepEqual(event.detail.employee, employees[0], 'delete event fired with correct employee data');
  });

});