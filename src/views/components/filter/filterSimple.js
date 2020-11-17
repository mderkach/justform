import './filterSimple.scss';
import filter from "./filter";

const filterSimple = {
  wrapper: document.querySelectorAll('.filter-simple-wrapper'),
  init: (selectedCallback = null, id = null) => {
    if (filterSimple.wrapper) {
      filterSimple.wrapper.forEach((filter) => {
        let simpleFilterValueSelector = '.filter-simple-value'
        let simpleFilterLabelSelector = '.filter-simple-label'

        const trigger = filter.querySelector(simpleFilterValueSelector);
        const items = filter.querySelectorAll(simpleFilterLabelSelector);
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
                //TODO: move selectedCallback
                window.location.href = radio.getAttribute('data-href');
              }else if(selectedCallback != null){
                selectedCallback(radio);
              }
            });
          });
        }
      });
    }
  },
  reinit(selectedCallback = null, id = null){
    filterSimple.wrapper = document.querySelectorAll('.filter-simple-wrapper');
    filterSimple.init(selectedCallback, id)
  }
};

export default filterSimple;
