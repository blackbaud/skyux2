import { element, by, browser} from 'protractor';
import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';

const axeBuilder = require('axe-webdriverjs');
const pixDiff = require('pix-diff');

export class SkyVisualTest {

  public static scrollElementIntoView(selector: string): void {
    let scrollEl = element(by.css(selector));
    browser.executeScript('arguments[0].scrollIntoView();', scrollEl.getWebElement());
  }

  public static moveCursorOffScreen(): void {
    browser.actions()
      .mouseMove(element(by.css('body')), { x: 0, y: 0})
      .perform();
  }

  public static setupTest(url: string, screenWidth?: number): any {
    return browser
      .getCurrentUrl()
      .then((currentUrl: string) => {
        if (currentUrl !== 'https://host.nxt.blackbaud.com/visual-tests/') {
          SkyHostBrowser.get('/');
        }

        element(by.css('a.sky-visual-test-' + url)).click();

        if (!screenWidth) {
          browser.driver.manage().window().setSize(1000, 800);
        } else {
          browser.driver.manage().window().setSize(screenWidth, 800);
        }
      });
  }

  public static compareScreenshot(options: {
    screenshotName: string;
    selector: string;
    checkAccessibility?: boolean;
  }): any {
    browser.sleep(1000);
    return (browser as any).pixDiff
      .checkRegion(
        element(by.css(options.selector)),
        options.screenshotName,
        {
          thresholdType: pixDiff.THRESHOLD_PERCENT,
          threshold: .02
        }
      )
      .then((result: any) => {
        if (result.code !== pixDiff.RESULT_SIMILAR && result.code !== pixDiff.RESULT_IDENTICAL) {
          let createdpixDiff = new pixDiff({
            basePath: (browser as any).skyVisualTestOptions.createdPath,
            diffPath: (browser as any).skyVisualTestOptions.createdPathDiff,
            baseline: true
          });

          createdpixDiff
            .saveRegion(
              element(by.css(options.selector)),
              options.screenshotName
            )
            .then(() => {
              browser.driver.manage().window().setSize(1000, 800);
              let differencePercent = ((result.differences / result.dimension) * 100).toFixed(2);
              let mismatchMessage
                = `screenshots have mismatch percentage of ${differencePercent} percent`;
              expect(
                result.code === pixDiff.RESULT_SIMILAR ||
                result.code === pixDiff.RESULT_IDENTICAL
              ).toBe(true, mismatchMessage);
            });
        }

        browser.driver.manage().window().setSize(1000, 800);

        if (options.checkAccessibility) {
          return this.checkAccessibility();
        } else {
          browser.executeScript(() => {
            window.history.go(-1);
          });

          return Promise.resolve();
        }
      })
      .catch((error: any) => {
        browser.driver.manage().window().setSize(1000, 800);

        if (error.message.indexOf('saving current image') === -1) {
          throw error;
        } else {
           if (options.checkAccessibility) {
            return this.checkAccessibility();
          } else {
            browser.executeScript(() => {
              window.history.go(-1);
            });

            return Promise.resolve();
          }
        }
      });
  }

  private static checkAccessibility(): Promise<any> {
    return new Promise((resolve: any) => {
      axeBuilder(browser.driver)
        .options({
          rules: {
            'bypass': { enabled: false },
            'color-contrast': { enabled: false }
          }
        })
        .analyze((results: any) => {
          const violations = results.violations.length;

          if (violations) {
            this.logAccessibilityResults(results);
            browser.executeScript(() => {
              window.history.go(-1);
            });

            expect(violations).toBe(0, ' number of accessiblity violations');
          }

          browser.executeScript(() => {
            window.history.go(-1);
          });

          resolve();
        });
    });
  }

  private static logAccessibilityResults(results: any): void {
    const numResults = results.violations.length;

    if (numResults > 0) {
      console.error(`Accessibility failure(s) found for: ${results.url}\n`);
      results.violations.forEach((result: any) => {
        const label = (result.nodes.length === 1) ? 'element' : 'elements';
        const message = result.nodes.reduce((msg: any, node: any) => {
            return `${msg}  Location: ${node.target[0]}\n${node.html}`;
        }, '\n');
        console.error(
          `${result.nodes.length} ${label} failed '${result.id}' rule: ${result.help}
${message}
Get help at: ${result.helpUrl}`
        );
      });
    }
  }
}
