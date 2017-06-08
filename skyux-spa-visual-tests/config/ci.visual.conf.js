/*jshint jasmine: true, node: true */
/* global browser */
'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var config = require('./shared.visual.conf.js');
config.onPrepare = function () {
  jasmine.getEnv().addReporter(new SpecReporter());
  const PixDiff = require('pix-diff');
  browser.pixDiff = new PixDiff(
    {
      basePath: 'screenshots-baseline/',
      diffPath: 'screenshots-diff/',
      baseline: true,
      width: 1000,
      height: 600
    }
  );

  browser.skyVisualTestOptions = {
    createdPath: 'screenshots-created/',
    createdPathDiff: 'screenshots-created-diff/'
  };
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

exports.config = config;
