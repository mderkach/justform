import sliderModel from '../../components/slider/sliderModel';

const model = {
  pictures: document.querySelectorAll('.model__img'),
  overlay: document.querySelector('.model__overlay'),
  closeOverlay: document.querySelector('.model__overlay-close'),
  setBg: (elm, src) => {
    const filter = document.createElement('div');
    filter.className = 'model__filter';
    filter.setAttribute('style', `background-image: url('${src}')`);
    elm.append(filter);
  },
  createSlide: (srcs) => {
    srcs.forEach((src) => {
      const picname = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
      const slide = `
      <div class="slider-model-slide">
        <picture class="slider-model-img">
          <source srcset=${src} />
          <img src="./assets/img/${picname}.webp" alt=""/>
        </picture>
      </div>
    `;
      sliderModel.slider.appendSlide(slide);
    });
  },
  init: () => {
    if (model.pictures) {
      const imgArray = [];
      model.pictures.forEach((picture, index) => {
        const img = picture.querySelector('img').src;
        model.setBg(picture, img);

        imgArray.push(img);
        sliderModel.slides = imgArray;

        picture.addEventListener('click', () => {
          model.overlay.classList.add('is-active');
          document.body.classList.add('is-modal-open');
          model.createSlide(imgArray);
          sliderModel.init();
          sliderModel.slider.slideToLoop(index);
        });
      });

      model.closeOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        sliderModel.slider.destroy();
        model.overlay.classList.remove('is-active');
        document.body.classList.remove('is-modal-open');
      });
    }
  },
};

export default model;
