/* global require, exports, process */

(function () {
  'use strict';

  var server = require('../utils/visual-server');
  var shared = require('./shared.wdio.conf.js');
  var timestamp = new Date().toString();

  shared.user = process.env.BROWSER_STACK_USERNAME;
  shared.key = process.env.BROWSER_STACK_ACCESS_KEY;
  shared.capabilities = [
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
      build: 'mac-chrome-webdriver-local-' + timestamp,
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
      //name: 'SKYUX2BROWSERSTACK',
      //'browserstack.localIdentifier': 'SKYUX2BROWSERSTACK',
      build: 'mac-firefox-webdriver-local' + timestamp,
      resolution: '1280x960'
    }
  ];
  shared.host = 'hub.browserstack.com';
  shared.port = 80;
  shared.maxInstances = 6;

  shared.visualRegression = require('../utils/visual-browser-commands')
    .getVisualRegression(
    'webdriver-screenshotslocal',
    'webdriver-screenshotslocal-screen',
    'webdriver-screenshotslocal-diffs'
  );

  shared.onPrepare = server.startCI;
  shared.onComplete = server.stopCI;

  exports.config = shared;

})();
