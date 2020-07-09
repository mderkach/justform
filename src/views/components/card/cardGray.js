const cardGray = {
  search: document.querySelector('.card__gray_search'),
  setHeight: () => {
    const targetHeight = cardGray.search.previousElementSibling.querySelector('img');
    const num = targetHeight.getBoundingClientRect().height;
    cardGray.search.setAttribute('style', `height: ${num}px`);
  },
  init: () => {
    if (cardGray.search) {
      window.addEventListener('resize', () => {
        cardGray.setHeight();
      });

      window.onload = function () {
        cardGray.setHeight();
      };
    }
  },
};

export default cardGray;
