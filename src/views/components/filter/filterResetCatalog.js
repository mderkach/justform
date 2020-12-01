import './filterReset.scss';

/**
 * TODO:
 * ЭТО КОПИЯ КЛАССА filter изменная, правильнее было бы сделать общий класс и передавать колбеки(или по-другому
 * построить архитектуру но суть понятна), но время поджимало я не разобралося почему не работало.
 * Используется только в catalog.js в идеале выпилить
 * @type {{removeSelectedFormItems(*, *=): void, onUnSelect(*=): void, init: filterCatalog.init, recreateNode: filterCatalog.recreateNode, refresh: filterCatalog.refresh, wrapper: NodeListOf<Element>, createSelect: filterCatalog.createSelect, createSelectMenu: filterCatalog.createSelectMenu, calculateSelected: filterCatalog.calculateSelected, onSelect(*=): void, removeSelectedFromAllValue(*): void, selectedNullValue: null, openFilter: filterCatalog.openFilter, createSelectMenuItems: filterCatalog.createSelectMenuItems, createItem: (function(*): HTMLDivElement), selectedCallback: null, toggleActive: filterCatalog.toggleActive, unSelectedCallback: null}}
 */

const filterReset = {
  button: document.querySelector('.filter-reset'),
  init: (callback = null, filterCatalog = null) => {
    if (filterReset.button) {
      filterReset.button.addEventListener('click', () => {
        if (filterCatalog) {
          filterCatalog.refresh();
          filterCatalog.createSelect();
        }

        callback();
      });
    }
  },
};

export default filterReset;
