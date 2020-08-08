import ymaps from 'ymaps';
import './footer.scss';

const mapFooter = {
  element: document.querySelector('.footer__map'),
  init: () => {
    if (mapFooter.element) {
      ymaps
        .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
        .then((maps) => {
          const map = new maps.Map('map', {
            center: [55.722441069010266, 37.65466349999998],
            controls: [],
            zoom: 17,
          });
          const pin = new maps.Placemark(
            map.getCenter(),
            {},
            {
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref: 'assets/img/pin.png',
              // Размеры метки.
              iconImageSize: [39, 46],
            },
          );
          if (pin && map) {
            map.geoObjects.add(pin);
          }
        })
        .catch((error) => console.log('Failed to load Yandex Maps', error));
    }
  },
};

export default mapFooter;
