import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Error', () => {

  it('should match previous screenshot for broken type', () => {
    SkyVisualTest.setupTest('/error');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'error-images',
      selector: '#screenshot-error-img',
      checkAccessibility: true
    });
  });

  it('should match previous error modal form screenshot', () => {
    SkyVisualTest.setupTest('/error');
    element(by.css('.sky-test-error-modal')).click();
    SkyVisualTest.moveCursorOffScreen();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'error-modal-form',
      selector: '.sky-modal',
      checkAccessibility: true
    });
  });
});
