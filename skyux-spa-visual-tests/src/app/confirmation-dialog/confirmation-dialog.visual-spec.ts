import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Confirmation dialog', () => {

  it('should match previous one button confirmation-dialog form screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-one-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-one-button-form',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-dialog-btn-1')).click();
      });
    });
  });

  it('should match previous two button confirmation dialog form screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-two-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-two-button-form',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-dialog-btn-1')).click();
      });
    });
  });

  it('should match previous three button confirmation dialog form screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-three-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-three-button-form',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-dialog-btn-1')).click();
      });
    });
  });

  it('should match previous confirmation dialog with long description form screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-long-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-form-long-description',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-dialog-btn-1')).click();
      });
    });
  });
});
