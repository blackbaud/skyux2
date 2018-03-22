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
// `ieTotalRuns` = number of runs to split the modules into
// `ieCurrentRun` = which run is currently running
// For example, `npm run test:unit -- --ieTotalRuns 3 --ieCurrentRun 0`
function getSpecsRegex() {
  const argv = minimist(process.argv.slice(2));
  const moduleDirectories = getDirectories(path.resolve('src/modules'));
  const modulesPerRun = Math.ceil(moduleDirectories.length / argv.ieTotalRuns);
  const modules = moduleDirectories.splice(modulesPerRun * argv.ieCurrentRun, modulesPerRun);

  console.log(`Running specs for ${modules.length} modules...`);
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

  // Apply normal ci config
  require('./ci.karma.conf')(config);

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

  // Set our IE launcher overrides
  config.set({
    browsers: Object.keys(customLaunchers),
    webpack: webpackConfig,
    customLaunchers
  });


};
