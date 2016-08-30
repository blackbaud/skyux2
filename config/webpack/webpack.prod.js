var helpers = require('../utils/helpers');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  entry: {
    'skyux': './src/core.ts'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: 'dist-prod'
  }
});
