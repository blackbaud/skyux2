var fs = require('fs-extra');
var path = require('path');

fs.copySync(
  path.resolve(__dirname, '../../node_modules/@skyux/theme/scss'),
  path.resolve(__dirname, '../../dist/scss')
);
