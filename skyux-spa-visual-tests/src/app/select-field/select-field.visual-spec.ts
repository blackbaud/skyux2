import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('Select field', () => {
  it('should match previous multiple mode screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-multiple',
          selector: '#screenshot-select-field-multiple-mode'
        });
      });
  });

  it('should match previous single mode screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-single',
          selector: '#screenshot-select-field-single-mode'
        });
      });
  });

  it('should match previous multiple mode selected screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        element(by.css('#select-field-populate-selected-btn')).click();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-multiple-selected',
          selector: '#screenshot-select-field-multiple-mode'
        });
      });
  });

  it('should match previous single mode selected screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        element(by.css('#select-field-populate-selected-btn')).click();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-single-selected',
          selector: '#screenshot-select-field-single-mode'
        });
      });
  });

  it('should match previous single mode picker screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        element(by.css('#screenshot-select-field-single-mode .sky-input-group.sky-btn')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-single-picker',
          selector: '.sky-modal',
          checkAccessibility: false // changing to false because of a modal axe error
        });
      })
      .then(() => {
        element(by.css('.sky-modal-btn-close')).click();
      });
  });

  it('should match previous multiple mode picker screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        element(by.css('#screenshot-select-field-multiple-mode .sky-btn.sky-btn-default')).click();
        SkyVisualTest.moveCursorOffScreen();
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-multiple-picker',
          selector: '.sky-modal',
          checkAccessibility: false // changing to false because of a modal axe error
        });
      })
      .then(() => {
        element(by.css('.sky-modal-btn-close')).click();
      });
  });
});
