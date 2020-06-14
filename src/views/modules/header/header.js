const header = {
  wrapper: document.querySelector('header'),
  categories: document.querySelectorAll('.header__category-wrapper'),
  stuck: false,
  init: () => {
    if (header.wrapper) {
      console.log(`header ready`);

      const getDistance = () => {
        const topDist = header.wrapper.offsetTop;
        return topDist;
      };

      const stickPpoint = getDistance();

      window.onscroll = () => {
        const dist = getDistance() - window.pageYOffset;
        const offset = window.pageYOffset;

        if (dist <= 0 && !header.stuck) {
          header.wrapper.classList.add('is-sticky');
          header.stuck = true;
        } else if (header.stuck && offset <= stickPpoint) {
          header.wrapper.classList.remove('is-sticky');
          header.stuck = false;
        }
      };
    }

    if (header.categories) {
      const menus = document.querySelectorAll('.header__category-menu');
      header.categories.forEach((category) => {
        category.addEventListener('click', (e) => {
          e.preventDefault();
          const selector = category.getAttribute('href');
          const target = document.querySelector(`[data-parent=${selector}]`);

          menus.forEach((menu) => {
            if (menu === target) {
              menu.classList.toggle('is-active');
            } else {
              menu.classList.remove('is-active');
            }
          });
        });
      });
    }
  },
};

export default header;
