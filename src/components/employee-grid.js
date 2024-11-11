import { LitElement, html, css } from 'lit';
import { getTranslation } from '../i18n/index.js';

export class EmployeeGrid extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    translations: { type: Object },
  };

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'grid';
    this.translations = {
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      position: 'Position',
      actions: 'Actions',
      noResults: 'No results found',
    };
  }

  render() {
    return html`
      <div class="employee-container ${this.viewMode === 'grid' ? 'grid-view' : ''}">
        ${this.employees.length > 0
          ? html`
              ${this.employees.map((employee) => this.renderEmployeeCard(employee))}
            `
          : html`
              <div class="no-results">
                ${getTranslation(this.translations, 'noResults')}
              </div>
            `}
      </div>
    `;
  }

  renderEmployeeCard(employee) {
    return html`
      <div class="employee-card">
        <div class="employee-info">
          <strong>${employee.firstName} ${employee.lastName}</strong>
          <div>${getTranslation(this.translations, 'position')}: ${employee.position}</div>
          <div>${getTranslation(this.translations, 'department')}: ${employee.department}</div>
          <div>${getTranslation(this.translations, 'phone')}: ${employee.phone}</div>
          <div>${getTranslation(this.translations, 'email')}: ${employee.email}</div>
        </div>
        <div class="actions">
          <custom-button variant="link" @click="${() => this._editEmployee(employee.id)}">
            <icon-edit size="20px"></icon-edit>
          </custom-button>
          <custom-button variant="link" @click="${() => this._deleteEmployee(employee)}">
            <icon-trash size="20px"></icon-trash>
          </custom-button>
        </div>
      </div>
    `;
  }

  _editEmployee(id) {
    this.dispatchEvent(
      new CustomEvent('edit-employee', {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  _deleteEmployee(employee) {
    this.dispatchEvent(
      new CustomEvent('delete-employee', {
        detail: { employee },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .employee-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .employee-container.grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      padding: 1rem;
      background: var(--c-white-100, #ffffff);
    }

    .employee-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--c-white-500, #dddddd);
      padding: 1rem;
      border-radius: 0.5rem;
      background: var(--c-white, #ffffff);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
      min-width: 200px;
      width: 200px;
      margin: 10px;
    }

    .employee-card:hover {
      transform: scale(1.02);
    }

    .employee-info {
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: var(--c-gray-500);
    }

    .employee-info strong {
      display: block;
      font-size: 1.1rem;
      color: var(--c-gray-200, #151921);
      margin-bottom: 0.5rem;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .actions custom-button {
      color: #ff7a00;
    }

    .actions custom-button:hover {
      color: #e74c3c;
    }

    .no-results {
      background: white;
      padding: 1rem;
      text-align: center;
      font-size: 1rem;
      color: var(--c-gray-500);
    }
  `;
}

customElements.define('employee-grid', EmployeeGrid);
