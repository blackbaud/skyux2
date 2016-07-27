/**
 * WebDriver configuration options shared between CI and local versions.
 */
(() => {
  'use strict';

  let timestamp;
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
    plugins: {
      webdrivercss: {
        mismatchTolerance: 0.05
      }
    },
    reporters: [
      'dot',
      'spec'
    ],
    before: () => {
      timestamp = new Date().getTime();
      const commands = require('../utils/visual-browser-commands');
      Object.keys(commands).forEach(command =>
        browser.addCommand(command, commands[command]));
    },

    after: () => {
      console.log('\n---------------------------');
      console.log('Visual Regression Completed');
      console.log('Run time: ' + (new Date().getTime() - timestamp) + 'ms');
      console.log('---------------------------');
    }
  };

})();
