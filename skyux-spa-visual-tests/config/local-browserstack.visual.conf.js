/*jshint jasmine: true, node: true */
'use strict';

const config = require('./shared.visual.conf.js');
const timestamp = new Date().toString();

require('./utils/fast-selenium.js');

config.seleniumAddress = 'http://hub-cloud.browserstack.com/wd/hub';

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
  'browserstack.debug': 'false',
  os: 'OS X',
  os_version: 'El Capitan',
  browserDisconnectTimeout: 3e5,
  browserDisconnectTolerance: 3,
  browserNoActivityTimeout: 3e5,
  captureTimeout: 3e5,
  build: `skyux2-mac-chrome-webdriver-local-${timestamp}`,
  resolution: '1280x960',
  name: 'SKYUX2BROWSERSTACKLOCAL',
  'browserstack.localIdentifier': 'SKYUX2BROWSERSTACKLOCAL',
  'acceptSslCerts': true,
  'browserstack.video': 'false'
};

config.beforeLaunch = function () {
  require('ts-node').register({ ignore: false });
  console.log('Connecting local');
  return new Promise(function (resolve, reject) {
    exports.bs_local = new browserstack.Local();
    exports.bs_local.start(
      {
        'key': process.env.BROWSER_STACK_ACCESS_KEY,
        onlyAutomate: true,
        forceLocal: true,
        force: true,
        localIdentifier: 'SKYUX2BROWSERSTACKLOCAL'
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
config.afterLaunch = () => {
  return new Promise((resolve) => {
    exports.bs_local.stop(resolve);
  });
};

exports.config = config;
