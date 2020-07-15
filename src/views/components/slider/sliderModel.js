import Swiper from 'swiper';

const sliderModel = {
  slider: new Swiper(document.querySelector('.slider-model'), {
    init: false,
    autoplay: true,
    speed: 600,
    wrapperClass: 'slider-model-wrapper',
    slideClass: 'slider-model-slide',
    pagination: {
      el: '.slider-model-pagination',
      type: 'bullets',
      bulletElement: 'div',
      bulletClass: 'slider-model-pagination-bullet',
      bulletActiveClass: 'is-active',
    },
  }),
  init: () => {
    sliderModel.slider.init();
  },
};

export default sliderModel;
