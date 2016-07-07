(() => {
  'use strict';

  const fs = require('fs');

  const log = (message) => {
    console.log('\x1b[31m', message);
  };

  const logViolations = (name, violations) => {
    log('\nThe following accessibility issues exist in %s:\n', name);
    violations.forEach((violation) => {
      log(violation.help, ' violation at: ');
      violation.nodes.forEach((line) => {
        log(line.target);
      });
      log('More Information: ', violation.helpUrl);
    });
  };

  const validatePageName = (options) => {
    const capabilities = options.browser.desiredCapabilities;
    const css = options.browser.options.plugins.webdrivercss;
    const dir =  capabilities.os + '_' + capabilities.browserName + '/';
    const browserRoot = css.screenshotRoot + '/' + dir;
    const browserFailedRoot = css.failedComparisonsRoot + '/' + dir;

    const structure = [
      browserRoot,
      browserRoot + options.screenshotSuite,
      browserFailedRoot,
      browserFailedRoot + options.screenshotSuite,
    ];

    structure.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
    });

    return dir + options.screenshotSuite + '/' + options.screenshotSuite;
  };

  const checkAccessibility = (options) => {
    options.browserResult.executeAsync((done) => {

      // Necessary for JSCS validateQuoteMarks
      let config = {
        rules: {}
      };
      config.rules['color-contrast'] = {
        enabled: false
      };
      axe.a11yCheck(document, config, done);

    }).then((ret) => {

      if (ret.value.violations && ret.value.violations.length !== 0) {
        logViolations(options.screenshotName, ret.value.valuations);
        expect(ret.value.violations.length).toBe(0, ' number of accessiblity violations');
      }

    }).call(options.done);
  };

  const compare = (options) => {
    const pageName = validatePageName(options);
    const tests = [{
      name: options.screenshotName,
      selector: options.selector,
      screenWidth: options.screenWidth
    }];

    const handleCompare = (err, res) => {
      expect(err).toBe(undefined);
      for (let suite in res) {
        res[suite].forEach((fixture) => {
          expect(fixture.isWithinMisMatchTolerance).toBe(true);
        });
      }
    };

    const handleDone = (exitCode) => {
      if (options.checkAccessibility) {
        checkAccessibility(options);
      } else {
        options.done(exitCode);
      }
    };

    options.browserResult.webdrivercss(pageName, tests, handleCompare).then(handleDone);
  };

  module.exports = {
    compare: compare,
    moveCursorOffScreen: browser => browser.moveToObject('body', 0, 0)
  };

})();
