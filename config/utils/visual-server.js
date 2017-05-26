(function () {
  'use strict';

  var rimraf = require('rimraf');
  var selenium = require('selenium-standalone');
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig = require('../webpack/webpack.visual');

  var webpackCompiler = webpack(webpackConfig);
  var server = new WebpackDevServer(webpackCompiler, {
    noInfo: true,
    contentBase: 'src/'
  });

  var bsLocal;
  var seleniumChild;

  // Start the webserver
  function start() {
    return new Promise(function (resolve) {
      server.listen(
        webpackCompiler.options.devServer.port,
        webpackCompiler.options.devServer.host, function () {
        selenium.install({
          version: '3.0.1',
          logger: console.log,
          drivers: {
            chrome: {
              version: '2.29',
            }
          }
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
    console.log('Starting CI visual server...');
    return new Promise(function (resolve) {
      server.listen(
        webpackCompiler.options.devServer.port,
        webpackCompiler.options.devServer.host,
        function () {
          console.log('Server started.');
          resolve();
        }
      );
    });
  }

  // Stop the server and remove unused screenshots
  function stop() {
    server.close();
    rimraf.sync('webdriver-screenshots*/**/*+(full|regression).png', {});
    if (seleniumChild) {
      seleniumChild.kill();
    }
  }

  // Stop the server and remove unused screenshots
  function stopCI(exitCode) {
    console.log('Server stopped with exit code', exitCode);
    server.close();
    rimraf.sync('webdriver-screenshots*/**/*+(full|regression).png', {});

  }

  process.on('SIGINT', function () {
    stop();
    stopCI(1);
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
