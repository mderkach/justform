import './header.scss';

const LogoSource = './assets/img/logo.png';
const LogoImg = './assets/img/logo.webp';
const LogoSourceAlt = './assets/img/logo-alt.png';
const LogoImgAlt = './assets/img/logo-alt.webp';

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
  tabsTriggers: document.querySelector('.header__category-factory').querySelectorAll('a'),
  tabsContents: document.querySelectorAll('.header__category-factory-menu'),
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
  closeAll: (arr, event) => {
    arr.forEach((item) => {
      if (event.target !== item) {
        item.classList.remove('is-active');
      }
    });
  },
  checkTransparency: (elm) => {
    if (elm.dataset.transparent === 'true') {
      return true;
    }
    return false;
  },
  checkWasTransparant: (elm) => {
    if (elm.dataset.wasTransparent === 'true') {
      return true;
    }
    return false;
  },
  sticky: (elm) => {
    const getDistance = () => {
      const topDist = elm.offsetTop + 50;
      return topDist;
    };

    const stickPpoint = getDistance();

    window.onscroll = () => {
      const dist = getDistance() - window.pageYOffset;
      const offset = window.pageYOffset;

      if (dist <= 0 && !header.stuck) {
        elm.classList.add('is-sticky');
        if (!header.wrapper.classList.contains('not-transparent')) {
          header.wrapper.setAttribute('data-transparent', 'false');
          header.wrapper.setAttribute('data-was-transparent', 'false');
          if (elm.dataset.transparent) {
            elm.classList.remove('is-transparent');
            header.swapLogo(false);
          }
        }
        header.stuck = true;
      } else if (header.stuck && offset <= stickPpoint) {
        elm.classList.remove('is-sticky');
        if (!header.wrapper.classList.contains('not-transparent')) {
          header.wrapper.setAttribute('data-transparent', 'true');
          header.wrapper.setAttribute('data-was-transparent', 'false');
          if (elm.dataset.transparent) {
            elm.classList.add('is-transparent');
            header.swapLogo(true);
          }
        }
        header.stuck = false;
      }
    };
  },
  swapLogo: (bool) => {
    const logo = document.querySelector('.header__logo');
    const logoSource = logo.querySelector('source');
    const logoImg = logo.querySelector('img');
    if (!bool) {
      logoSource.setAttribute('srcset', LogoSource);
      logoImg.setAttribute('src', LogoImg);
    } else {
      logoSource.setAttribute('srcset', LogoSourceAlt);
      logoImg.setAttribute('src', LogoImgAlt);
    }
  },
  stuck: false,
  init: () => {
    if (header.wrapper) {
      header.sticky(header.wrapper);

      if (header.categories) {
        header.categories = Array.from(header.categories);
        header.categories.push(header.more);
        const menus = document.querySelectorAll('.header__category-menu');

        header.categories.forEach((category) => {
          category.addEventListener('click', (e) => {
            e.preventDefault();
            header.wrapper.focus();
            const isTransparent = header.checkTransparency(header.wrapper);
            const wasTransparent = header.checkWasTransparant(header.wrapper);
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
                  if (!header.wrapper.classList.contains('not-transparent')) {
                    if (isTransparent) {
                      header.wrapper.classList.remove('is-transparent');
                      header.swapLogo(false);
                      header.wrapper.setAttribute('data-was-transparent', 'true');
                    }
                  }
                } else {
                  header.wrapper.classList.remove('is-expanded');
                  if (!header.wrapper.classList.contains('not-transparent')) {
                    if (wasTransparent) {
                      header.wrapper.classList.add('is-transparent');
                      header.swapLogo(true);
                      header.wrapper.setAttribute('data-was-transparent', 'false');
                    }
                  }
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
        });
      }
    }

    header.tabsTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        header.tabsTriggers.forEach((anchor) => {
          anchor.classList.remove('is-active');
        });

        header.tabsContents.forEach((tab) => {
          tab.classList.remove('is-active');
        });

        trigger.classList.add('is-active');
        const target = document.querySelector(trigger.getAttribute('href'));
        target.classList.add('is-active');
      });
    });

    if (header.mobile) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw < 1200) {
        header.sticky(header.mobile);

        if (header.menuMobile && header.menuMobileTrigger) {
          header.menuMobileTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            header.menuMobile.classList.toggle('is-active');
            header.menuMobileTrigger.classList.toggle('is-active');
            header.mobile.classList.toggle('is-menu-active');
            document.body.classList.toggle('is-modal-open');
          });
        }

        if (header.searchMobile) {
          header.searchMobile.addEventListener('click', (e) => {
            e.preventDefault();
            header.overlay.classList.add('is-active');
            document.body.classList.add('is-modal-open');
          });

          header.closeOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            header.overlay.classList.remove('is-active');
            document.body.classList.remove('is-modal-open');
          });
        }
      }
    }
  },
};

export default header;
