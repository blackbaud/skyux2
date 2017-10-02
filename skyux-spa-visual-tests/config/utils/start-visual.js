/*jslint node: true */
'use strict';

const config = require('@blackbaud/skyux-builder/config/sky-pages/sky-pages.config');
const webpack = require('webpack');
const path = require('path');
const spawn = require('cross-spawn');
const logger = require('winston');
const portfinder = require('portfinder');
const HttpServer = require('http-server');
const selenium = require('selenium-standalone');
const build = require('@blackbaud/skyux-builder/cli/build');

// Later this will change to visualtest if we do a separate command
const skyPagesConfig = config.getSkyPagesConfig('e2e');

// Disable this to quiet the output
const spawnOptions = { stdio: 'inherit' };

let httpServer;
let seleniumServer;
let start;

let buildType = process.argv[2];

visualtest(skyPagesConfig, webpack);

/**
 * Spawns the necessary commands for visualtest.
 * Assumes build was ran.
 * @name visualtest
 */
function visualtest(skyPagesConfig, webpack) {
  start = new Date().getTime();
  process.on('SIGINT', killServers);

  Promise.all([
    spawnBuild(skyPagesConfig, webpack),
    spawnServer(),
    spawnSelenium()
  ]).then(values => {
    spawnProtractor(
      values[0],
      values[1],
      skyPagesConfig
    );
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

  // Catch protractor's "Kitchen Sink" error.
  if (exitCode === 199) {
    logger.warn('Supressing protractor\'s "kitchen sink" error 199');
    exitCode = 0;
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
        spawn.sync(webdriverManagerPath, ['update'], spawnOptions);
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
  return new Promise(resolve => {
    logger.info('Requesting Open Port');
    httpServer = HttpServer.createServer({
      root: 'dist/',
      cors: true,
      https: {
        cert:
        path.resolve(__dirname, '../../node_modules/@blackbaud/skyux-builder', 'ssl', 'server.crt'),
        key:
        path.resolve(__dirname, '../../node_modules/@blackbaud/skyux-builder', 'ssl', 'server.key')
      }
    });
    portfinder.getPortPromise().then(port => {
      logger.info(`Open Port Found: ${port}`);
      logger.info('Starting Web Server');
      httpServer.listen(port, 'localhost', () => {
        logger.info('Web Server Running');
        resolve(port);
      });
    });
  });
}

/**
 * Spawns the build process.  Captures the config used.
 */
function spawnBuild(skyPagesConfig, webpack) {
  return new Promise(resolve => {
    logger.info('Running build');
    build([], skyPagesConfig, webpack).then(stats => {
      logger.info('Completed build');
      resolve(stats.toJson().chunks);
    });
  });
}
