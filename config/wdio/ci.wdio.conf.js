/* global require, exports, process */

(() =>  {
  'use strict';

  const server = require('../utils/visual-server');
  let config = require('./shared.wdio.conf');

  config.user = process.env.BROWSER_STACK_USERNAME;
  config.key = process.env.BROWSER_STACK_ACCESS_KEY;
  config.capabilities = [
    {
      browserName: 'chrome',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      os: 'OS X',
      os_version: 'Yosemite',
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 3e5,
      captureTimeout: 3e5,
      build: 'mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
    },
    {
      browserName: 'firefox',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      os: 'OS X',
      os_version: 'Yosemite',
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 3e5,
      captureTimeout: 3e5,
      build: 'mac-firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
    }
  ];
  config.host = 'hub-cloud-us.browserstack.com';
  config.port = 80;
  config.plugins.webdrivercss.screenshotRoot = 'webdriver-screenshots';
  config.plugins.webdrivercss.failedComparisonsRoot = 'webdriver-screenshots-diffs';
  config.onPrepare = server.startCI;

  exports.config = config;

})();
