/* global require, exports, process */

(() => {
  'use strict';

  const server = require('../utils/visual-server');
  let config = require('./shared.wdio.conf');

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
    'webdriver-screenshotslocal-diffs');
  config.onPrepare = server.start;
  config.onComplete = server.stop;

  config.maxInstances = 1;

  exports.config = config;
})();
