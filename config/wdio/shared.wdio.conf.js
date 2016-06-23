/**
 * WebDriver configuration options shared between CI and local versions.
 */
(() => {
  'use strict';

  const server = require('../utils/visual-server');
  const utils = require('../utils/visual-utils');

  module.exports = {
    specs: [
        'src/modules/**/*.visual-spec.ts'
    ],
    baseUrl: 'http://localhost:3000/',
    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 200000,
    },
    waitforTimeout: 3000,
    compare: utils.compare,
    moveCursorOffScreen: utils.moveCursorOffScreen,
    plugins: {
      webdrivercss: {
        mismatchTolerance: 0.05,
        screenWidth: [1280]
      }
    },
    onPrepare: server.start,
    onComplete: server.stop
  };

})();
