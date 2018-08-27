const fs = require('fs-extra');
const path = require('path');

fs.copySync(
  path.resolve(__dirname, '../../node_modules/@skyux/theme/css/sky.css'),
  path.resolve(__dirname, '../../dist/css/sky.css')
);
