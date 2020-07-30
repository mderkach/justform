// autoprefixer - https://github.com/postcss/autoprefixer
// css-mqpacker - https://github.com/hail2u/node-css-mqpacker
// cssnano      - https://github.com/hail2u/node-css-mqpacker

// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev

const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const moveProps = require('postcss-move-props-to-bg-image-query');

module.exports = {
  plugins: [
    moveProps(),
    autoprefixer,
    mqpacker,
    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    })
  ],
};
