(() => {
  'use strict';

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

  // Save a reference to kill selenium later
  let seleniumChild;

  // Start the webserver
  const start = () => new Promise((resolve, reject) => {
    server.listen(3000, () => {
      selenium.install({ logger: console.log }, () => {
        selenium.start((err, child) => {
          seleniumChild = child;
          resolve();
        });
      });
    });
  });

  // Stop the server and remove unused screenshots
  const stop = (exitCode) => {
    console.log('Stopping server.');
    server.close();
    rimraf.sync('webdriver-screenshots*/**/*+(px|regression).png', {});
    if (seleniumChild) {
      console.log('Killing Selenium child');
      seleniumChild.kill();
    }
  };

  process.on('SIGINT', () => {
    stop();
    process.exit(1);
  });

  // Support running the server for debugging
  process.argv.forEach(arg => {
    if (arg === 'start') {
      start();
    }
  });

  module.exports = {
    start: start,
    stop: stop
  };

})();
