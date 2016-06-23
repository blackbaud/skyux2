/* global require, exports, process */

(() => {
  'use strict';

  let config = require('./shared.wdio.conf');

  config.capabilities = [
    {
      browserName: 'chrome',
      os: process.platform === 'win32' ? 'WIN' : 'MAC'
    }
  ];

  config.plugins.webdrivercss.screenshotRoot = 'webdriver-screenshotslocal';
  config.plugins.webdrivercss.failedComparisonsRoot = 'webdriver-screenshotslocal-diffs';

  exports.config = config;
})();
