import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Confirmation dialog', () => {

  it('should match previous confirmation-dialog form screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-form',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-confirmation-dialog-cancel')).click();
      });
    });
  });

  it('should match previous confirmation dialog with long description form screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-confirmation-dialog-long-description')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-form-long-description',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-confirmation-dialog-confirm')).click();
      });
    });

  });
});
