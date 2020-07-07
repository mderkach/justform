/* eslint-disable import/extensions */
// JS
// eslint-disable-next-line import/no-unresolved
import './js/*';
import mapFooter from './views/modules/footer/footer';
// SCSS
import './scss/main.scss';

// CSS (example)
// import './assets/css/main.css'

// components
import filter from './views/components/filter/filter';
import header from './views/modules/header/header';
import sliderBanner from './views/components/slider/sliderBanner';
import itemLink from './views/components/item/itemLink';

filter.init();
header.init();
sliderBanner.init();
mapFooter.init();
itemLink.init();
