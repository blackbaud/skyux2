var sass = require('node-sass'),
  fs = require('fs-extra'),
  path = require('path'),
  tildeImporter = require('node-sass-tilde-importer');

var result = sass.renderSync({
  file: path.resolve(__dirname, '../../src/scss/sky.scss'),
  importer: tildeImporter,

});

fs.ensureFileSync(path.resolve(__dirname, '../../dist/css/sky.css'));
fs.writeFileSync(path.resolve(__dirname, '../../dist/css/sky.css'), result.css);
