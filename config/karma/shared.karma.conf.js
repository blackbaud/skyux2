/**
* Common Karma configuration shared between local / CI testing.
*/
module.exports = function (config) {
  'use strict';

  let testWebpackConfig = require('../webpack/webpack.test');

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [{
      pattern: '../utils/spec-bundle.js',
      watched: false
    }, {
      pattern: '../utils/spec-styles.js',
      watched: false
    }],
    preprocessors: {
      '../utils/spec-styles.js': ['webpack'],
      '../utils/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    webpack: testWebpackConfig,
    coverageReporter: {
      type: 'in-memory'
    },
    // remapCoverageReporter: {
    //   'text-summary': null,
    //   json: './coverage/coverage.json',
    //   html: './coverage/html'
    // },
    webpackMiddleware: { stats: 'errors-only'},
    // webpackServer: {
    //   noInfo: true
    // },
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  });
};
