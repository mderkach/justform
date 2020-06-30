const header = {
  wrapper: document.querySelector('.header'),
  mobile: document.querySelector('.header-main-mobile'),
  menuMobile: document.querySelector('.menu-mobile'),
  menuMobileTrigger: document.querySelector('.header-main-mobile-button'),
  categories: document.querySelectorAll('.header__category-wrapper'),
  more: document.querySelector('.header__menu-button'),
  search: document.querySelector('.header__search-button'),
  searchMobile: document.querySelector('.header-main-mobile-search'),
  overlay: document.querySelector('.search__wrapper'),
  closeOverlay: document.querySelector('.search-close'),
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
  sticky: (elm) => {
    const getDistance = () => {
      const topDist = elm.offsetTop;
      return topDist;
    };

    const stickPpoint = getDistance();

    window.onscroll = () => {
      const dist = getDistance() - window.pageYOffset;
      const offset = window.pageYOffset;

      if (dist <= 0 && !header.stuck) {
        elm.classList.add('is-sticky');
        header.stuck = true;
      } else if (header.stuck && offset <= stickPpoint) {
        elm.classList.remove('is-sticky');
        header.stuck = false;
      }
    };
  },
  stuck: false,
  init: () => {
    if (header.wrapper) {
      header.sticky(header.wrapper);
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

          header.categories.forEach((link) => {
            if (link === category && !link.classList.contains('is-active')) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });

          if (category.hasAttribute('data-target')) {
            target = header.selectTarget(category, 'data-target');
          }

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

    if (header.search && header.overlay && header.closeOverlay) {
      header.search.addEventListener('click', (e) => {
        e.preventDefault();
        header.overlay.classList.add('is-active');
        document.body.classList.add('is-modal-open');
      });

      header.closeOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        header.overlay.classList.remove('is-active');
        document.body.classList.remove('is-modal-open');
        document.body.style.position = 'relative';
      });
    }

    if (header.mobile) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      console.log(vw);

      if (vw < 1200) {
        header.sticky(header.mobile);

        if (header.menuMobile && header.menuMobileTrigger) {
          header.menuMobileTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            header.menuMobile.classList.toggle('is-active');
            header.menuMobileTrigger.classList.toggle('is-active');
            header.mobile.classList.toggle('is-menu-active');
          });
        }

        if (header.searchMobile) {
          header.searchMobile.addEventListener('click', (e) => {
            e.preventDefault();
            header.overlay.classList.add('is-active');
            document.body.classList.add('is-modal-open');
            setTimeout(() => {
              document.body.style.position = 'fixed';
            }, 500);
          });

          header.closeOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            header.overlay.classList.remove('is-active');
            document.body.classList.remove('is-modal-open');
            document.body.style.position = 'relative';
          });
        }
      }
    }
  },
};

export default header;
