import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Confirmation dialog', () => {

  it('should match previous one button confirmation-dialog screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-one-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-one-button',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-confirmation-dialog-buttons .sky-btn-primary')).click();
      });
    });
  });

  it('should match previous two button confirmation dialog screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-two-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-two-button',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-confirmation-dialog-buttons .sky-btn-primary')).click();
      });
    });
  });

  it('should match previous three button confirmation dialog screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-three-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-three-button',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-confirmation-dialog-buttons .sky-btn-primary')).click();
      });
    });
  });

  it('should match previous confirmation dialog with long description screenshot', () => {
    return SkyVisualTest.setupTest('confirmation-dialog')
    .then(() => {
      element(by.css('.sky-test-long-confirmation-dialog')).click();
      SkyVisualTest.moveCursorOffScreen();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'confirmation-dialog-long-description',
        selector: '.sky-modal',
        checkAccessibility: true
      }).then(() => {
        element(by.css('.sky-confirmation-dialog-buttons .sky-btn-primary')).click();
      });
    });
  });
});
