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

      filterSearch.updateSearchItems(filterItems, input, selectedCallback)

    });
  },
  activateSearch(input, item, filterItems, selectedCallback){
    item.addEventListener('click', (e) => {
      filterItems.innerHTML = "";
      input.value = item.innerText;
      input.setAttribute('data-id', item.getAttribute('data-id'));

      if(selectedCallback != null){
        selectedCallback(item);
      }
    });
  },
  updateSearchItems(filterItems, input, selectedCallback){
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
              filterSearch.activateSearch(input, filterItem, filterItems, selectedCallback);
            }
          );
        });
    }else{
      filterItems.innerHTML = "";
      selectedCallback(null);
    }
  },
  openFilter: (elm, selectedCallback) => {
    const header = elm.querySelector('.filter-search-header');
    const filterItems = elm.querySelector('.filter-items');
    const input = elm.querySelector('input');

    header.addEventListener('click', (e) => {
      e.preventDefault();

      if (elm.classList.contains('is-active')) {
        elm.classList.remove('is-active');
        filterItems.innerHTML = "";
      } else {
        elm.classList.add('is-active');
        filterSearch.updateSearchItems(filterItems, input, selectedCallback);
      }
    });
  },
  init: (selectedCallback = null) => {
    if (filterSearch.wrapper.length > 0) {
      filterSearch.wrapper.forEach((wrapper) => {
        filterSearch.openFilter(wrapper, selectedCallback);
        filterSearch.onInput(wrapper, selectedCallback);
      });
    }
  },
};

export default filterSearch;
