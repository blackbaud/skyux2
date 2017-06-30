var fs = require('fs-extra');
var path = require('path');

fs.copySync(
  path.resolve(__dirname, '../../node_modules/@blackbaud/skyux-design-tokens/scss'),
  path.resolve(__dirname, '../../dist/scss')
);
