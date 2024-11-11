import { LitElement, html, css } from 'lit';
import { getTranslation, getInitialLang, changeLanguage } from '../i18n/index.js';
import { Router } from '@vaadin/router';

export class EmployeeHeader extends LitElement {
  static properties = {
    lang: { type: String },
  };

  constructor() {
    super();
    this.lang = getInitialLang();
    this.translations = this.loadTranslations(this.lang);
  }

  loadTranslations(lang) {
    return {
      employeeList: lang === 'en' ? 'Employees' : 'Çalışanlar',
      addEmployee: lang === 'en' ? 'Add new' : 'Yeni Ekle',
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('lang')) {
      this.translations = this.loadTranslations(this.lang);
      this.requestUpdate(); // Trigger a re-render
    }
  }

  changeLanguage(lang) {
    changeLanguage(lang);
    this.lang = lang; // This triggers `updated()`
  }

  render() {
    return html`
      <header class="header">
        <div class="logo">
          <custom-button variant="link" @click="${() => Router.go('/')}">
            <img src="logo.webp" width="24px"/>
          </custom-button>
          <span>ING</span>
        </div>

        <nav class="nav-bar">
          <custom-button variant="link" @click="${() => Router.go('/employees')}">
            <icon-employees size="24px">
              <span slot="text">${getTranslation(this.translations, 'employeeList')}</span>
            </icon-employees>
          </custom-button>

          <custom-button variant="link" @click="${() => Router.go('/add')}">
            <icon-plus size="24px">
              <span slot="text">${getTranslation(this.translations, 'addEmployee')}</span>
            </icon-plus>
          </custom-button>

          ${this.lang === 'en'
            ? html`
                <custom-button variant="link" @click="${() => this.changeLanguage('tr')}">
                  <icon-tr-flag size="24px"></icon-tr-flag>
                </custom-button>
              `
            : html`
                <custom-button variant="link" @click="${() => this.changeLanguage('en')}">
                  <icon-us-flag size="24px"></icon-us-flag>
                </custom-button>
              `}
        </nav>
      </header>
    `;
  }

  static styles = css`
    header {
      background-color: var(--c-white-100, #ffffff);
      padding: 1rem 1.5rem;
      margin: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 60px;
      font-size: .8rem;
    }

    .nav-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Responsive styles using media queries */
    @media (max-width: 768px) {
      header {
        margin: 0 1rem;
      }
    }

    @media (max-width: 480px) {
      header {
        flex-direction: column;
        align-items: flex-start;
        margin: 0;
        gap: 1rem;
      }

      .nav-bar {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `;
}

customElements.define('employee-header', EmployeeHeader);
