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

  config.plugins.webdrivercss.screenshotRoot = 'webdriver-screenshotslocal';
  config.plugins.webdrivercss.failedComparisonsRoot = 'webdriver-screenshotslocal-diffs';
  config.onPrepare = server.start;
  config.onComplete = server.stop;

  exports.config = config;
})();
