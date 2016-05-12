module.exports = function (config) {
  var defaultConfig = require('./karma.conf.js'),
    customLaunchers = {
      bs_windows_ie_11: {
        base: base,
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '10'
      },
      bs_windows_edge: {
        base: base,
        browser: 'edge',
        os: 'Windows',
        os_version: '10'
      },
      bs_windows_chrome_latest: {
        base: base,
        browser: 'chrome',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_windows_firefox_latest: {
        base: base,
        browser: 'firefox',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_osx_safari_latest: {
        base: base,
        browser: 'safari',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_osx_chrome_latest: {
        base: base,
        browser: 'chrome',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_osx_firefox_latest: {
        base: base,
        browser: 'firefox',
        os: 'OS X',
        os_version: 'Yosemite'
      }
      // This is too flaky.  Since we have never seen a test fail here that passed in a desktop
      // browser we're disabling this for now.
      //,
      // bs_android_samsung_galaxy_s5_4_4: {
      //     base: base,
      //     device: 'Samsung Galaxy S5',
      //     os: 'android',
      //     os_version: '4.4'
      // }
    };
  
  config.set(defaultConfig);
  config.set({
      customLaunchers: customLaunchers,
      browsers: Object.keys(customLaunchers),
      browserDisconnectTimeout: 3e5,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 3e5,
      captureTimeout: 3e5,
      browserStack: {
          port: defaultConfig.port,
          pollingTimeout: 10000
      }
  });

};
