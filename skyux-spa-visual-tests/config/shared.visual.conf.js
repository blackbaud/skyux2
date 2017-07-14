/*jshint jasmine: true, node: true */
'use strict';

module.exports = {
  useAllAngular2AppRoots: true,
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
