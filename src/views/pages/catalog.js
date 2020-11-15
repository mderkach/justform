// styles
import './catalog.scss';

// js & components
import filter from '../components/filter/filter';
import filterCatalog from '../components/filter/filterCatalog';
import filterSimple from '../components/filter/filterSimple';
import filterReset from '../components/filter/filterReset';
import filterSearch from '../components/filter/filterSearch';
// initialise components

const baseUrl = "";
const CATEGORY_NULL_VALUE = -1;

let filterCatalogUtils = {
   params: {},
   catalogRow: document.querySelector('.catalog__row'),
   currentEntity: document.getElementById('current_entity'),

   init(){
     filterCatalogUtils.clearParams();
   },
   onClearFilters(){
     filterCatalogUtils.clearParams();
     filterCatalogUtils.filterRequest();
   },
   onSelect(option){
     let index;
     let id = option.getAttribute('data-id');
     let type = option.getAttribute('data-type');

     switch(type){
        case 'categories':
          if(id == CATEGORY_NULL_VALUE){
            filterCatalogUtils.params.categories = [];
          }else {
            index = filterCatalogUtils.params.categories.indexOf(id);
            if (index === -1) {
              filterCatalogUtils.params.categories.push(id);
            }
          }
        break;
        case 'places':
          if(id == CATEGORY_NULL_VALUE){
            filterCatalogUtils.params.places = [];
          }else {
            index = filterCatalogUtils.params.places.indexOf(id);
            if (index === -1) {
              filterCatalogUtils.params.places.push(id);
            }
          }
        break;
        case 'subcategory':
          if(id == CATEGORY_NULL_VALUE){
            filterCatalogUtils.params.subcategory = null;
          }else {
            filterCatalogUtils.params.subcategory = id;
          }
        break;
      }

     filterCatalogUtils.filterRequest();
   },
  onUnSelect(option){
    let index;
    let id = option.getAttribute('data-id');
    let type = option.getAttribute('data-type');

    switch(type){
      case 'categories':
        index = filterCatalogUtils.params.categories.indexOf(id);
        if(index !== -1) {
          filterCatalogUtils.params.categories.splice(index, 1);
        }
        break;
      case 'places':
        index = filterCatalogUtils.params.places.indexOf(id);
        if(index !== -1){
          filterCatalogUtils.params.places.splice(index, 1);
        }
        break;
      case 'subcategory':
        filterCatalogUtils.params.subcategory = null;
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
         filterSimple.init(filterCatalogUtils.onSelect);
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
       page: 1,
       per_page: 40,
       place: null,
       category: null
     }

     let pageType = filterCatalogUtils.currentEntity.getAttribute('data-type');
     let pageId = filterCatalogUtils.currentEntity.getAttribute('data-id');
     if(pageType === 'category'){
       init.category = pageId;
     }else{
       init.place = pageId;
     }

     filterCatalogUtils.params = init;
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
filterReset.init(filterCatalogUtils.onClearFilters);
filterSearch.init(filterCatalogUtils.onFabricSelect);
