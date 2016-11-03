/* global require, exports, process */

(function () {
  'use strict';

  var server = require('../utils/visual-server');
  var shared = require('./shared.wdio.conf.js');

  shared.user = process.env.BROWSER_STACK_USERNAME;
  shared.key = process.env.BROWSER_STACK_ACCESS_KEY;
  shared.capabilities = [
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
      build: 'mac-chrome-webdriver-local',
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
      build: 'mac-firefox-webdriver-local',
      resolution: '1280x960'
    }
  ];
  shared.host = 'hub-cloud.browserstack.com';
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
