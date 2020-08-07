import Swiper from 'swiper';
import './sliderArticle.scss';

const sliderAricle = {
  el: document.querySelector('.slider-article'),
  slider: new Swiper(document.querySelector('.slider-article'), {
    init: false,
    autoplay: true,
    speed: 600,
    wrapperClass: 'slider-article-wrapper',
    slideClass: 'slider-article-slide',
    pagination: {
      el: '.slider-article-pagination',
      type: 'bullets',
      bulletElement: 'div',
      bulletClass: 'slider-article-pagination-bullet',
      bulletActiveClass: 'is-active',
    },
  }),
  init: () => {
    if (sliderAricle.el) {
      sliderAricle.slider.init();
    }
  },
};

export default sliderAricle;
