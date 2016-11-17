/* global require, exports, process */

(function ()  {
  'use strict';

  var server = require('../utils/visual-server');
  var config = require('./shared.wdio.conf');

  config.user = process.env.BROWSER_STACK_USERNAME;
  config.key = process.env.BROWSER_STACK_ACCESS_KEY;
  config.capabilities = [
    {
      browserName: 'chrome',
      browser_version: '53',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      os: 'OS X',
      os_version: 'Yosemite',
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 3e5,
      captureTimeout: 3e5,
      build: 'mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
      //name: 'SKYUX2BROWSERSTACK',
      //'browserstack.localIdentifier': 'SKYUX2BROWSERSTACK',
      resolution: '1280x960'
    },
    {
      browserName: 'firefox',
      browser_version: '47',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      os: 'OS X',
      os_version: 'Yosemite',
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 3e5,
      captureTimeout: 3e5,
      build: 'mac-firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
      //name: 'SKYUX2BROWSERSTACK',
      //'browserstack.localIdentifier': 'SKYUX2BROWSERSTACK',
      resolution: '1280x960'
    }
  ];
  config.host = 'hub.browserstack.com';
  config.port = 80;

  config.maxInstances = 6;

  config.visualRegression = require('../utils/visual-browser-commands')
    .getVisualRegression(
      'webdriver-screenshots',
      'webdriver-screenshots-screen',
      'webdriver-screenshots-diffs');

  config.onPrepare = server.startCI;
  config.onComplete = server.stopCI;

  exports.config = config;

})();
