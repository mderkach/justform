const menuMobile = {
  categories: document.querySelectorAll('.menu-mobile-category'),
  init: () => {
    if (menuMobile.categories) {
      menuMobile.categories.forEach((category) => {
        const header = category.querySelector('.menu-mobile-category-header');
        header.addEventListener('click', (e) => {
          e.preventDefault();
          if (header.parentElement.classList.contains('is-active')) {
            header.parentElement.classList.remove('is-active');
          } else {
            header.parentElement.classList.add('is-active');
          }
        });
      });
    }
  },
};

export default menuMobile;
