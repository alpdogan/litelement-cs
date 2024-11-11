import {getInitialLang, changeLanguage} from './i18n/index.js';
import {initRouter} from './router/index.js';

// Layouts
import './layout/app-layout';

import './components/button.js';

// Molecules
import './components/confirmation-popup.js';
import './components/search-bar.js';
import './components/view-toggle.js';
import './components/employee-table.js';
import './components/employee-grid.js';
import './components/pagination.js';

// organisms
import './components/header.js';

// Icons
import './icons/plus.js';
import './icons/tr-flag.js';
import './icons/us-flag.js';
import './icons/employees.js';
import './icons/table.js';
import './icons/list.js';
import './icons/trash.js';
import './icons/edit.js';
import './icons/rightarrow.js'
import './icons/leftarrow.js'

// Views - Pages
import './pages/employee-list.js';
import './pages/employee-form.js';

// Set the initial language for the app
changeLanguage(getInitialLang());

// Initialize the router
const app = document.querySelector('#app');

initRouter(app);
