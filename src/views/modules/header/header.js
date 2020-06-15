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
  closeAll: (arr, event) => {
    arr.forEach((item) => {
      if (event.target !== item) {
        item.classList.remove('is-active');
      }
    });
  },
  stuck: false,
  init: () => {
    if (header.wrapper) {
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
          header.wrapper.focus();
          let target = header.selectTarget(category, 'href');

          if (category.hasAttribute('data-target')) {
            target = header.selectTarget(category, 'data-target');
          }

          header.categories.forEach((link) => link.classList.remove('is-active'));
          category.classList.toggle('is-active');

          menus.forEach((menu) => {
            if (menu === target) {
              menu.classList.toggle('is-active');

              if (menu.classList.contains('is-active')) {
                header.wrapper.classList.add('is-expanded');
              } else {
                header.wrapper.classList.remove('is-expanded');
              }
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
