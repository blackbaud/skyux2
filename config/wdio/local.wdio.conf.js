/* global require, exports, process */

(function () {
  'use strict';

  var server = require('../utils/visual-server');
  var config = require('./shared.wdio.conf');

  config.maxInstances = 1;
  config.capabilities = [
    {
      browserName: 'chrome',
      os: process.platform === 'win32' ? 'WIN' : 'MAC'
    }
  ];

  config.visualRegression = require('../utils/visual-browser-commands')
    .getVisualRegression(
      'webdriver-screenshotslocal',
      'webdriver-screenshotslocal-screen',
      'webdriver-screenshotslocal-diffs'
    );
  config.onPrepare = server.start;
  config.onComplete = server.stop;

  exports.config = config;
})();
