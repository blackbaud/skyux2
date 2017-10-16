/*jshint jasmine: true, node: true */
'use strict';

const config = require('./shared.visual.conf.js');

config.capabilities = {
  'browserName': 'chrome',
  'chromeOptions': {
    'args': [
      '--disable-extensions',
      '--ignore-certificate-errors'
    ]
  }
};

config.directConnect = true;

exports.config = config;
