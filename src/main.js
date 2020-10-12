/* eslint-disable import/extensions */
// JS
import './js/svg';
// SCSS
import './scss/main.scss';

// components
import header from './views/modules/header/header';
import mapFooter from './views/modules/footer/footer';
import search from './js/search';
import modal from './js/openModal';

// init components
header.init();
mapFooter.init();
search.init();
modal.init();
