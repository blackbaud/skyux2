/*jslint node: true */
'use strict';

/**
 * This file is heavily inspired by Builder's e2e script:
 * https://github.com/blackbaud/skyux-builder/blob/master/cli/e2e.js
 */

const config = require('@blackbaud/skyux-builder/config/sky-pages/sky-pages.config');
const webpack = require('webpack');
const path = require('path');
const spawn = require('cross-spawn');
const logger = require('winston');
const minimist = require('minimist');
const selenium = require('selenium-standalone');

// Later this will change to visualtest if we do a separate command
const skyPagesConfig = config.getSkyPagesConfig('e2e');

// Disable this to quiet the output
const spawnOptions = { stdio: 'inherit' };

let httpServer;
let seleniumServer;
let start;

const argv = minimist(process.argv.slice(2));
const buildType = argv._[0];

visualtest(skyPagesConfig, webpack);

/**
 * Spawns the necessary commands for visualtest.
 * Assumes build was ran.
 * @name visualtest
 */
function visualtest(skyPagesConfig, webpack) {
  start = new Date().getTime();
  process.on('SIGINT', killServers);

  spawnServer()
    .then((port) => {
      argv.assets = `https://localhost:${port}`;
      argv.assetsrel = '../';
      return Promise.all([
        spawnBuild(argv, skyPagesConfig, webpack),
        port,
        spawnSelenium()
      ]);
    })
    .then(([chunks, port]) => {
      spawnProtractor(
        chunks,
        port,
        skyPagesConfig
      );
    })
    .catch((err) => {
      logger.error('ERROR:', err);
      killServers();
    });
}

/**
 * Function to get the protractorConfigPath
 * @name getProtractorConfigPath
 * @returns {string} protractorConfigPath
 */
function getProtractorConfigPath() {
  return path.resolve(
    'config/' + buildType + '.visual.conf.js'
  );
}

/**
 * Handles killing off the selenium and webpack servers.
 * @name killServers
 */
function killServers(exitCode) {

  logger.info('Cleaning up running servers');
  if (seleniumServer) {
    logger.info('Closing selenium server');
    seleniumServer.kill();
    seleniumServer = null;
  }

  if (httpServer) {
    logger.info('Closing http server');
    httpServer.close();
    httpServer = null;
  }

  logger.info(`Execution Time: ${(new Date().getTime() - start) / 1000} seconds`);
  logger.info(`Exiting process with ${exitCode}`);
  process.exit(exitCode || 0);
}

/**
 * Spawns the protractor command.
 * Perhaps this should be API driven?
 * @name spawnProtractor
 */
function spawnProtractor(chunks, port, skyPagesConfig) {
  logger.info('Running Protractor');

  const protractorPath = path.resolve(
    'node_modules',
    '.bin',
    'protractor'
  );

  const protractor = spawn.spawn(
    protractorPath,
    [
      getProtractorConfigPath(),
      '--disableChecks',
      `--baseUrl ${skyPagesConfig.skyux.host.url}`,
      `--params.localUrl=https://localhost:${port}`,
      `--params.chunks=${JSON.stringify(chunks)}`,
      `--params.skyPagesConfig=${JSON.stringify(skyPagesConfig)}`
    ],
    spawnOptions
  );

  protractor.on('exit', killServers);
}

/**
 * Spawns the selenium server if directConnect is not enabled.
 * @name spawnSelenium
 */
function spawnSelenium() {
  if (buildType === 'local') {
    const config = require(getProtractorConfigPath()).config;
    return new Promise(resolve => {
      logger.info('Spawning Selenium');

      // Assumes we're running selenium oursevles, so we should prep it
      if (config.seleniumAddress) {
        selenium.install({ logger: logger.info }, () => {
          selenium.start((err, child) => {
            seleniumServer = child;
            logger.info('Selenium server is ready.');
            resolve();
          });
        });

      // Otherwise we need to prep protractor's selenium
      } else {
        const webdriverManagerPath = path.resolve(
          'node_modules',
          '.bin',
          'webdriver-manager'
        );

        const results = spawn.sync(
          webdriverManagerPath,
          [
            'update',
            '--standalone', 'false',
            '--gecko', 'false'
          ],
          spawnOptions
        );

        if (results.error) {
          reject(results.error);
          return;
        }

        logger.info('Selenium server is ready.');
        resolve();
      }
    });
  } else {
    return new Promise(resolve => {
      resolve();
    });
  }

}

/**
 * Spawns the httpServer
 */
function spawnServer() {
  const server = require('@blackbaud/skyux-builder/cli/utils/server');

  return server.start();
}

/**
 * Spawns the build process.  Captures the config used.
 */
function spawnBuild(argv, skyPagesConfig, webpack) {
  const build = require('@blackbaud/skyux-builder/cli/build');

  return build(argv, skyPagesConfig, webpack)
    .then(stats => stats.toJson().chunks);
}
