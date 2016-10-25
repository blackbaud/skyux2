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
      Object.keys(commands).forEach(function (command) {
        browser.addCommand(command, function async() {
          arguments.unshift(this);
          commands[command].apply(this, arguments);
        });
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
