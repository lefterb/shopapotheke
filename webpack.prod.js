const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const settings = require('./buildSettings/index.js');

module.exports = merge(common, {
  output: {
    filename: '[name][chunkhash].js',
    path: settings.distPath,
    publicPath: settings.publicPath,
  },
  mode: 'production',
});