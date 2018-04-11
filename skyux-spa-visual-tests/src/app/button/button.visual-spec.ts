import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('Button', () => {

  function testButton (selector: string) {
    return SkyVisualTest
      .compareScreenshot({
        screenshotName: selector,
        selector: `#${selector}`
      });
  }

  function testButtonClick (selector: string) {
    return SkyVisualTest
      .setupTest('button')
      .then(() => {
        browser.actions()
          .mouseMove(element(by.css(`${selector} .sky-btn`)))
          .perform();
        return testButton(selector);
      });
  }

  it('should match the baseline button screenshots', () => {
    testButton('screenshot-buttons');
  });

  it('should match the baseline disabled button screenshots', () => {
    testButton('screenshot-buttons-disabled');
  });

  // These tests are separated since the mouse needs to move

  it('should match the baseline screenshot while hovering a primary button', function () {
    return testButtonClick('screenshot-button-primary');
  });

  it('should match the baseline screenshot while hovering a secondary button', function () {
    return testButtonClick('screenshot-button-secondary');
  });

  it('should match the baseline screenshot while hovering a link button', function () {
      return testButtonClick('screenshot-button-link');
  });

  it('should match the baseline screenshot while hovering a link inline button', function () {
    return testButtonClick('screenshot-button-link-inline');
  });

});
