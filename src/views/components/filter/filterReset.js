import filter from './filter';

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
