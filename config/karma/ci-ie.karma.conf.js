const { lstatSync, readdirSync } = require('fs-extra');
const path = require('path');
const minimist = require('minimist');
const grep = require('karma-webpack-grep');
const webpackConfig = require('../webpack/webpack.test');

function getDirectories(source) {
  return readdirSync(source)
    .filter(name => lstatSync(path.join(source, name)).isDirectory());
}

// Run only a few modules' specs
function getSpecsRegex() {
  const argv = minimist(process.argv.slice(2));

  /**
   * The command line argument `--ieBatch` is a string representing
   * the current batch to run, of total batches.
   * For example, `npm run test:unit:ci:ie -- --ieBatch 1of3`
   */
  const [
    currentRun,
    totalRuns
  ] = argv.ieBatch.split('of');

  if (!currentRun || !totalRuns) {
    throw 'Invalid IE 11 batch request! Please provide a command line argument in the format of `--ieBatch 1of3`.';
  }

  const moduleDirectories = getDirectories(path.resolve('src/modules'));
  const totalModules = moduleDirectories.length;
  const modulesPerRun = Math.ceil(moduleDirectories.length / totalRuns);
  const startAtIndex = modulesPerRun * (currentRun - 1);
  const modules = moduleDirectories.splice(startAtIndex, modulesPerRun);

  if (modules.length === 0) {
    return;
  }

  console.log(`[Batch ${currentRun} of ${totalRuns}]`);
  console.log(`--> Running specs for ${modules.length} modules...`);
  console.log(`--> Starting at module ${startAtIndex}, ending at module ${startAtIndex + modules.length}, of ${totalModules} total modules\n`);
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
    console.log('Aborting Karma for IE 11 because no specs were found.');
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

  // Remove coverage rule because it causes slowness in IE 11.
  webpackConfig.module.rules.pop();

  const customLaunchers = {
    bs_windows_ie_11: {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '11.0',
      os: 'Windows',
      os_version: '10'
    }
  };

  // Apply normal ci config.
  require('./ci.karma.conf')(config);

  // Set IE launcher overrides.
  config.set({
    reporters: ['mocha'],
    // Only run webpack preprocessors.
    preprocessors: {
      '../utils/spec-styles.js': ['webpack'],
      '../utils/spec-bundle.js': ['webpack']
    },
    webpack: webpackConfig,
    browsers: Object.keys(customLaunchers),
    customLaunchers
  });
};
