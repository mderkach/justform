import './filterSearch.scss';

const filterSearch = {
  wrapper: document.querySelectorAll('.filter-search-wrapper'),
  onInput(wrapper) {
    const input = wrapper.querySelector('input');

    input.addEventListener('keyup', (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      if (input.value.length >= 3) {
        setTimeout(alert(`Идет поиск по запросу: ${input.value}.`), 750);
      }
    });
  },
  openFilter: (elm) => {
    const header = elm.querySelector('.filter-search-header');

    header.addEventListener('click', (e) => {
      e.preventDefault();

      if (elm.classList.contains('is-active')) {
        elm.classList.remove('is-active');
      } else {
        elm.classList.add('is-active');
      }
    });
  },
  init: () => {
    if (filterSearch.wrapper.length > 0) {
      filterSearch.wrapper.forEach((wrapper) => {
        filterSearch.openFilter(wrapper);
        filterSearch.onInput(wrapper);
      });
    }
  },
};

export default filterSearch;
