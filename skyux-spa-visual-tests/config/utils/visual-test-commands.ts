import { element, by, browser} from 'protractor';

let PixDiff = require('pix-diff');

export class SkyVisualTest {
  public static compareScreenshot(options: any) {
    if (options.screenWidth) {
      browser.driver.manage().window().setSize(options.screenWidth, 600);
    }
    browser.sleep(1000);
    return (browser as any).pixDiff.checkRegion(
      element(by.id(options.elementId)),
      options.screenshotName,
      {
        thresholdType: PixDiff.THRESHOLD_PERCENT,
        threshold: .02
      })
      .then((result: any) => {
        if (result.code !== PixDiff.RESULT_SIMILAR && result.code !== PixDiff.RESULT_IDENTICAL) {
          let createdPixDiff = new PixDiff({
            basePath: 'screenshots-created/',
            diffPath: 'screenshot-created-diff/',
            baseline: true,
            width: 1000,
            height: 600
          });
          createdPixDiff.saveRegion(
            element(by.id(options.elementId)),
            options.screenshotName);
        }
        browser.driver.manage().window().setSize(1000, 600);
        expect(result.code === PixDiff.RESULT_SIMILAR ||
          result.code === PixDiff.RESULT_IDENTICAL).toBe(true)
        options.done();
      })
      .catch((error: any) => {
        browser.driver.manage().window().setSize(1000, 600);
        if (error.message.indexOf('saving current image') === -1) {
          throw error;
        } else {
          options.done();
        }
      });
  }
}

