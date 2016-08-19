(() => {
  'use strict';

  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack/webpack.dev');

  // Remove ForkCheckerPlugin as it hangs the server
  const webpackCompiler = webpack(webpackConfig);
  //webpackCompiler.options.plugins.shift();

  const server = new WebpackDevServer(webpackCompiler, {
    noInfo: true,
    'content-base': 'demo/src'
  });

  // Start the webserver
  const start = () => new Promise((resolve, reject) => {
    server.listen(webpackCompiler.options.metadata.port, () => {
      resolve();
    });
  });

  // Stop the server and remove unused screenshots
  const stop = (exitCode) => {
    server.close();
  };

  process.on('SIGINT', () => {
    stop();
    process.exit(1);
  });

  const exports = {
    start: start,
    stop: stop
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
