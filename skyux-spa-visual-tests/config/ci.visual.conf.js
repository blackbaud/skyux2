/*jshint jasmine: true, node: true */
'use strict';

const browserstack = require('browserstack-local');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const PixDiff = require('pix-diff');
const config = require('./shared.visual.conf.js');
const { getVisualTestConfig } = require('./utils/visual-test-config');

require('./utils/fast-selenium.js');

config.seleniumAddress = 'http://hub-cloud.browserstack.com/wd/hub';

config.onPrepare = function () {
  jasmine.getEnv().addReporter(new SpecReporter());

  browser.params.chunks = JSON.parse(browser.params.chunks);
  browser.params.skyPagesConfig = JSON.parse(browser.params.skyPagesConfig);
  browser.skyVisualTestConfig = getVisualTestConfig();
  browser.pixDiff = new PixDiff(browser.skyVisualTestConfig);
};

config.capabilities = {
  'browserName': 'chrome',
  'chromeOptions': {
    'args': [
      '--disable-extensions',
      '--ignore-certificate-errors'
    ]
  },
  'browserstack.user': process.env.BROWSER_STACK_USERNAME,
  'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,
  browser_version: '57',
  'browserstack.local': 'true',
  'browserstack.debug': 'true',
  os: 'OS X',
  os_version: 'El Capitan',
  browserDisconnectTimeout: 3e5,
  browserDisconnectTolerance: 3,
  browserNoActivityTimeout: 3e5,
  captureTimeout: 3e5,
  build: `skyux2-mac-chrome-webdriver-${process.env.TRAVIS_BUILD_NUMBER}`,
  resolution: '1280x960',
  name: 'SKYUX2BROWSERSTACKCI',
  'browserstack.localIdentifier': 'SKYUX2BROWSERSTACKCI',
  'acceptSslCerts': true
};

config.beforeLaunch = function () {
  console.log('Connecting local...');

  require('ts-node').register({ ignore: false });

  return new Promise((resolve, reject) => {
    exports.bs_local = new browserstack.Local();
    exports.bs_local.start(
      {
        'key': process.env.BROWSER_STACK_ACCESS_KEY,
        onlyAutomate: true,
        forceLocal: true,
        force: true,
        localIdentifier: 'SKYUX2BROWSERSTACKCI'
      }, function (error) {
        if (error) {
          return reject(error);
        }

        console.log('Connected. Now testing...');
        resolve();
      });
  });
};

// Code to stop browserstack local after end of test
config.afterLaunch = function () {
  return new Promise((resolve) => {
    exports.bs_local.stop(resolve);
  });
};

exports.config = config;
