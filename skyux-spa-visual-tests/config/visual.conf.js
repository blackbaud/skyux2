/*jshint jasmine: true, node: true */
/* global browser */
'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({ ignore: false });
  },

  onPrepare: function () {
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
  },

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--disable-extensions --ignore-certificate-errors']
    }
  },
  directConnect: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  allScriptsTimeout: 11000,
  specs: ['../src/app/**/*.visual-spec.ts']
};
