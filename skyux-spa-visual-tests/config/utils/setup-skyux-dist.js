/*jslint node: true */
'use strict';

var fs = require('fs-extra');
const path = require('path');

fs.ensureDirSync(path.resolve(__dirname, '../../node_modules/@blackbaud/skyux/dist'));
fs.copySync(
  path.resolve(__dirname, '../../../dist'),
  path.resolve(__dirname, '../../node_modules/@blackbaud/skyux/dist'));
