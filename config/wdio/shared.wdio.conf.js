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
    logLevel: 'silent',
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 200000,
      expectationResultHandler: function () {

      }
    },
    waitforTimeout: 3000,
    services: [
      'visual-regression'
    ],

    before: function () {
      timestamp = new Date().getTime();
      var commands = require('../utils/visual-browser-commands');
      /*Object.keys(commands).forEach(function (command) {
        browser.addCommand(command, function async() {
          var args = Array.from(arguments);
          args.unshift(this);
          commands[command].apply(this, args);
        });
      });*/
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

    },

    beforeTest: function () {

    },

    after: function () {

    },

    sync: false
  };

})();
