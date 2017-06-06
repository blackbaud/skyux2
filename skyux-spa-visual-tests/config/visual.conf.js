/*jshint jasmine: true, node: true */
'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({ ignore: false });
  },

  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter());
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
