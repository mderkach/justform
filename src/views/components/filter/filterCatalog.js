/* eslint-disable no-plusplus */
import './filter.scss';

/**
 * TODO:
 * ЭТО КОПИЯ КЛАССА filter изменная, правильнее было бы сделать общий класс и передавать колбеки(или по-другому
 * построить архитектуру но суть понятна), но время поджимало я не разобралося почему не работало.
 * Используется только в catalog.js в идеале выпилить
 * @type {{removeSelectedFormItems(*, *=): void, onUnSelect(*=): void, init: filterCatalog.init, recreateNode: filterCatalog.recreateNode, refresh: filterCatalog.refresh, wrapper: NodeListOf<Element>, createSelect: filterCatalog.createSelect, createSelectMenu: filterCatalog.createSelectMenu, calculateSelected: filterCatalog.calculateSelected, onSelect(*=): void, removeSelectedFromAllValue(*): void, selectedNullValue: null, openFilter: filterCatalog.openFilter, createSelectMenuItems: filterCatalog.createSelectMenuItems, createItem: (function(*): HTMLDivElement), selectedCallback: null, toggleActive: filterCatalog.toggleActive, unSelectedCallback: null}}
 */

const filterCatalog = {
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
    filterCatalog.wrapper.forEach((label) => {
      const select = label.querySelector('select');
      const options = [...label.querySelector('select')];
      // create menu
      filterCatalog.createSelectMenu(label);
      // create menu items
      filterCatalog.createSelectMenuItems(label);

      filterCatalog.openFilter(label);

      const menuItem = label.querySelectorAll('.filter-menu-item');
      if (!select.hasAttribute('multiple')) {
        filterCatalog.toggleActive(menuItem, options, select, label, false);
      } else {
        filterCatalog.toggleActive(menuItem, options, select, label, true);
      }

      filterCatalog.calculateSelected(select, label);
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
      const item = filterCatalog.createItem(option.value);

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
              filterCatalog.onUnSelect(option);
            }
          });
        } else {
          if (!multiple) {
            filterCatalog.removeSelectedFormItems(itemsArray);
          }
          item.classList.add('is-selected');
          // Кнопка "Любое"

          options.forEach((option) => {
            if (!multiple) {
              option.setAttribute('selected', false);
            }

            if (option.value === item.textContent) {
              option.setAttribute('selected', true);
              filterCatalog.onSelect(option);
              const optionId = option.getAttribute('data-id');
              // eslint-disable-next-line eqeqeq
              if (optionId == filterCatalog.selectedNullValue) {
                item.setAttribute('data-null-property', true);
              }
            }
          });

          if (item.hasAttribute('data-null-property') && item.getAttribute('data-null-property')) {
            filterCatalog.removeSelectedFormItems(itemsArray, options);
          } else {
            filterCatalog.removeSelectedFromAllValue(itemsArray);
          }
        }

        filterCatalog.calculateSelected(select, wrapper);
      });
    });
  },
  removeSelectedFromAllValue(items) {
    items.forEach((elm) => {
      if (elm.hasAttribute('data-null-property') && elm.getAttribute('data-null-property')) {
        elm.classList.remove('is-selected');
      }
    });
  },
  removeSelectedFormItems(items, options) {
    items.forEach((elm) => {
      if (!elm.hasAttribute('data-null-property') || !elm.getAttribute('data-null-property')) {
        elm.classList.remove('is-selected');
      }
    });

    if (options) {
      options.forEach((option) => {
        option.setAttribute('selected', false);
      });
    }
  },
  onSelect(option) {
    if (option.hasAttribute('data-href')) {
      // TODO: move selectedCallback
      window.location.href = option.getAttribute('data-href');
    } else if (filterCatalog.selectedCallback != null) {
      filterCatalog.selectedCallback(option);
    }
  },
  onUnSelect(option) {
    if (option.hasAttribute('data-href')) {
      // TODO: move selectedCallback
      window.location.href = option.getAttribute('data-href');
    } else if (filterCatalog.unSelectedCallback != null) {
      filterCatalog.unSelectedCallback(option);
    }
  },
  init: (selectedCallback = null, unselectedCallback = null, selectedNullValue = -1) => {
    filterCatalog.selectedCallback = selectedCallback;
    filterCatalog.unSelectedCallback = unselectedCallback;
    filterCatalog.selectedNullValue = selectedNullValue;
    if (filterCatalog.wrapper) {
      filterCatalog.createSelect();
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
    filterCatalog.wrapper.forEach((label) => {
      const select = label.querySelector('select');
      const options = [...label.querySelector('select')];

      options.forEach((option) => {
        option.removeAttribute('selected');
      });

      label.querySelector('.filter-menu').remove();
      filterCatalog.calculateSelected(select, label);
    });
  },
};

export default filterCatalog;
