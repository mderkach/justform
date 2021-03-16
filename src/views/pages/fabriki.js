import './fabriki.scss';
import accordion from '../components/accordion/accordion';
import filterSimple from "../components/filter/filterSimple";
import filterCatalog from "../components/filter/filterCatalog";
import filterResetCatalog from "../components/filter/filterResetCatalog";
import filterSearch from "../components/filter/filterSearch";

accordion.init();

const baseUrl = '';
const CATEGORY_NULL_VALUE = -1;

const filterCatalogUtils = {
  params: {},
  catalogRow: document.querySelector('.fabriki__grid'),
  currentEntity: document.getElementById('current_entity'),

  init() {
    filterCatalogUtils.clearParams();
    let properties = ['category', 'style'];

    properties.forEach((property) => {
      let propertyElement = document.getElementById('initial_' + property);
      let propertyValue = null;

      if (propertyElement) {
        propertyValue = propertyElement.getAttribute('value');
      }

      if (propertyValue) {
        filterCatalogUtils.addToProperty(property, propertyValue);
      }
    });
  },
  onClearFilters() {
    filterCatalogUtils.clearParams();
    filterCatalogUtils.filterRequest();
  },
  onSelect(option) {
    const id = option.getAttribute('data-id');
    const type = option.getAttribute('data-type');

    filterCatalogUtils.addToProperty(type, id);
    filterCatalogUtils.filterRequest();
  },
  addToProperty(type, id) {
    let index;
    /**
     * TODO: Рефакторить этот ужас
     */
    switch (type) {
      case 'category':
        if (id == CATEGORY_NULL_VALUE) {
          filterCatalogUtils.params.category = null;
        } else {
          filterCatalogUtils.params.category = id;
        }
        break;

      case 'style':
        if (id == CATEGORY_NULL_VALUE) {
          filterCatalogUtils.params.style = null;
        } else {
          filterCatalogUtils.params.style = id;
        }
        break;
    }
  },
  onUnSelect(option) {
    let index;
    const id = option.getAttribute('data-id');
    const type = option.getAttribute('data-type');

    switch (type) {
      case 'category':
        filterCatalogUtils.params.category = null;
        break;

      case 'style':
        filterCatalogUtils.params.style = null;
        break;
    }

    filterCatalogUtils.filterRequest();
  },
  filterRequest() {
    const searchParams = new URLSearchParams(filterCatalogUtils.removeEmptyParams(
      filterCatalogUtils.params, param => param !== null && param !== undefined && param !== []
    ));

    fetch(baseUrl + "/katalog/fabriki/filter?" + searchParams.toString())
      .then(response => response.text())
      .then(response => {
        let catalogList = document.querySelectorAll('.fabriki__grid > .fabriki__block');
        if (catalogList != null) {
          catalogList.forEach((catalog) => {
            catalog.remove();
          });
        }

        filterCatalogUtils.catalogRow.insertAdjacentHTML('beforeend', response);
        filterSimple.reinit();
      });
  },
  removeEmptyParams(params, predicate) {
    let result = {}, key;

    for (key in params) {
      if (params.hasOwnProperty(key) && predicate(params[key])) {
        result[key] = params[key];
      }
    }

    return result;
  },
  clearParams() {
    let init = {
      category: null,
      style: null
    }

    filterCatalogUtils.params = init;
  }
}

filterCatalogUtils.init();

filterCatalog.init(filterCatalogUtils.onSelect, filterCatalogUtils.onUnSelect, CATEGORY_NULL_VALUE);
filterSimple.init();
filterResetCatalog.init(filterCatalogUtils.onClearFilters, filterCatalog, filterSimple);
filterSearch.init(filterCatalogUtils.onFabricSelect);
