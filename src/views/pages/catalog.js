// styles
import './catalog.scss';

// js & components
import filter from '../components/filter/filter';
import filterSimple from '../components/filter/filterSimple';
import filterReset from '../components/filter/filterReset';
import filterSearch from '../components/filter/filterSearch';
// initialise components

const baseUrl = "";
const CATEGORY_NULL_VALUE = -1;

let filterCatalog = {
   params: {},
   catalogRow: document.querySelector('.catalog__row'),
   currentEntity: document.getElementById('current_entity'),

   init(){
     filterCatalog.clearParams();
   },
   onClearFilters(){
     filterCatalog.clearParams();
     filterCatalog.filterRequest();
   },
   onSelect(option){
     let index;
     let id = option.getAttribute('data-id');
     let type = option.getAttribute('data-type');

     switch(type){
        case 'categories':
          if(id == CATEGORY_NULL_VALUE){
            filterCatalog.params.categories = [];
          }else {
            index = filterCatalog.params.categories.indexOf(id);
            if (index === -1) {
              filterCatalog.params.categories.push(id);
            }
          }
        break;
        case 'places':
          if(id == CATEGORY_NULL_VALUE){
            filterCatalog.params.places = [];
          }else {
            index = filterCatalog.params.places.indexOf(id);
            if (index === -1) {
              filterCatalog.params.places.push(id);
            }
          }
        break;
        case 'subcategory':
          if(id == CATEGORY_NULL_VALUE){
            filterCatalog.params.subcategory = null;
          }else {
            filterCatalog.params.subcategory = id;
          }
        break;
      }

     filterCatalog.filterRequest();
   },
  onUnSelect(option){
    let index;
    let id = option.getAttribute('data-id');
    let type = option.getAttribute('data-type');

    switch(type){
      case 'categories':
        index = filterCatalog.params.categories.indexOf(id);
        if(index !== -1) {
          filterCatalog.params.categories.splice(index, 1);
        }
        break;
      case 'places':
        index = filterCatalog.params.places.indexOf(id);
        if(index !== -1){
          filterCatalog.params.places.splice(index, 1);
        }
        break;
      case 'subcategory':
        filterCatalog.params.subcategory = null;
        break;
    }

    filterCatalog.filterRequest();
  },
   filterRequest(){
     const searchParams = new URLSearchParams(filterCatalog.removeEmptyParams(
       filterCatalog.params, param => param !== null && param !== undefined && param !== []
     ));

     fetch(baseUrl +"/katalog/filter?" +  searchParams.toString())
       .then(response=>response.text())
       .then(response=>{
         let catalogList = document.querySelector('.catalog__list');
         if(catalogList != null) {
           filterCatalog.catalogRow.removeChild(catalogList);
         }

         let paginationWrapper = document.querySelector('.pagination__wrapper');
         if(paginationWrapper != null) {
           filterCatalog.catalogRow.removeChild(paginationWrapper);
         }

         filterCatalog.catalogRow.insertAdjacentHTML('beforeend', response);
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

     let pageType = filterCatalog.currentEntity.getAttribute('data-type');
     let pageId = filterCatalog.currentEntity.getAttribute('data-id');
     if(pageType === 'category'){
       init.category = pageId;
     }else{
       init.place = pageId;
     }

     filterCatalog.params = init;
   },

   onFabricSelect(item){
     if(item == null){
       if(filterCatalog.params.fabric != null){
         filterCatalog.params.fabric = null;
         filterCatalog.filterRequest();
       }
     }else {
       filterCatalog.params.fabric = item.getAttribute('data-id');
       filterCatalog.filterRequest();
     }
   }
}

filterCatalog.init();

filter.init(filterCatalog.onSelect, filterCatalog.onUnSelect, CATEGORY_NULL_VALUE);
filterSimple.init(filterCatalog.onSelect);
filterReset.init(filterCatalog.onClearFilters);
filterSearch.init(filterCatalog.onFabricSelect);
