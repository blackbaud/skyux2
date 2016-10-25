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
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 200000,
    },
    waitforTimeout: 3000,
    services: [
      'visual-regression'
    ],
    reporters: [
      'dot',
      'spec'
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
        return commands.setupTest(this, url, screenWidth);
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

    after: function () {
      console.log('\n---------------------------');
      console.log('Visual Regression Completed');
      console.log('Run time: ' + (new Date().getTime() - timestamp) + 'ms');
      console.log('---------------------------');
    },

    sync: false
  };

})();
