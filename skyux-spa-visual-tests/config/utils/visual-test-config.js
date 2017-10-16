/*jshint jasmine: true, node: true */
/* global browser */
'use strict';

const getVisualTestConfig = (suffix) => {
  const config = {
    basePath: 'screenshots-baseline',
    diffPath: 'screenshots-diff',
    createdPath: 'screenshots-created',
    createdPathDiff: 'screenshots-created-diff',
    baseline: true,
    width: 1000,
    height: 800
  };

  if (suffix) {
    config.basePath += `-${suffix}`;
    config.diffPath += `-${suffix}`;
    config.createdPath += `-${suffix}`;
    config.createdPathDiff += `-${suffix}`;
  }

  return config;
};

module.exports = {
  getVisualTestConfig
};
