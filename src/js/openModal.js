import '../views/pages/cart.scss';

const modal = {
  window: document.querySelector('.modal'),
  init: () => {
    if (modal.window) {
      const triggers = document.querySelectorAll('a.button');
      triggers.forEach((button) => {
        if (button.getAttribute('href') !== '#') {
          button.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSelector = button.getAttribute('href');
            const target = document.querySelector(`[data-modal="${targetSelector}"]`);
            const close = target.querySelector('.modal-close');
he
            target.classList.add('is-active');
            document.body.classList.add('is-modal-open');

            close.addEventListener('click', (c) => {
              c.preventDefault();
              target.classList.remove('is-active');
              document.body.classList.remove('is-modal-open');
            });
          });
        }
      });
    }
  },
};

export default modal;
