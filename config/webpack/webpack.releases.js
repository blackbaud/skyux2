'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const PrepareFallback = function () {
  const formatName = 'SKYUX_READY_%s  ';
  const formatDeclare = '%s\nvar %s = true;\n';
  const metadata = {};

  // Add variable + order to file + metadata
  this.plugin('emit', (compilation, done) => {
    Object.keys(compilation.assets).forEach((key, index) => {
      const asset = compilation.assets[key];
      const source = asset.source();
      const name = path.parse(key).name.toUpperCase();
      const ready = util.format(formatName, name);
      asset.source = () => util.format(formatDeclare, source, ready);
      metadata[key] = {
        ready: ready,
        order: index
      };
    });
    done();
  });

  // Writes our metadata file
  this.plugin('done', (stats) => {
    const file = path.resolve(__dirname, '..', '..', 'releases', 'metadata.json');
    fs.writeFileSync(file, JSON.stringify(metadata));
  });
};

module.exports = webpackMerge(commonConfig, {
  entry: {
    'core': './src/core.ts'
  },
  output: {
    filename: '[name].js',
    path: 'releases'
  },
  plugins: [
    PrepareFallback,
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: { screw_ie8: true, keep_fnames: true }
    })
  ]
});
