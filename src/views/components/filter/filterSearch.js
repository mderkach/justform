import './filterSearch.scss';

const filterSearch = {
  wrapper: document.querySelectorAll('.filter-search-wrapper'),
  onInput(wrapper, selectedCallback = null) {
    const input = wrapper.querySelector('input');
    input.addEventListener('keyup', (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      const filterItems = wrapper.querySelector('.filter-items');
      const activateSearch = function (input, item){
        item.addEventListener('click', (e) => {
          filterItems.innerHTML = "";
          input.value = item.innerText;
          input.setAttribute('data-id', item.getAttribute('data-id'));

          if(selectedCallback != null){
            selectedCallback(item);
          }
        });
      };

      if(input.value.length == 0){
        filterItems.innerHTML = "";
        selectedCallback(null);
      }

      if (input.value.length >= 3) {
        filterItems.innerHTML = "";
        fetch("/katalog/fabric_search.html?q=" + input.value)
          .then(response => response.json())
          .then(data => {
            input.removeAttribute('data-id');
            data.results.forEach(function (item, i, items){
               var filterItem = document.createElement('div');
                filterItem.className = "filter-menu-item text-filter filter-search-item";
                filterItem.setAttribute('data-id', item.id);
                filterItem.innerText = item.text;
                filterItems.append(filterItem);
                activateSearch(input, filterItem);
              }
            );
          });
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
  init: (selectedCallback = null) => {
    if (filterSearch.wrapper.length > 0) {
      filterSearch.wrapper.forEach((wrapper) => {
        filterSearch.openFilter(wrapper);
        filterSearch.onInput(wrapper, selectedCallback);
      });
    }
  },
};

export default filterSearch;
