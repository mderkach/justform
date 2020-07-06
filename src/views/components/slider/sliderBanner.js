import Swiper from 'swiper';

const sliderBanner = {
  element: document.querySelector('.slider-banner'),
  init: () => {
    // eslint-disable-next-line no-unused-vars
    const slider = new Swiper(sliderBanner.element, {
      autoplay: true,
      speed: 600,
      loop: true,
      preventClicks: true,
      wrapperClass: 'slider-banner-wrapper',
      slideClass: 'slider-banner-slide',
      pagination: {
        el: '.slider-banner-pagination',
        type: 'bullets',
        bulletElement: 'div',
        bulletClass: 'slider-banner-pagination-bullet',
        bulletActiveClass: 'is-active',
      },
    });
  },
};

export default sliderBanner;
