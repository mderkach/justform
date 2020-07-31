const modal = {
  window: document.querySelector('.modal'),
  init: () => {
    if (modal.window) {
      const triggers = document.querySelectorAll('a.button');
      triggers.forEach((button) => {
        if (button.getAttribute('href') !== '#') {
          const targetSelector = button.getAttribute('href');
          const target = document.querySelector(`[data-modal="${targetSelector}"]`);
          const close = target.querySelector('.modal-close');

          button.addEventListener('click', (e) => {
            e.preventDefault();

            target.classList.add('is-active');
            document.body.classList.add('is-modal-open');
          });

          close.addEventListener('click', (e) => {
            e.preventDefault();
            target.classList.remove('is-active');
            document.body.classList.remove('is-modal-open');
          });
        }
      });
    }
  },
};

export default modal;
