'use strict';

var fs = require('fs-extra');

fs.ensureDirSync('/skyux-spa-viusal-tests/node_modules/@blackbaud/skyux/dist');
fs.copySync('dist', '/skyux-spa-viusal-tests/node_modules/@blackbaud/skyux/dist');
