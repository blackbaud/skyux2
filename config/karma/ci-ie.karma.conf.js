module.exports = function (config) {
  'use strict';

  const webpackConfig = require('../webpack/webpack.test');

  // Remove instrument loader because it causes problems in IE 11:
  webpackConfig.module.rules.pop();

  const customLaunchers = {
    bs_windows_ie_11: {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '11.0',
      os: 'Windows',
      os_version: '10'
    }
  };

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
      '../utils/spec-bundle.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    reporters: ['mocha'],
    port: 9876,
    colors: false,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browserDisconnectTimeout: 3e5,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 3e5,
    captureTimeout: 3e5,
    browserStack: {
      port: 9876,
      pollingTimeout: 10000
    }
  });
};
