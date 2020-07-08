const filterSimple = {
  wrapper: document.querySelectorAll('.filter-simple-wrapper'),
  init: () => {
    if (filterSimple.wrapper) {
      filterSimple.wrapper.forEach((filter) => {
        const trigger = filter.querySelector('.filter-simple-value');

        const items = filter.querySelectorAll('.filter-simple-label');
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          trigger.parentElement.classList.toggle('is-active');
        });

        items.forEach((item) => {
          item.addEventListener('click', () => {
            const input = item.querySelector('input');
            const text = input.value;
            trigger.textContent = text;
            trigger.parentElement.classList.remove('is-active');
          });
        });
      });
    }
  },
};

export default filterSimple;
