/* global require, exports, process */

(function () {
  'use strict';

  var server = require('../utils/visual-server');
  var config = require('./shared.wdio.conf.js');

  config.user = process.env.BROWSER_STACK_USERNAME;
  config.key = process.env.BROWSER_STACK_ACCESS_KEY;
  config.capabilities = [
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
      build: 'skyux2-mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
      resolution: '1280x960',
      name: 'SKYUX2BROWSERSTACKCI',
      'browserstack.localIdentifier': 'SKYUX2BROWSERSTACKCI'
    }
  ];
  config.host = 'hub.browserstack.com';
  config.port = 80;
  config.maxInstances = 1;
  bail: 1,

  config.visualRegression = require('../utils/visual-browser-commands')
    .getVisualRegression(
      'webdriver-screenshots',
      'webdriver-screenshots-screen',
      'webdriver-screenshots-diffs'
    );

  config.onPrepare = server.startCI;
  config.onComplete = server.stopCI;

  config.beforeSession = function (config, capabilities, specs) {
    log('beforeSession');
  };

  config.before = function (capabilities, specs) {
    log('before');
  };

  config.beforeSuite = function (suite) {
    log('beforeSuite');
  };

  config.beforeHook = function () {
    log('beforeHook');
  };

  config.afterHook = function () {
    log('afterHook');
  };

  config.beforeTest = function (test) {
    log('beforeTest');
  };

  config.beforeCommand = function (commandName, args) {
    log('beforeCommand');
  };

  config.afterCommand = function (commandName, args, result, error) {
    log('afterCommand');
  };

  config.afterTest = function (test) {
    log('afterTest');
  };

  config.afterSuite = function (suite) {
    log('afterSuite');
  };

  config.after = function (result, capabilities, specs) {
    log('after');
  };

  config.afterSession = function (config, capabilities, specs) {
    log('afterSession');
  };

  exports.config = config;
})();
