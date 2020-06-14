const header = {
  wrapper: document.querySelector('header'),
  categories: document.querySelectorAll('.header__category-wrapper'),
  more: document.querySelector('.header__menu-button'),
  selectTarget: (link, attr) => {
    const selector = link.getAttribute(attr);
    const target = document.querySelector(`[data-parent=${selector}]`);
    return target;
  },
  expandHeader: (elm) => {
    if (elm.classList.contains('is-expanded')) {
      setTimeout(() => {
        elm.classList.remove('is-expanded');
      }, 450);
    } else {
      elm.classList.add('is-expanded');
    }
  },
  checkExpandedMenu: (elm) => {
    if (elm.classList.contains('is-active')) {
      console.log('expanded');
    } else {
      console.log('closed');
    }
  },
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
      header.categories = Array.from(header.categories);
      header.categories.push(header.more);
      const menus = document.querySelectorAll('.header__category-menu');

      header.categories.forEach((category) => {
        category.addEventListener('click', (e) => {
          e.preventDefault();

          // if (category.classList.contains('is-active') && category.hasAttribute('data-target')) {
          //   category.classList.remove('is-active');
          // } else {
          //   category.classList.add('is-active');
          // }

          let target = header.selectTarget(category, 'href');

          if (category.hasAttribute('data-target')) {
            target = header.selectTarget(category, 'data-target');
          }

          console.log(category);

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
