const Webpack = require('webpack');
const Merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BaseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = Merge(BaseWebpackConfig, {
	// DEV config
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: BaseWebpackConfig.externals.paths.dist,
		port: 8082,
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	plugins: [
		new Webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3001,
				proxy: 'http://localhost:8081/',
				notify: false,
			},
			{
				reload: false,
			},
		),
	],
});

module.exports = new Promise((resolve) => {
	resolve(devWebpackConfig);
});
