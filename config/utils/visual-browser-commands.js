(() => {
  'use strict';

  const fs = require('fs');
  const path = require('path');
  const util = require('util');

  const checkAccessibility = (options) => {
    return browser.executeAsync((done) => {

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
      return;
    });
  };

  function checkVisualResult(results, options, browser) {
    results.forEach(function (element) {
      expect(element.isExactSameImage).toBe(true);
    });

    if (options.checkAccessibility) {
      return checkAccessibility(browser, options);
    } else {
      return;
    }
  }

  function getViewSizeHandler(width, browser, options) {
    var widthString = '.' + width + 'px';

    options.screenshotName =
      options.screenshotName + '_full' + '.' + options.screenshotName + widthString;

    return browser.checkElement(
      options.selector,
      {
        screenshotName: options.screenshotName
      }).then(function (results) {
        return checkVisualResult(results, options, this);
      });
  }

  function compareScreenshot(options) {
    return browser.getViewportSize('width').then(function (width) {
      return getViewSizeHandler(width, this, options);
    });
  }

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

  const focusElement = (browser, selector) => {
    return browser.execute('document.querySelector("' + selector + '").focus()');
  };

  const moveCursorOffScreen = (browser) => {
    return browser.moveToObject('body', 0, 0);
  };

  const setupTest = (url, screenWidth) => {
    return browser.url(url).getViewportSize().then((size) => {
      screenWidth = screenWidth || 1280;
      if (size.width !== screenWidth) {
        return browser.setViewportSize({
          height: size.height,
          width: screenWidth
        });
      } else {
        return;
      }
    });
  };

  const getScreenshotName = (basePath) => {
    return function (context) {
      var prefix = getPrefix(context.desiredCapabilities);
      var screenshotName = context.options.screenshotName;

      screenshotName = prefix + '_' + screenshotName + '.baseline.png';

      return path.join(basePath, prefix, screenshotName);
    };
  };

  const getVisualRegression = (referenceFolder, screenshotFolder, diffsFolder) => {
    var VisualRegressionCompare = require('wdio-visual-regression-service/compare');
    return {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: getScreenshotName(path.join(process.cwd(), referenceFolder)),
        screenshotName: getScreenshotName(path.join(process.cwd(), screenshotFolder)),
        diffName: getScreenshotName(path.join(process.cwd(), diffsFolder)),
        misMatchTolerance: 0.01
      }),
      viewportChangePause: 300
    };
  };

  module.exports = {
    compareScreenshot: compareScreenshot,
    focusElement: focusElement,
    moveCursorOffScreen: moveCursorOffScreen,
    setupTest: setupTest,
    getVisualRegression: getVisualRegression
  };

})();
