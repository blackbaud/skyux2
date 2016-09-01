var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  entry: {
    'core': './src/core.ts'
  },
  output: {
    filename: '[name].js',
    path: 'releases'
  }
});
