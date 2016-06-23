(() => {
  'use strict';

  const express = require('express');
  const fs = require('fs');
  const glob = require('glob');
  const rimraf = require('rimraf');
  const selenium = require('selenium-standalone');
  const webpack = require('webpack');
  const WebpackHtmlPlugin = require('html-webpack-plugin');
  const webpackMiddleware = require('webpack-dev-middleware');

  // Load the layout template
  const src = 'src/modules/';
  const layout = fs.readFileSync(src + 'visual-fixture-template.html', { encoding: 'utf8' });

  // Create the pages array
  const fixtures = glob.sync(src + '**/*.visual-fixture.html');
  const clean = dirty => dirty.replace(src, '');
  const pages = fixtures.map((page) => {

    const html = fs.readFileSync(page, { encoding: 'utf8' });
    const js = fs.readFileSync(page.replace('.html', '.ts'), { encoding: 'utf8' });

    let content = layout.replace('{# PAGE_HTML #}', html);
    content = content.replace('{# PAGE_JS #}', js);

    return new WebpackHtmlPlugin({
      hash: true,
      filename:  clean(page),
      templateContent: content
    });
  });

  const hasNoError = (err) => {
    if (err) throw err;
    return true;
  };

  // Create webpack compiler
  const webpackCompiler = webpack({
    plugins: pages,
    output: {
      path: '/'
    }
  });

  // Create express server expose a landing page
  let app = express();
  app.use('/', (req, res) => {
    fixtures.forEach((path) => {
      const url = clean(path);
      res.send('<a href="' + url + '">' + url + '</a>');
    });
  });

  // Start the webserver
  const start = () => {

    const deferred = Promise.defer();

    app.use(webpackMiddleware(webpackCompiler, {}));
    app.listen(3000, () => {
      selenium.install({}, (errInstall) => {
        if (hasNoError(errInstall)) {
          selenium.start((errStart, child) => {
            if (hasNoError(errStart)) {
              selenium.child = child;
              deferred.resolve();
            }
          });
        }
      });
    });

    return deferred.promise;
  };

  // Stop the server
  const stop = (exitCode) => {
    rimraf.sync('webdriver-screenshots*/**/*+(px|regression).png', {});
    if (selenium.child) {
      selenium.child.kill();
    }
  };

  module.exports = {
    start: start,
    stop: stop
  };

})();
