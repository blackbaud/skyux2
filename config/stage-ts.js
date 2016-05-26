'use strict';

var fs = require('fs-extra'),
  glob = require('glob'),
  path = require('path'),
  sass = require('node-sass'),
  TEMP_PATH = './.srctemp';

function deleteNonDistFiles() {
  var specFiles = glob.sync(TEMP_PATH + '/**/*.spec.ts');
  specFiles.push(TEMP_PATH + '/polyfills.ts');
  specFiles.push(TEMP_PATH + '/vendor.ts');

  specFiles.forEach(function (file) {
    fs.removeSync(file);
  });
}

function copySrc() {
  fs.copySync('./src', TEMP_PATH);

  deleteNonDistFiles();
}

function escapeContents(contents) {
  return contents.toString().replace(/`/g, '\\`');
}

function compileSass(file) {
  var contents = sass.renderSync({
    file: file,
    outputStyle: 'compressed'
  }).css;

  return contents;
}

function inlineContents(file, fileContents, requireMatch, requireFile) {
  var dirname = path.dirname(file),
    quote = true,
    requireContents;

  requireFile = path.join(dirname, requireFile);

  switch (path.extname(requireFile)) {
    case '.scss':
      requireContents = compileSass(requireFile);
      break;
    case '.html':
      requireContents = fs.readFileSync(requireFile);
      break;
    case '.json':
      requireContents = fs.readFileSync(requireFile);
      quote = false;
      break;
  }

  if (quote) {
    requireContents = '`' + requireContents.toString().replace(/`/g, '\\`') + '`';
  }

  fileContents = fileContents.replace(requireMatch, requireContents);

  return fileContents;
}

function inlineHtmlCss() {
  var files = glob.sync(TEMP_PATH + '/**/*.ts');

  files.forEach(function (file) {
    var fileContents,
      matches,
      regex = /require\('(.+?\.(html|json|scss))'\)/gi;

    fileContents = fs.readFileSync(
      file,
      {
        encoding: 'utf8'
      }
    );

    while (matches = regex.exec(fileContents)) {
      fileContents = inlineContents(file, fileContents, matches[0], matches[1]);
    }

    fs.writeFileSync(
      file,
      fileContents,
      {
        encoding: 'utf8'
      }
    );
  });
}

copySrc();
inlineHtmlCss();

