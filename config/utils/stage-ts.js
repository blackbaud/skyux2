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
      "core.ts"
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
  return contents.toString().replace(/`/g, '\\`');
}

function compileSass(file) {
  var contents = sass.renderSync({
    file: file,
    outputStyle: 'compressed'
  }).css;

  return contents;
}

function getHtmlContents(requireFile) {
  var encodedHtml,
    encodedTs,
    fileContents,
    fileSuffix = '.demo.html',
    tsFileContents;

  fileContents = fs.readFileSync(requireFile).toString();

  return fileContents;
}

function inlineContents(file, fileContents, requireMatch, requireFile, processFn) {
  var dirname = path.dirname(file),
    quote = true,
    requireContents;

  requireFile = path.join(dirname, requireFile);

  switch (path.extname(requireFile)) {
    case '.scss':
      requireContents = compileSass(requireFile);
      break;
    case '.html':
      requireContents = getHtmlContents(requireFile);
      break;
    case '.json':
      requireContents = fs.readFileSync(requireFile);
      quote = false;
      break;
  }

  if (quote) {
    requireContents = requireContents.toString().replace(/\\f/g, '\\\\f');
    requireContents = '`' + requireContents.toString().replace(/`/g, '\\`') + '`';
  }

  if (processFn) {
    requireContents = processFn(requireContents);
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

      // Since we're changing the file contents in each iteration and since the regex is stateful
      // we need to reset the regex; otherwise it might not be able to locate subsequent matches
      // after the first replacement.
      regex.lastIndex = 0;
    }

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

