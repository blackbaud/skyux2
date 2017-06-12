/*jshint jasmine: true, node: true */
/* global browser */
'use strict';

let builderUtils =  require('@blackbaud/skyux-builder/utils/host-utils');

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var config = require('./shared.visual.conf.js');

var browserstack = require('browserstack-local');

config.onPrepare = function () {
  jasmine.getEnv().addReporter(new SpecReporter());
  const PixDiff = require('pix-diff');
  browser.pixDiff = new PixDiff(
    {
      basePath: 'screenshots-baseline/',
      diffPath: 'screenshots-diff/',
      baseline: true,
      width: 1000,
      height: 800
    }
  );

  browser.skyVisualTestOptions = {
    createdPath: 'screenshots-created/',
    createdPathDiff: 'screenshots-created-diff/'
  };

  var destination = builderUtils.resolve(
    '/',
    browser.params.localUrl,
    JSON.parse(browser.params.chunks),
    JSON.parse(browser.params.skyPagesConfig)
  );

  return browser.get(destination);
};

config.capabilities =  {
  'browserName': 'chrome',
  'chromeOptions': {
    'args': ['--disable-extensions --ignore-certificate-errors']
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
  build: 'skyux2-mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
  resolution: '1280x960',
  name: 'SKYUX2BROWSERSTACKCI',
  'browserstack.localIdentifier': 'SKYUX2BROWSERSTACKCI',
  'acceptSslCerts': true
};

config.seleniumAddress = 'http://hub-cloud.browserstack.com/wd/hub';

config.beforeLaunch = function () {
  require('ts-node').register({ ignore: false });
  console.log('Connecting local');
  return new Promise(function (resolve, reject){
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
  return new Promise(function (resolve) {
    exports.bs_local.stop(resolve);
  });
};

exports.config = config;
