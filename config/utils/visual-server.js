(() => {
  'use strict';

  const browserstack = require('browserstack-local');
  const rimraf = require('rimraf');
  const selenium = require('selenium-standalone');
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack/webpack.visual');

  // Remove ForkCheckerPlugin as it hangs the server
  const webpackCompiler = webpack(webpackConfig);
  webpackCompiler.options.plugins.shift();

  const server = new WebpackDevServer(webpackCompiler, {
    noInfo: true,
    'content-base': 'src/'
  });

  let bsLocal;
  let seleniumChild;

  // Start the webserver
  const start = () => new Promise((resolve, reject) => {
    server.listen(webpackCompiler.options.metadata.port, () => {
      selenium.install({ logger: console.log }, () => {
        selenium.start((err, child) => {
          seleniumChild = child;
          resolve();
        });
      });
    });
  });

  const startCI = () => new Promise((resolve, reject) => {
    bsLocal = new browserstack.Local();
    server.listen(webpackCompiler.options.metadata.port, () => {
      bsLocal.start({
        key: process.env.BROWSER_STACK_ACCESS_KEY,
        //binarypath: process.env.BROWSER_STACK_BINARY_BASE_PATH
      }, resolve);
    });
  });

  // Stop the server and remove unused screenshots
  const stop = (exitCode) => {
    server.close();
    rimraf.sync('webdriver-screenshots*/**/*+(px|regression).png', {});
    if (seleniumChild) {
      seleniumChild.kill();
    }
  };

  // Stop the server and remove unused screenshots
  const stopCI = (exitCode) => {
    server.close();
    rimraf.sync('webdriver-screenshots*/**/*+(px|regression).png', {});
    if (bsLocal.isRunning()) {
      bsLocal.stop();  
    }
  };

  process.on('SIGINT', () => {
    stop();
    process.exit(1);
  });

  const exports = {
    start: start,
    startCI: startCI,
    stop: stop,
    stopCI: stopCI
  };

  // Support running running commands from arguments
  process.argv.forEach(arg => {
    Object.keys(exports).forEach((key) => {
      if (arg === key) {
        exports[key]();
      }
    });
  });

  // Support being required in config
  module.exports = exports;

})();
