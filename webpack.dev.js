const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const settings = require('./buildSettings/index.js');

module.exports = merge(common, {
  output: {
    path: settings.distPath,
    publicPath: settings.publicPath,
    filename: "[name].bundle.js",
    sourceMapFilename: "[file].map",
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]"
  },
  mode: 'development',
  devServer: {
    hot: true,
    stats: { colors: true },
    contentBase: settings.distPath,
    host: settings.host,
    port: settings.port,
    historyApiFallback: true,
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
});