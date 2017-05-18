/* global require, exports, process */

(function () {
  'use strict';

  var server = require('../utils/visual-server');
  var shared = require('./shared.wdio.conf.js');
  var timestamp = new Date().toString();

  shared.services.push('browserstack');
  shared.browserstackLocal = true;

  shared.browserstackOpts = {
    force: true,
    forceLocal: true,
    localIdentifier: 'SKYUX2BROWSERSTACKCI',
    parallelRuns: 10
  };

  console.log('in config file');
  shared.user = process.env.BROWSER_STACK_USERNAME;
  shared.key = process.env.BROWSER_STACK_ACCESS_KEY;
  shared.capabilities = [
    {
      browserName: 'chrome',
      browser_version: '57',
      'browserstack.local': 'true',
      'browserstack.debug': 'true',
      os: 'OS X',
      os_version: 'El Capitan',
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 3e5,
      captureTimeout: 3e5,
      build: 'skyux2-mac-chrome-webdriver-local-' + timestamp,
      resolution: '1280x960',
      name: 'SKYUX2BROWSERSTACKCI',
      'browserstack.localIdentifier': 'SKYUX2BROWSERSTACKCI'
    },
    // {
    //   browserName: 'firefox',
    //   browser_version: '49',
    //   'browserstack.selenium_version': '3.2.0',
    //   'browserstack.local': 'true',
    //   'browserstack.debug': 'true',
    //   os: 'OS X',
    //   os_version: 'El Capitan',
    //   browserDisconnectTimeout: 3e5,
    //   browserDisconnectTolerance: 3,
    //   browserNoActivityTimeout: 3e5,
    //   captureTimeout: 3e5,
    //   build: 'skyux2-mac-firefox-webdriver-local' + timestamp,
    //   resolution: '1280x960',
    //   name: 'SKYUX2BROWSERSTACKCI',
    //   'browserstack.localIdentifier': 'SKYUX2BROWSERSTACKCI',
    // }
  ];
  shared.host = 'hub.browserstack.com';
  shared.port = 80;
  shared.maxInstances = 4;

  shared.visualRegression = require('../utils/visual-browser-commands')
    .getVisualRegression(
    'webdriver-screenshotslocal',
    'webdriver-screenshotslocal-screen',
    'webdriver-screenshotslocal-diffs'
  );

  shared.onPrepare = server.startCI;
  shared.onComplete = server.stopCI;

  shared.beforeSession = function () {
    console.log('before session');
  };

  shared.beforeHook = function () {
    console.log('before hook');
  };

  shared.beforeTest = function () {
    console.log('before test');
  };

  shared.beforeCommand = function (commandName) {
    console.log('before command', commandName);
  };

  shared.afterCommand = function (commandName, args, result, error) {
    console.log('after command');
    console.log('command error', error);
  };

  exports.config = shared;

})();
