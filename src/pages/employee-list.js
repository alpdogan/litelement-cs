import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import {deleteEmployee} from '../store/employee-slice.js';
import {getTranslation} from '../i18n/index.js';
import {Constants} from '../styles/_constants.js';
import store from '../store/index.js';

class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    searchQuery: {type: String},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    viewMode: {type: String},
    translations: {type: Object},
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 16;
    this.viewMode = 'list';
    this.employees = store.getState().employees;
    this.translations = store.getState().translations;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this.employees = store.getState().employees;
      this.translations = store.getState().translations;
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
    super.disconnectedCallback();
  }

  updated() {
    // Clear all classes from :host
    this.className = '';

    // Add route class if defined
    if (this.routeClass) {
      this.classList.add(this.routeClass);
    }

  }

  render() {
    return html`
      <main class="main-section">
        <section class="container">
          <div class="top-bar">
            <h2 class="view-title">
              ${getTranslation(this.translations, 'employeeList')}
            </h2>

            <view-toggle
              .viewMode="${this.viewMode}"
              @view-mode-change="${this._onViewModeChange}"
            ></view-toggle>
          </div>

          <div class="search-bar">
            <search-bar
              placeholder="${getTranslation(
                this.translations,
                'searchEmployees'
              )}"
              .value="${this.searchQuery}"
              @search-query-change="${this._updateSearchQuery}"
            ></search-bar>
          </div>
          
          ${this.viewMode === "list" ? 
             html`
             <div class="list-container">
                <employee-table
                  .employees="${this.getPaginatedEmployees()}"
                  .viewMode="${this.viewMode}"
                  .translations="${this.translations}"
                  @edit-employee="${this._onEditEmployee}"
                  @delete-employee="${this._onDeleteEmployee}"
                ></employee-table>
              </div>
            `: html`
              <div>
            <employee-grid
              .employees="${this.getPaginatedEmployees()}"
              .viewMode="${this.viewMode}"
              .translations="${this.translations}"
              @edit-employee="${this._onEditEmployee}"
              @delete-employee="${this._onDeleteEmployee}"
            ></employee-table>
          </div>
            `}
          
          
          ${this.getTotalPages() > 1
            ? html`
                <pagination-element
                  .translations="${this.translations}"
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.getTotalPages()}"
                  @page-change="${this._onPageChange}"
                ></pagination-element>
              `
            : ''}
        </section>
      </main>
    `;
  }

  _onViewModeChange(event) {
    this.viewMode = event.detail.viewMode;
    this.itemsPerPage = this.viewMode === 'table' ? 15 : 16;
    this.currentPage = 1;
  }

  _updateSearchQuery(event) {
    this.searchQuery = event.detail.query;
    this.currentPage = 1;
  }

  _onEditEmployee(event) {
    const id = event.detail.id;
    Router.go(`/edit/${id}`);
  }

  _onDeleteEmployee(event) {
    const employee = event.detail.employee;
    this.confirmDelete(employee);
  }

  _onPageChange(event) {
    const newPage = event.detail.page;
    this.currentPage = newPage;
  }

  confirmDelete(employee) {
    const popup = document.createElement('confirmation-popup');
    const _employee = `${employee.firstName} ${employee.lastName}`;
    popup.message = getTranslation(this.translations, 'confirmDelete').replace(
      '{{name}}',
      _employee
    );

    popup.confirmText = getTranslation(this.translations, 'confirm');
    popup.cancelText = getTranslation(this.translations, 'cancel');

    // Listen for the 'confirm' event
    popup.addEventListener('confirm', () => {
      store.dispatch(deleteEmployee(employee.id));
      this.employees = store.getState().employees;
    });

    document.body.appendChild(popup);
  }

  getPaginatedEmployees() {
    const filteredEmployees = this.employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return filteredEmployees.slice(start, end);
  }

  getTotalPages() {
    const filteredEmployees = this.employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    return Math.ceil(filteredEmployees.length / this.itemsPerPage);
  }

  static styles = [
    Constants,
    css`
      :host {
        display: block;
        margin: 0 1rem;
        padding: 1rem;
      }

      .container {
        padding-top: 1rem;
      }

      .top-bar {
        display: flex;
        gap: 0.625rem;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: space-between;
      }

      .view-title {
        margin: 0;
        color: var(--c-orange-700, #ff6200);
      }

      .search-bar {
        margin-bottom: 1rem;
      }

      .list-container {
        overflow-y: auto;
      }

      main {
        width: 100%;
        box-sizing: border-box;
        background: var(--c-white-400, #f8f8f8);
        padding: 0 2rem;
      }

      /* Responsive styles with media queries */
      @media (max-width: 1024px) {
        main {
          padding: 0 1rem;
        }
      }

      @media (max-width: 768px) {
        main {
          padding: 0;
        }
      }

      @media (max-width: 600px) {
        .top-bar {
          flex-direction: column;
        }

        .search-bar {
          display: flex;
          justify-content: center;
        }
      }
    `,
  ];
}

customElements.define('employee-list', EmployeeList);
