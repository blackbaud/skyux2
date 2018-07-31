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
    .replace(/\\n/g, String.raw`\\n`)
    .replace(/\$/g, `\\\$`)
    .replace(/\\\'/g, String.raw`\\\'`);
}

function compileSass(file) {
  return sass.renderSync({
    file,
    importer: tildeImporter,
    outputStyle: 'expanded'
  }).css;
}

function getRawContents(requireFile) {
  return fs.readFileSync(requireFile, {
    encoding: 'utf8'
  });
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
      requireContents = getRawContents(requireFile);
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

function parseDemoServiceFile() {
  const file = `${TEMP_PATH}/demos/demo.service.ts`;
  const regex = /require\('(.+?\.(html|scss|ts))'\)/gi;

  let contents = fs.readFileSync(file, { encoding: 'utf8' });
  let matches = false;

  while (matches = regex.exec(contents)) {
    contents = inlineContents(file, contents, matches[0], matches[1]);
    regex.lastIndex = 0;
  }

  writeToFile(file, contents);
}

function injectRequiredFileContents() {
  const files = glob.sync(TEMP_PATH + '/**/*.ts');
  const regex = /require\('(.+?\.(html|json|scss))'\)/gi;

  files.forEach(function (file) {
    // Ignore the demo.service.ts file!
    if (/demo\.service\.ts$/.test(file)) {
      return;
    }

    let fileContents = fs.readFileSync(file, { encoding: 'utf8' });
    let matches;

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

    writeToFile(file, fileContents);
  });
}

function writeToFile(file, contents) {
  // Replace the placeholder with `+$` character combo.
  contents = contents.replace(/\-\-\-PLUSSIGNDOLLAR\-\-\-/g, '+\\\$');

  fs.writeFileSync(file, contents, { encoding: 'utf8' });
}

copySrc();
parseDemoServiceFile();
injectRequiredFileContents();
