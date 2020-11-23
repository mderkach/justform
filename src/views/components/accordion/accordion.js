import './accordion.scss';

const accordion = {
  items: document.querySelectorAll('.accordion-wrapper'),
  init: () => {
    if (accordion.items) {
      accordion.items.forEach((item) => {
        const header = item.querySelector('.accordion__header');
        if(header) {
          header.addEventListener('click', (e) => {
            e.preventDefault();
            if (header.parentElement.classList.contains('is-active')) {
              header.parentElement.classList.remove('is-active');
            } else {
              header.parentElement.classList.add('is-active');
            }
          });
        }
      });
    }
  },
};

export default accordion;
