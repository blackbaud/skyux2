import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by, browser } from 'protractor';

describe('Flyout', () => {

  it('should match previous flyout screenshot', () => {
    return SkyVisualTest.setupTest('flyout')
      .then(() => {
        element(by.css('.sky-btn-primary')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'flyout',
          selector: 'body'
        }).then(() => {
          element(by.css('.sky-flyout .sky-flyout-btn-close')).click();
        });
      });
  });

  it('should match previous flyout screenshot on tiny screens', () => {
    return SkyVisualTest.setupTest('flyout', 480)
      .then(() => {
        element(by.css('.sky-btn-primary')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'flyout',
          selector: 'body'
        }).then(() => {
          element(by.css('.sky-flyout .sky-flyout-btn-close')).click();
        });
      });
  });

  it('should handle absolutely positioned items inside the flyout', () => {
    return SkyVisualTest.setupTest('flyout')
      .then(() => {
        element(by.css('.sky-btn-primary')).click();
        browser.sleep(250);
        element(by.css('.sky-flyout .sky-dropdown-button')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'flyout-open-dropdown',
            selector: 'body'
        }).then(() => {
          element(by.css('.sky-flyout .sky-flyout-btn-close')).click();
        });
      });
  });
});
