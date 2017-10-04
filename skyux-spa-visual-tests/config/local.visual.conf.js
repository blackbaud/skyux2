/*jshint jasmine: true, node: true */
/* global browser */
'use strict';

let builderUtils =  require('@blackbaud/skyux-builder/utils/host-utils');

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var config = require('./shared.visual.conf.js');
config.onPrepare = function () {
  jasmine.getEnv().addReporter(new SpecReporter());
  const PixDiff = require('pix-diff');
  browser.pixDiff = new PixDiff(
    {
      basePath: 'screenshots-baseline-local/',
      diffPath: 'screenshots-diff-local/',
      baseline: true,
      width: 1000,
      height: 800
    }
  );

  browser.skyVisualTestOptions = {
    createdPath: 'screenshots-created-local/',
    createdPathDiff: 'screenshots-created-diff-local/'
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
    'args': ['--ignore-certificate-errors']
  }
};

config.directConnect = true;

exports.config = config;
