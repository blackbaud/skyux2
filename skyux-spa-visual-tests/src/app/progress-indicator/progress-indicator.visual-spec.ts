import {
  element,
  by
} from 'protractor';

import {
  SkyVisualTest
} from '../../../config/utils/visual-test-commands';

describe('Progress indicator component', () => {
  it('should show 1st step active and rest incomplete', () => {
    return SkyVisualTest.setupTest('progress-indicator')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'progress-indicator-1',
        selector: 'body'
      });
    });
  });

  it('should show 1st and 2nd steps complete and the 3rd as active', () => {
    SkyVisualTest.setupTest('progress-indicator')
    .then(() => {
      element(by.id(`btn-progress`)).click();
      element(by.id(`btn-progress`)).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'progress-indicator-2',
        selector: 'body'
      });
    });
  });

  it('should show 1st active, 2nd complete, and 3rd incomplete', () => {
    SkyVisualTest.setupTest('progress-indicator')
    .then(() => {
      element(by.id(`btn-progress`)).click();
      element(by.id(`btn-progress`)).click();

      element(by.id(`btn-regress`)).click();
      element(by.id(`btn-regress`)).click();

      return SkyVisualTest.compareScreenshot({
        screenshotName: 'progress-indicator-3',
        selector: 'body'
      });
    });
  });
});
