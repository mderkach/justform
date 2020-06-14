/* eslint-disable import/extensions */
// JS
// eslint-disable-next-line import/no-unresolved
import './js/*';

// SCSS
import './scss/main.scss';

// CSS (example)
// import './assets/css/main.css'

// components
import filter from './views/components/filter/filter';
import header from './views/modules/header/header';

filter.init();
header.init();
