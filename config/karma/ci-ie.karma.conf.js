const { lstatSync, readdirSync } = require('fs-extra');
const path = require('path');
const minimist = require('minimist');
const grep = require('karma-webpack-grep');
const webpackConfig = require('../webpack/webpack.test');

function isDirectory(source) {
  return lstatSync(source).isDirectory();
}

function getDirectories(source) {
  return readdirSync(source)
    .filter((name) => {
      return isDirectory(path.join(source, name));
    });
}

// Run only a few modules' specs
function getSpecsRegex() {
  // `batchCount` = number of modules to test in the batch
  // `batchStartAtIndex` = at which module the batch should begin
  // For example, `npm run test:unit -- --batchCount 200 --batchStartAtIndex 0`
  const argv = minimist(process.argv.slice(2));

  const batchCount = argv.batchCount || 0;
  const batchStartAtIndex = argv.batchStartAtIndex || 0;

  if (!batchCount) {
    return '';
  }

  const moduleDirectories = getDirectories(path.resolve('src/modules'));
  const numTotalModules = moduleDirectories.length;
  const modules = moduleDirectories.splice(batchStartAtIndex, batchCount);

  console.log(`Running specs for ${modules.length} modules...`);
  console.log(`(Starting at ${batchStartAtIndex} of ${numTotalModules} total)`);

  if (modules.length === 0) {
    return '';
  }

  console.log(modules.join(',\n'));

  return [
    String.raw`\\/`,
    '\(',
    ...modules.join('|'),
    ')\\/'
  ].join('').replace(/\-/g, '\\-');
}

module.exports = function(config) {
  const specsRegex = getSpecsRegex();

  if (!specsRegex) {
    console.log('Aborting Karma because no specs were found.');
    process.exit(0);
  }

  // This plugin lets us run specs from specified directories.
  // https://www.npmjs.com/package/karma-webpack-grep
  webpackConfig.plugins = (webpackConfig.plugins || []).concat(grep({
    grep: specsRegex,
    basePath: '.',
    // needs to match what's in spec-bundle.js:
    testContext: '../../src/modules'
  }));

  const customLaunchers = {
    bs_windows_ie_11: {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '11.0',
      os: 'Windows',
      os_version: '10'
    }
  };

  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    files: [{
      pattern: '../utils/spec-bundle.js',
      watched: false
    }, {
      pattern: '../utils/spec-styles.js',
      watched: false
    }],
    preprocessors: {
      '../utils/spec-styles.js': ['webpack'],
      '../utils/spec-bundle.js': ['webpack']
    },
    webpack: webpackConfig,
    port: 9876,
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    colors: true,
    autoWatch: false,
    singleRun: true,
    failOnEmptyTestSuite: false,
    browserDisconnectTimeout: 3e5,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 3e5,
    captureTimeout: 3e5,
    logLevel: config.LOG_INFO,
    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },
    browserStack: {
      port: 9876,
      pollingTimeout: 10000
    }
  });
};
