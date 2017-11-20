/*jshint jasmine: true, node: true */
'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const PixDiff = require('pix-diff');
const { getVisualTestConfig } = require('./utils/visual-test-config');

module.exports = {
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter());

    browser.params.chunks = JSON.parse(browser.params.chunks);
    browser.params.skyPagesConfig = JSON.parse(browser.params.skyPagesConfig);
    browser.skyVisualTestConfig = getVisualTestConfig('local');
    browser.pixDiff = new PixDiff(browser.skyVisualTestConfig);
  },
  beforeLaunch: function () {
    require('ts-node').register({ ignore: false });
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000
  },
  allScriptsTimeout: 30000,
  specs: ['../src/app/**/*.visual-spec.ts']
};
