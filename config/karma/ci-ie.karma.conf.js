module.exports = function (config) {
  'use strict';

  require('./ci.karma.conf')(config);

  const customLaunchers = {
    bs_windows_ie_11: {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '11.0',
      os: 'Windows',
      os_version: '10'
    }
  };

  config.set({
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    logLevel: config.LOG_ERROR,
    coverageReporter: {},
    browserConsoleLogOptions: {
      level: 'error',
      terminal: true
    },
    reporters: ['mocha']
  });
};
