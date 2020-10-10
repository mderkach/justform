const URI = '';

const search = {
  results: document.querySelector('.search__results'),
  reset: document.querySelector('.search__reset'),
  resultsText: document.querySelector('.search__results-not-found'),
  input: document.querySelector('#search-from'),
  render() {
    const query = search.input.value;
    fetch(`${URI}q=${query}`)
      .then((response) => response.text())
      .then(function (data) {
        if (!search.isEmptyOrSpaces(data)) {
          search.results.innerHTML = data;
          search.resultsText.innerHTML = '';
        } else {
          search.resultsText.innerHTML = `По запросу « ${query} » ничего не найдено`;
          search.results.innerHTML = '';
        }
      });
  },
  init() {
    if (this.results) {
      console.log('int srch');
    }
  },
};

export default search;
