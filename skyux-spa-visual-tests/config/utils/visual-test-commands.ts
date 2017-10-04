import { element, by, browser } from 'protractor';
import { SkyA11y, SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';

const pixDiff = require('pix-diff');

export interface SkyCompareScreenshotConfig {
  screenshotName: string;
  selector: string;
  checkAccessibility?: boolean;
}

export class SkyVisualTest {
  public static readonly THRESHOLD_PERCENT = .02;
  public static readonly SCREEN_WIDTH = browser.skyVisualTestConfig.width;
  public static readonly SCREEN_HEIGHT = browser.skyVisualTestConfig.height;

  public static setupTest(url: string, screenWidth?: number): Promise<void> {
    SkyVisualTest.resizeWindow(screenWidth);
    return SkyHostBrowser.get(`${url}`);
  }

  public static compareScreenshot(options: SkyCompareScreenshotConfig): Promise<any> {
    const subject = element(by.css(options.selector));
    const checkRegionConfig = {
      thresholdType: pixDiff.THRESHOLD_PERCENT,
      threshold: SkyVisualTest.THRESHOLD_PERCENT
    };

    browser.waitForAngular();

    return Promise.all([
      SkyVisualTest.checkAccessibility(options),

      browser
        .pixDiff
        .checkRegion(
          subject,
          options.screenshotName,
          checkRegionConfig
        )
        .then((result: any) => {
          const code = result.code;
          const isMatch = (code === pixDiff.RESULT_SIMILAR || code === pixDiff.RESULT_IDENTICAL);
          const mismatchPercentage = (result.differences / result.dimension * 100).toFixed(2);
          const mismatchMessage = `Screenshots have mismatch percent of ${mismatchPercentage}!`;
          expect(isMatch).toBe(true, mismatchMessage);
        })
        .catch((error: any) => {
          // Ignore 'baseline image not found' errors from PixDiff.
          if (error.message.indexOf('saving current image') > -1) {
            console.log(error.message);
            return Promise.resolve();
          }

          throw error;
        })
    ]);
  }

  public static scrollElementIntoView(selector: string): void {
    const scrollEl = element(by.css(selector));
    browser.executeScript('arguments[0].scrollIntoView();', scrollEl.getWebElement());
  }

  public static moveCursorOffScreen(): void {
    browser
      .actions()
      .mouseMove(element(by.css('body')), { x: 0, y: 0 })
      .perform();
  }

  private static checkAccessibility(options: any): Promise<any> {
    if (!options.checkAccessibility) {
      return;
    }

    SkyVisualTest.resizeWindow();

    return SkyA11y
      .run()
      .then((violations: number) => expect(violations).toBe(0));
  }

  private static resizeWindow(
    width: number = SkyVisualTest.SCREEN_WIDTH,
    height: number = SkyVisualTest.SCREEN_HEIGHT
  ) {
    browser
      .driver
      .manage()
      .window()
      .setSize(width, height);
  }
}
