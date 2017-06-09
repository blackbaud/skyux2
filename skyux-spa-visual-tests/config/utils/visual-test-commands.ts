import { element, by, browser} from 'protractor';
import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';

const AxeBuilder = require('axe-webdriverjs');

let PixDiff = require('pix-diff');

export class SkyVisualTest {

  public static setupTest(url: string, screenWidth?: number) {
    SkyHostBrowser.get(url);
    if (!screenWidth) {
      browser.driver.manage().window().setSize(1000, 600);
    } else {
      browser.driver.manage().window().setSize(screenWidth, 600);
    }
  }

  public static compareScreenshot(options: any) {
    browser.sleep(1000);
    return (browser as any).pixDiff.checkRegion(
      element(by.css(options.selector)),
      options.screenshotName,
      {
        thresholdType: PixDiff.THRESHOLD_PERCENT,
        threshold: .02
      })
      .then((result: any) => {
        if (result.code !== PixDiff.RESULT_SIMILAR && result.code !== PixDiff.RESULT_IDENTICAL) {
          let createdPixDiff = new PixDiff({
            basePath: (browser as any).skyVisualTestOptions.createdPath,
            diffPath: (browser as any).skyVisualTestOptions.createdPathDiff,
            baseline: true
          });
          createdPixDiff.saveRegion(
            element(by.id(options.elementId)),
            options.screenshotName);
        }
        browser.driver.manage().window().setSize(1000, 600);
        let differencePercent = ((result.differences / result.dimension) * 100).toFixed(2);
        let mismatchMessage
          = 'screenshots have mismatch percentage of ' + differencePercent + ' percent'
        expect(result.code === PixDiff.RESULT_SIMILAR ||
          result.code === PixDiff.RESULT_IDENTICAL).toBe(true, mismatchMessage);
        if (options.checkAccessibility) {
          return this.checkAccessibility();
        } else {
          return Promise.resolve();
        }

      })
      .catch((error: any) => {
        browser.driver.manage().window().setSize(1000, 600);
        if (error.message.indexOf('saving current image') === -1) {
          throw error;
        } else {
           if (options.checkAccessibility) {
            return this.checkAccessibility();
          } else {
            return Promise.resolve();
          }
        }
      });
  }

  private static checkAccessibility() {
    return new Promise(resolve => {
      AxeBuilder(browser.driver)
        .options({
          rules: {
            'bypass': { enabled: false },
            'color-contrast': { enabled: false }
          }
        })
        .analyze(results => {
          const violations = results.violations.length;
          if (violations) {
            this.logAccessibilityResults(results);
            expect(violations).toBe(0, ' number of accessiblity violations');
          }

          resolve();
        })
    });
  }

  private static logAccessibilityResults(results: any) {
    var numResults = results.violations.length;

      if (numResults > 0) {
        console.error("Accessibility failure(s) found for: " + results.url + "\n");
        results.violations.forEach(result => {
          var label = result.nodes.length === 1 ? 'element' : 'elements';
          var msg = result.nodes.reduce(function(msg, node) {
              return `${msg}  Location: ${node.target[0]}
  ${node.html}`;
          }, "\n");
          console.error(`${result.nodes.length} ${label} failed '${result.id}' rule: ${result.help} ${msg}
  Get help at: ${result.helpUrl}
`)
        });
      }
  }
}

