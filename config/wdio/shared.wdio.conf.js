/**
 * WebDriver configuration options shared between CI and local versions.
 */
(() => {
  'use strict';

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
        mismatchTolerance: 0.05,
        screenWidth: [1280]
      }
    },
    reporters: [
      'dot',
      'spec'
    ],
    sync: false,
    before: () => {
      const commands = require('../utils/visual-browser-commands');
      Object.keys(commands).forEach(command =>
        browser.addCommand(command, commands[command]));
    }
  };

})();
