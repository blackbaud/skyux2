'use strict';

var fs = require('fs-extra'),
  glob = require('glob'),
  path = require('path'),
  sass = require('node-sass'),
  tildeImporter = require('node-sass-tilde-importer'),
  TEMP_PATH = './.srctemp';

function deleteNonDistFiles() {
  var specFiles = glob.sync(TEMP_PATH + '/**/*.spec.ts');
  specFiles.push(TEMP_PATH + '/polyfills.ts');
  specFiles.push(TEMP_PATH + '/vendor.ts');
  specFiles.push(TEMP_PATH + '/**/fixtures');
  specFiles.push(TEMP_PATH + '/app');

  specFiles.forEach(function (file) {
    fs.removeSync(file);
  });
}

function writeTSConfig() {
  var config = {
    "compilerOptions": {
      "target": "es5",
      "module": "es2015",
      "moduleResolution": "node",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "allowSyntheticDefaultImports": true,
      "sourceMap": true,
      "noImplicitAny": true,
      "outDir": "../dist",
      "inlineSources": true,
      "declaration": true,
      "lib": [
        "dom",
        "es2015"
      ],
      "skipLibCheck": true,
      "types": [
        "jasmine",
        "node"
      ],
      "rootDir": ".",
      "baseUrl": "."
    },
    "files": [
      "core.ts",
      "demo.ts"
    ],
    "exclude": [
      "../node_modules"
    ],
    "compileOnSave": false,
    "buildOnSave": false
  };

  fs.writeJSONSync(TEMP_PATH + '/tsconfig.json', config);
}

function copySrc() {
  fs.copySync('./src', TEMP_PATH);

  deleteNonDistFiles();

  writeTSConfig();
}

function escapeContents(contents) {
  return String.raw`${contents}`
    // The `+$` character combo causes some strange behavior during
    // the compile process. The placeholder phrase will then be
    // replaced at the end of the process.
    .replace(/\+\$/g, '---PLUSSIGNDOLLAR---')
    .replace(/\$/g, `\\\$`)
    .replace(/\\\'/g, String.raw`\\\'`);
}

function compileSass(file) {
  let contents = '';

  try {
    contents = sass.renderSync({
      file: file,
      importer: tildeImporter,
      outputStyle: 'compressed'
    }).css;
  } catch (e) {
    console.log(e.message);
  }


  return contents;
}

function getRawContents(requireFile) {
  let fileContents = '';

  try {
    fileContents = fs.readFileSync(requireFile).toString();
  } catch (e) {}

  return fileContents;
}

function getJsonContents(requireFile) {
  var fileContents = '',
    newFileFirst,
    newFileLast,
    loaderIndex = requireFile.indexOf('json-loader!'),
    newFileName = requireFile;

  if (loaderIndex > -1) {
    newFileFirst = requireFile.substring(0, loaderIndex);
    newFileLast = requireFile.substring(loaderIndex + 12, requireFile.length);
    newFileName = newFileFirst + newFileLast;
  }

  return getRawContents(newFileName);
}

function inlineContents(file, fileContents, requireMatch, requireFile, processFn) {
  var dirname = path.dirname(file),
    quote = true,
    requireContents;

  requireFile = path.join(dirname, requireFile);
  requireFile = requireFile.replace('!!raw-loader!', '');

  switch (path.extname(requireFile)) {
    case '.scss':
      requireContents = compileSass(requireFile);
      break;
    case '.ts':
      requireContents = escapeContents(getRawContents(requireFile));
      break;
    case '.html':
      requireContents = getRawContents(requireFile);
      break;
    case '.json':
      requireContents = getJsonContents(requireFile);
      quote = false;
      break;
  }

  if (quote) {
    requireContents = requireContents.toString().replace(/\\f/g, '\\\\f');
    requireContents = '`' + requireContents.toString().replace(/`/g, '\\\`') + '`';
  }

  if (processFn) {
    requireContents = processFn(requireContents);
  }

  if (requireContents) {
    fileContents = fileContents.replace(requireMatch, requireContents);
  }

  return fileContents;
}

function injectRequiredFileContents() {
  var files = glob.sync(TEMP_PATH + '/**/*.ts');

  files.forEach(function (file) {
    var fileContents = '',
      matches,
      regex = /require\('(.+?\.(html|json|scss|ts))'\)/gi;

    try {
      fileContents = fs.readFileSync(file, { encoding: 'utf8' });
    } catch (e) { }

    while (matches = regex.exec(fileContents)) {
      fileContents = inlineContents(file, fileContents, matches[0], matches[1]);

      // Since we're changing the file contents in each iteration and since the regex is stateful
      // we need to reset the regex; otherwise it might not be able to locate subsequent matches
      // after the first replacement.
      regex.lastIndex = 0;
    }

    // Don't replace raw typescript file contents from demos.
    if (!/demo\.service\.ts$/.test(file)) {
      while (matches = /templateUrl\:\s*'(.+?\.html)'/gi.exec(fileContents)) {
        fileContents = inlineContents(
          file,
          fileContents,
          matches[0],
          matches[1],
          (requireContents) => {
            return `template: ${requireContents}`
          }
        );
        regex.lastIndex = 0;
      }

      while (matches = /styleUrls\:\s*\[\s*'(.+?\.scss)']/gi.exec(fileContents)) {
        fileContents = inlineContents(
          file,
          fileContents,
          matches[0],
          matches[1],
          (requireContents) => {
            return `styles: [${requireContents}]`
          }
        );
        regex.lastIndex = 0;
      }
    }

    // Replace the placeholder with `+$` character combo.
    fileContents = fileContents.replace(/\-\-\-PLUSSIGNDOLLAR\-\-\-/g, '+\\\$');

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
injectRequiredFileContents();
