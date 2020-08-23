import filter from './filter';
import './filterReset.scss';

const filterReset = {
  button: document.querySelector('.filter-reset'),
  init: () => {
    if (filterReset.button) {
      filterReset.button.addEventListener('click', () => {
        filter.refresh();
        filter.createSelect();
      });
    }
  },
};

export default filterReset;
