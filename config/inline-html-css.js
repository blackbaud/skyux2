'use strict';

var fs = require('fs-extra'),
  glob = require('glob'),
  path = require('path'),
  sass = require('node-sass');

function copySrc() {
  fs.copySync('./src', './src_temp');
}

function compileSass(file) {
  var contents = sass.renderSync({
    file: file
  }).css;

  return contents;
}

function doReplace(file, fileContents, requireMatch, requireFile) {
  var dirname = path.dirname(file),
    requireContents;

  requireFile = path.join(dirname, requireFile);

  if (path.extname(requireFile) === '.scss') {
    requireContents = compileSass(requireFile);
  } else {
    requireContents = fs.readFileSync(requireFile);
  }

  fileContents = fileContents.replace(requireMatch, '`' + requireContents + '`');

  return fileContents;
}

function inlineHtmlCss() {
  var files = glob.sync('./src_temp/**/*.ts');

  files.forEach(function (file) {
    var fileContents,
      matches,
      regex = /require\('(.+?\.(html|scss))'\)/gi;

    fileContents = fs.readFileSync(file, {encoding: 'utf8'});

    while (matches = regex.exec(fileContents)) {
      fileContents = doReplace(file, fileContents, matches[0], matches[1]);
    }

    //console.log(file);

    fs.writeFileSync(file, fileContents, {encoding: 'utf8'});
  });
}

copySrc();
inlineHtmlCss();

