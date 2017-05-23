/**
 * WebDriver configuration options shared between CI and local versions.
 */

(function () {
  'use strict';

  var timestamp;
  module.exports = {
    specs: [
      'src/modules/**/*.visual-spec.js'
    ],
    logLevel: 'error',
    coloredLogs: true,
    baseUrl: 'http://localhost:3000',
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 200000,
      // expectationResultHandler: function (passed, assertion) {
      //   if (passed) {
      //     return;
      //   }

      //   console.log('jasmine expectationResultHandler', assertion);
      // }
    },
    sync: false,
    waitforTimeout: 10000,
    services: [
      'visual-regression'
    ],

    before: function () {
      console.log('config.before');

      timestamp = new Date().getTime();

      var commands = require('../utils/visual-browser-commands');

      browser.addCommand('setupTest', function async(url, screenWidth) {
        return commands.setupTest(this, url, screenWidth || 1280);
      });

      browser.addCommand('compareScreenshot', function async(options) {
        return commands.compareScreenshot(this, options);
      });

      browser.addCommand('moveCursorOffScreen', function async() {
        return commands.moveCursorOffScreen(this);
      });

      browser.addCommand('focusElement', function async(selector) {
        return commands.focusElement(this, selector);
      });
    }
  };
})();
