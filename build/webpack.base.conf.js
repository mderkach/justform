const Path = require('path');
const Fs = require('fs');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: Path.join(__dirname, '../src'),
  build: Path.join(__dirname, '../build'),
  dist: Path.join(__dirname, '../dist'),
  assets: 'assets/',
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/views/pages/`;
const PAGES = Fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

//entrypoints
const mainEntry = {
  app: `${PATHS.src}/main.js`
};

const dynamicEntry = glob
  .sync(`${PAGES_DIR}*.js`).reduce((acc, path) => {
    const pathname = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
    const entry = pathname;
    acc[entry] = path;
    return acc
  }, {});

const entryPoints = Object.assign(mainEntry, dynamicEntry);

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: entryPoints,
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'webpack-import-glob-loader',
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          outputPath: `${PATHS.assets}`,
          publicPath: './',
        },
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: `${PATHS.assets}img/svg/`,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },

          'svg-transform-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // {
      //   enforce: 'pre',
      //   test: /\.(sa|sc|c)ss$/,
      //   loader: 'webpack-import-glob-loader',
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `${PATHS.build}/postcss.config.js` },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `${PATHS.build}/postcss.config.js` },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendorJs: {
          name: 'vendor-js',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
        vendorStyles: {
          name: 'app',
          test: /src[\\/]scss/,
          chunks: 'all',
          enforce: true,
        },
        pages: {
          name(module, chunks) {
            const allChunksNames = chunks.map((item) => item.name).join('');
            const output = allChunksNames;
            return output;
          },
          test(module, chunks) {
            const path = require('path');
            const output =
              module.resource &&
              module.resource.endsWith('.js') &&
              module.resource.includes(`${path.sep}pages${path.sep}`);
            return output;
          },
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': PATHS.src,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => `${PATHS.assets}css/${name.replace('/js/', '/css/')}.css`,
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
        { from: `${PATHS.src}/${PATHS.assets}css`, to: `${PATHS.assets}css` },
        { from: `${PATHS.src}/static`, to: '' },
      ],
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
          chunks: ['app', `${page.replace(/\.pug/, '')}`],
        }),
    ),
  ],
};
