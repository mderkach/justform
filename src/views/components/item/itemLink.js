import './itemLink.scss';
import './item.scss';

const itemLink = {
  items: document.querySelectorAll('.itemLink'),
  init: () => {
    if (itemLink.items) {
      itemLink.items.forEach((item) => {
        const submenu = item.querySelector('.item__submenu');
        if (submenu) {
          const childs = submenu.querySelectorAll('a');
          const hiddenMenu = submenu.querySelector('.item__submenu-hidden');
          childs.forEach((link) => {
            if (link.classList.contains('item__submenu-hidden-trigger')) {
              link.addEventListener('click', (e) => {
                e.preventDefault();
                hiddenMenu.classList.toggle('is-active');
              });
            }
          });
        }
      });
    }
  },
};

export default itemLink;
