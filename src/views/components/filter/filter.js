/* eslint-disable no-plusplus */
const filter = {
  wrapper: document.querySelectorAll('.filter-wrapper'),
  createSelect: () => {
    filter.wrapper.forEach((label) => {
      const select = label.querySelector('select');
      const options = [...label.querySelector('select')];
      // create menu
      filter.createSelectMenu(label);
      // create menu items
      filter.createSelectMenuItems(label);

      label.addEventListener('click', (e) => {
        e.preventDefault();
        label.classList.toggle('is-active');
      });

      // document.addEventListener('click', (event) => {
      //   label.addEventListener('click', () => {
      //     if (event.target !== label) {
      //       label.classList.remove('is-active');
      //     }
      //   });
      // });

      const menuItem = label.querySelectorAll('.filter-menu-item');
      if (!select.hasAttribute('multiple')) {
        filter.toggleActive(menuItem, options, select, label, false);
      } else {
        filter.toggleActive(menuItem, options, select, label, true);
      }
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
    item.className = 'filter-menu-item';
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
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        if (item.classList.contains('is-selected')) {
          item.classList.remove('is-selected');
          options.forEach((option) => {
            if (option.value === item.textContent) {
              option.setAttribute('selected', false);
            }
          });
        } else {
          if (!multiple) {
            items.forEach((elm) => {
              elm.classList.remove('is-selected');
            });
          }
          item.classList.add('is-selected');
          options.forEach((option) => {
            if (!multiple) {
              option.setAttribute('selected', false);
            }
            if (option.value === item.textContent) {
              option.setAttribute('selected', true);
            }
          });
        }

        filter.calculateSelected(select, wrapper);
      });
    });
  },
  init: () => {
    if (filter.wrapper) {
      filter.createSelect();
    }
  },
};

export default filter;
