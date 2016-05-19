/**
 * @author: @AngularClass
 */

module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js'),
    customLaunchers = {
      bs_windows_ie_11: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '10'
      },
      bs_windows_edge: {
        base: 'BrowserStack',
        browser: 'edge',
        os: 'Windows',
        os_version: '10'
      },
      bs_windows_chrome_latest: {
        base: 'BrowserStack',
        browser: 'chrome',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_windows_firefox_latest: {
        base: 'BrowserStack',
        browser: 'firefox',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_osx_safari_latest: {
        base: 'BrowserStack',
        browser: 'safari',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_osx_chrome_latest: {
        base: 'BrowserStack',
        browser: 'chrome',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_osx_firefox_latest: {
        base: 'BrowserStack',
        browser: 'firefox',
        os: 'OS X',
        os_version: 'Yosemite'
      }
      // This is too flaky.  Since we have never seen a test fail here that passed in a desktop
      // browser we're disabling this for now.
      //,
      // bs_android_samsung_galaxy_s5_4_4: {
      //     base: 'BrowserStack',
      //     device: 'Samsung Galaxy S5',
      //     os: 'android',
      //     os_version: '4.4'
      // }
    };

  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [{
      pattern: './spec-bundle.js',
      watched: false
    }],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'json'
      }, {
        type: 'html'
      }]
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: {
      noInfo: true
    },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
     * config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: Object.keys(customLaunchers),

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true,

    /*
     * Specific CI settings
     */
    customLaunchers: customLaunchers,
    browserDisconnectTimeout: 3e5,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 3e5,
    captureTimeout: 3e5,
    browserStack: {
      port: 9876,
      pollingTimeout: 10000
    }
  });

};
