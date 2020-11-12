/* eslint-disable no-plusplus */
import './filter.scss';

const filter = {
  selectedCallback: null,
  unSelectedCallback: null,
  selectedNullValue: null,
  wrapper: document.querySelectorAll('.filter-wrapper'),
  openFilter: (elm) => {
    const header = elm.querySelector('.filter-header');

    header.addEventListener('click', (e) => {
      e.preventDefault();

      if (elm.classList.contains('is-active')) {
        elm.classList.remove('is-active');
      } else {
        elm.classList.add('is-active');
      }
    });
  },
  createSelect: () => {
    filter.wrapper.forEach((label) => {
      const select = label.querySelector('select');
      const options = [...label.querySelector('select')];
      // create menu
      filter.createSelectMenu(label);
      // create menu items
      filter.createSelectMenuItems(label);

      filter.openFilter(label);

      const menuItem = label.querySelectorAll('.filter-menu-item');
      if (!select.hasAttribute('multiple')) {
        filter.toggleActive(menuItem, options, select, label, false);
      } else {
        filter.toggleActive(menuItem, options, select, label, true);
      }

      filter.calculateSelected(select, label);
    });
  },
  createSelectMenu: (elm) => {
    const menu = document.createElement('div');
    menu.className = 'filter-menu';
    elm.append(menu);
  },
  createSelectMenuItems: (arr) => {
    const filterMenu = arr.querySelector('.filter-menu');
    // get select
    const select = arr.querySelector('select');
    // get options
    const options = [...arr.querySelector('select')];
    // options array
    const tempMenu = [];
    options.forEach((option) => {
      const item = filter.createItem(option.value);

      if (option.hasAttribute('default')) {
        item.classList.add('is-selected');
        select.value = item.innerText;
      }

      if (option.hasAttribute('selected')) {
        item.classList.add('is-selected');
        select.value = item.innerText;
      }

      if (option.hasAttribute('disabled')) {
        item.classList.add('is-disabled');
      }

      if (!option.hasAttribute('hidden')) {
        tempMenu.push(item);
      }
    });
    // append items to menu
    tempMenu.forEach((item) => {
      filterMenu.append(item);
    });
  },
  createItem: (value) => {
    const item = document.createElement('div');
    item.className = 'filter-menu-item text-filter';
    item.textContent = value;
    return item;
  },
  calculateSelected: (elm, cnt) => {
    const counter = cnt.querySelector('.filter-counter');
    const opts = elm.querySelectorAll('option[selected=true]');
    if (opts.length > 0) {
      counter.style.display = 'block';
    } else {
      counter.style.display = 'none';
    }
    counter.textContent = opts.length;
  },
  toggleActive: (items, options, select, wrapper, multiple) => {
    items.forEach((item, index, itemsArray) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        if (item.classList.contains('is-selected')) {
          item.classList.remove('is-selected');
          options.forEach((option) => {
            if (option.value === item.textContent) {
              option.setAttribute('selected', false);
              filter.onUnSelect(option);
            }
          });
        } else {
          if (!multiple) {
            filter.removeSelectedFormItems(itemsArray);
          }
          item.classList.add('is-selected');
          //Кнопка "Любое"

          options.forEach((option) => {
            if (!multiple) {
              option.setAttribute('selected', false);
            }

            if (option.value === item.textContent) {
              option.setAttribute('selected', true);
              filter.onSelect(option);
              let optionId = option.getAttribute('data-id');
              if (optionId == filter.selectedNullValue) {
                item.setAttribute('data-null-property', true);
              }
            }
          });

          if(item.hasAttribute('data-null-property') && item.getAttribute('data-null-property')){
            filter.removeSelectedFormItems(itemsArray, options);
          }else{
            filter.removeSelectedFromAllValue(itemsArray);
          }
        }

        filter.calculateSelected(select, wrapper);
      });
    });
  },
  removeSelectedFromAllValue(items) {
    items.forEach((elm) => {
      if(elm.hasAttribute('data-null-property') && elm.getAttribute('data-null-property')) {
        elm.classList.remove('is-selected');
      }
    });
  },
  removeSelectedFormItems(items, options) {
    items.forEach((elm) => {
      if(!elm.hasAttribute('data-null-property') || !elm.getAttribute('data-null-property')) {
        elm.classList.remove('is-selected');
      }
    });

    options.forEach((option) => {
        option.setAttribute('selected', false);
    });
  },
  onSelect(option) {
    if (option.hasAttribute('data-href')) {
      //TODO: move selectedCallback
      window.location.href = option.getAttribute('data-href');
    } else if (filter.selectedCallback != null) {
      filter.selectedCallback(option);
    }
  },
  onUnSelect(option) {
    if (option.hasAttribute('data-href')) {
      //TODO: move selectedCallback
      window.location.href = option.getAttribute('data-href');
    } else if (filter.unSelectedCallback != null) {
      filter.unSelectedCallback(option);
    }
  },
  init: (selectedCallback = null, unselectedCallback = null, selectedNullValue = -1) => {
    filter.selectedCallback = selectedCallback;
    filter.unSelectedCallback = unselectedCallback;
    filter.selectedNullValue = selectedNullValue;
    if (filter.wrapper) {
      filter.createSelect();
    }
  },
  recreateNode: (el, withChildren) => {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    } else {
      const newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
  },
  refresh: () => {
    filter.wrapper.forEach((label) => {
      const select = label.querySelector('select');
      const options = [...label.querySelector('select')];

      options.forEach((option) => {
        option.removeAttribute('selected');
      });

      label.querySelector('.filter-menu').remove();
      filter.calculateSelected(select, label);
    });
  },
};

export default filter;
