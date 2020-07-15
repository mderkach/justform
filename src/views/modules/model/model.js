const model = {
  pictures: document.querySelectorAll('.model__img'),
  setBg: (elm, src) => {
    const filter = document.createElement('div');
    filter.className = 'model__filter';
    filter.setAttribute('style', `background-image: url('${src}')`);
    elm.append(filter);
  },
  init: () => {
    if (model.pictures) {
      model.pictures.forEach((picture) => {
        const img = picture.querySelector('img').src;
        model.setBg(picture, img);
      });
    }
  },
};

export default model;
