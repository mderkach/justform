import './filterSimple.scss';

const filterSimple = {
  wrapper: document.querySelectorAll('.filter-simple-wrapper'),
  init: () => {
    if (filterSimple.wrapper) {
      filterSimple.wrapper.forEach((filter) => {
        const trigger = filter.querySelector('.filter-simple-value');
        const items = filter.querySelectorAll('.filter-simple-label');
        if (trigger) {
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            trigger.parentElement.classList.toggle('is-active');
          });

          items.forEach((item) => {
            const radio = item.querySelector('input');

            if (radio.hasAttribute('checked')) {
              trigger.textContent = radio.value;
            }

            if (radio.hasAttribute('disabled')) {
              radio.parentElement.style.display = 'none';
              trigger.classList.add('is-placeholder');
            }

            item.addEventListener('click', () => {
              const input = item.querySelector('input');
              const text = input.value;
              const disabled = input.hasAttribute('disabled');

              trigger.textContent = text;

              if (!disabled) {
                trigger.classList.remove('is-placeholder');
              }

              trigger.parentElement.classList.remove('is-active');
              if (radio.hasAttribute('data-href')) {
                window.location.href = radio.getAttribute('data-href');
              }
            });
          });
        }
      });
    }
  },
};

export default filterSimple;
