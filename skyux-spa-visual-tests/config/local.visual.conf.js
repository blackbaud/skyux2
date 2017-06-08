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
      basePath: 'screenshots-baseline-local/',
      diffPath: 'screenshots-diff-local/',
      baseline: true,
      width: 1000,
      height: 600
    }
  );

  browser.skyVisualTestOptions = {
    createdPath: 'screenshots-created-local/',
    createdPathDiff: 'screenshots-created-diff-local'
  };
};

config.capabilities =  {
  'browserName': 'chrome',
  'chromeOptions': {
    'args': ['--disable-extensions --ignore-certificate-errors']
  }
};

exports.config = config;

