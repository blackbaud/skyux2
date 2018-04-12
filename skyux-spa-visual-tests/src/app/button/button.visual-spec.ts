import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('Button', () => {

  function test(id: string) {
    return SkyVisualTest
      .compareScreenshot({
        screenshotName: id,
        selector: `#screenshot-${id}`
      });
  }

  function testButton (id: string) {
    return SkyVisualTest
      .setupTest('button')
      .then(() => test(id));
  }

  function testButtonClick (id: string) {
    return SkyVisualTest
      .setupTest('button')
      .then(() => {
        browser.actions()
          .mouseMove(element(by.css(`#screenshot-${id} .sky-btn`)))
          .perform();

        return test(id);
      });
  }

  it('should match the baseline button screenshots', () => {
    return testButton('buttons');
  });

  it('should match the baseline disabled button screenshots', () => {
    return testButton('buttons-disabled');
  });

  // These tests are separated since the mouse needs to move

  it('should match the baseline screenshot while hovering a primary button', function () {
    return testButtonClick('button-primary');
  });

  it('should match the baseline screenshot while hovering a secondary button', function () {
    return testButtonClick('button-secondary');
  });

  it('should match the baseline screenshot while hovering a link button', function () {
      return testButtonClick('button-link');
  });

  it('should match the baseline screenshot while hovering a link inline button', function () {
    return testButtonClick('button-link-inline');
  });

});
