(() => {
  'use strict';

  const fs = require('fs');
  const path = require('path');
  const util = require('util');

  const checkAccessibility = (options) =>
    browser.executeAsync((done) => {

      const config = {
        rules: {
          'bypass': { enabled: false },
          'color-contrast': { enabled: false }
        }
      };
      axe.a11yCheck(document, config, function (results) {
        done(results);
      });

    }).then((ret) => {
      if (ret.value.violations && ret.value.violations.length !== 0) {
        logViolations(options.screenshotName, ret.value.violations);
        expect(ret.value.violations.length).toBe(0, ' number of accessiblity violations');
      }
    });

  const compareScreenshot = (options) =>
    browser.getViewportSize('width').then((width) => {

      const prefix = getPrefix(browser);
      const pageName = prefix + path.sep + prefix + '_' + options.screenshotName + '_full';

      options.screenshotName += '.' + width + 'px';

      const test = [{
        name: options.screenshotName,
        elem: options.selector
      }];

      const handler = (err, res) => {
        expect(err).toBe(undefined);
        for (let suite in res) {
          res[suite].forEach((fixture) => {
            expect(fixture.isWithinMisMatchTolerance).toBe(true);
          });
        }
      };

      createPaths(browser, prefix);
      return browser
        .webdrivercss(pageName, test, handler)
        .then(() => {
          if (options.checkAccessibility) {
            checkAccessibility(options);
          }
        });
    });

  const createPaths = (browser, prefix) => {
    const css = browser.options.plugins.webdrivercss;
    const structure = [
      path.resolve(css.screenshotRoot, prefix),
      path.resolve(css.failedComparisonsRoot, prefix)
    ];

    structure.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
    });
  };

  const getPrefix = (browser) =>
    browser.desiredCapabilities.os + '_' + browser.desiredCapabilities.browserName;

  const log = (message) => {
    console.log('\x1b[31m', message);
  };

  const logViolations = (name, violations) => {
    log(util.format(
      '\nThe following accessibility issues exist in %s:\n',
      name
    ));

    violations.forEach((violation) => {
      log(' violation at: ' + violation.help);
      violation.nodes.forEach((line) => {
        log(line.target);
      });
      log('More Information: ' + violation.helpUrl);
    });
  };

  const focusElement = (browser, selector) =>
    browser.execute('document.querySelector("' + selector + '").focus()');

  const moveCursorOffScreen = (browser) =>
    browser.moveToObject('body', 0, 0);

  const setupTest = (url, screenWidth) =>
    browser.url(url).getViewportSize().then((size) => {
      screenWidth = screenWidth || 1280;
      if (size.width !== screenWidth) {
        return browser.setViewportSize({
          height: size.height,
          width: screenWidth
        });
      }
    });

  module.exports = {
    compareScreenshot: compareScreenshot,
    focusElement: focusElement,
    moveCursorOffScreen: moveCursorOffScreen,
    setupTest: setupTest
  };

})();
