const fs = require('fs-extra');
const path = require('path');

fs.copySync(
  path.resolve(__dirname, '../../postinstall.js'),
  path.resolve(__dirname, '../../dist/postinstall.js')
);
