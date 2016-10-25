(function () {
  'use strict';

  var browserstack = require('browserstack-local');
  var rimraf = require('rimraf');
  var selenium = require('selenium-standalone');
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig = require('../webpack/webpack.visual');

  // Remove ForkCheckerPlugin as it hangs the server
  var webpackCompiler = webpack(webpackConfig);
  webpackCompiler.options.plugins.shift();

  var server = new WebpackDevServer(webpackCompiler, {
    noInfo: true,
    'content-base': 'src/'
  });

  var bsLocal;
  var seleniumChild;

  // Start the webserver
  function start() {
    return new Promise(function (resolve, reject) {
      server.listen(webpackCompiler.options.metadata.port, function () {
        selenium.install({
          logger: console.log
        }, function () {
          selenium.start(function (err, child) {
            seleniumChild = child;
            resolve();
          });
        });
      });
    });
  }

  function startCI() {
    return function () {
      return new Promise(function (resolve, reject) {
        bsLocal = new browserstack.Local();
        server.listen(webpackCompiler.options.metadata.port, function () {
          bsLocal.start({
            key: process.env.BROWSER_STACK_ACCESS_KEY,
            //binarypath: process.env.BROWSER_STACK_BINARY_BASE_PATH
          }, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
    };
  }

  // Stop the server and remove unused screenshots
  function stop(exitCode) {
    return function () {
      server.close();
      rimraf.sync('webdriver-screenshots*/**/*+(full|regression).png', {});
      if (seleniumChild) {
        seleniumChild.kill();
      }
    };
  }

  // Stop the server and remove unused screenshots
  function stopCI(exitCode) {
    return function () {
      server.close();
      rimraf.sync('webdriver-screenshots*/**/*+(full|regression).png', {});
      if (bsLocal.isRunning()) {
        bsLocal.stop();
      }
    };
  }

  process.on('SIGINT', function () {
    stop();
    process.exit(1);
  });

  var exports = {
    start: start,
    startCI: startCI,
    stop: stop,
    stopCI: stopCI
  };

  // Support running running commands from arguments
  process.argv.forEach(function (arg) {
    Object.keys(exports).forEach(function (key) {
      if (arg === key) {
        exports[key]();
      }
    });
  });

  // Support being required in config
  module.exports = exports;

})();
