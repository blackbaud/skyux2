/*jshint node: true*/
'use strict';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../src/app/**/*.visual-spec.js']
};
