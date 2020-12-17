/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */
/* eslint-disable eqeqeq */
// styles
import './catalog.scss';

// js & components
import filter from '../components/filter/filter';
import filterCatalog from '../components/filter/filterCatalog';
import filterSimple from '../components/filter/filterSimple';
import filterResetCatalog from '../components/filter/filterResetCatalog';
import filterSearch from '../components/filter/filterSearch';
// initialise components

const baseUrl = '';
const CATEGORY_NULL_VALUE = -1;

const filterCatalogUtils = {
  params: {},
  catalogRow: document.querySelector('.catalog__row'),
  currentEntity: document.getElementById('current_entity'),

  init() {
    filterCatalogUtils.clearParams();
    let properties = ['fabric' , 'subcategory', 'places', 'categories', 'styles'];

    properties.forEach((property)=>{
      let propertyElement = document.getElementById('initial_' + property);
      let propertyValue = null;

      if(propertyElement){
        propertyValue = propertyElement.getAttribute('value');
      }

      if(propertyValue) {
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
  addToProperty(type, id){
    let index;
    /**
     * TODO: Рефакторить этот ужас
     */
    switch (type) {
      case 'categories':
        if (id == CATEGORY_NULL_VALUE) {
          filterCatalogUtils.params.categories = [];
        } else {
          index = filterCatalogUtils.params.categories.indexOf(id);
          if (index === -1) {
            filterCatalogUtils.params.categories.push(id);
          }
        }
        break;
      case 'places':
        if (id == CATEGORY_NULL_VALUE) {
          filterCatalogUtils.params.places = [];
        } else {
          index = filterCatalogUtils.params.places.indexOf(id);
          if (index === -1) {
            filterCatalogUtils.params.places.push(id);
          }
        }
        break;
      case 'subcategory':
        if (id == CATEGORY_NULL_VALUE) {
          filterCatalogUtils.params.subcategory = null;
        } else {
          filterCatalogUtils.params.subcategory = id;
        }
        break;

      case 'styles':
        if (id == CATEGORY_NULL_VALUE) {
          filterCatalogUtils.params.styles = null;
        } else {
          filterCatalogUtils.params.styles = id;
        }
        break;
    }
  },
  onUnSelect(option) {
    let index;
    const id = option.getAttribute('data-id');
    const type = option.getAttribute('data-type');

    switch (type) {
      case 'categories':
        index = filterCatalogUtils.params.categories.indexOf(id);
        if (index !== -1) {
          filterCatalogUtils.params.categories.splice(index, 1);
        }
        break;
      case 'places':
        index = filterCatalogUtils.params.places.indexOf(id);
        if (index !== -1) {
          filterCatalogUtils.params.places.splice(index, 1);
        }
        break;
      case 'subcategory':
        filterCatalogUtils.params.subcategory = null;
        break;
      case 'styles':
        index = filterCatalogUtils.params.styles.indexOf(id);
        if (index !== -1) {
          filterCatalogUtils.params.styles.splice(index, 1);
        }
        break;
    }

    filterCatalogUtils.filterRequest();
  },
   filterRequest(){
     const searchParams = new URLSearchParams(filterCatalogUtils.removeEmptyParams(
       filterCatalogUtils.params, param => param !== null && param !== undefined && param !== []
     ));

     fetch(baseUrl +"/katalog/filter?" +  searchParams.toString())
       .then(response=>response.text())
       .then(response=>{
         let catalogList = document.querySelector('.catalog__list');
         if(catalogList != null) {
           filterCatalogUtils.catalogRow.removeChild(catalogList);
         }

         let paginationWrapper = document.querySelector('.pagination__wrapper');
         if(paginationWrapper != null) {
           filterCatalogUtils.catalogRow.removeChild(paginationWrapper);
         }

         filterCatalogUtils.catalogRow.insertAdjacentHTML('beforeend', response);
         filterSimple.reinit();
         filterCatalog.reinit();
       });
   },
   removeEmptyParams(params, predicate){
     let result = {}, key;

     for (key in params) {
       if (params.hasOwnProperty(key) && predicate(params[key])) {
         result[key] = params[key];
       }
     }

     return result;
   },
   clearParams(){
     let init = {
       fabric: null,
       subcategory: null,
       places: [],
       categories: [],
       styles: [],
       page: 1,
       per_page: 40,
       place: null,
       category: null,
       style: null
     }

     let pageType = filterCatalogUtils.currentEntity.getAttribute('data-type');
     let pageId = filterCatalogUtils.currentEntity.getAttribute('data-id');
     if(pageType === 'category'){
       init.category = pageId;
     }else if(pageType === 'place'){
       init.place = pageId;
     } else if(pageType === 'style'){
       init.style = pageId;
    }
     else{
       init.place = null;
     }

     filterCatalogUtils.params = init;

     let element = document.getElementById('fabric_search_input');
     if(element) {
       element.setAttribute("value", "");
     }
   },

   onFabricSelect(item){
     if(item == null){
       if(filterCatalogUtils.params.fabric != null){
         filterCatalogUtils.params.fabric = null;
         filterCatalogUtils.filterRequest();
       }
     }else {
       filterCatalogUtils.params.fabric = item.getAttribute('data-id');
       filterCatalogUtils.filterRequest();
     }
   }
}

filterCatalogUtils.init();

filterCatalog.init(filterCatalogUtils.onSelect, filterCatalogUtils.onUnSelect, CATEGORY_NULL_VALUE);
filterSimple.init();
filterResetCatalog.init(filterCatalogUtils.onClearFilters, filterCatalog);
filterSearch.init(filterCatalogUtils.onFabricSelect);
