import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('TextExpandRepeater', () => {

  it('should match previous text expand repeater when not expanded', () => {
    SkyVisualTest.setupTest('/text-expand-repeater');
    return SkyVisualTest.compareScreenshot({
      checkAccessibility: true,
      screenshotName: 'text-expand-repeater-not-expanded',
      selector: '#text-expand-repeater'
    });
  });

  it('should match the previous text expand repeater when expanded', () => {
    SkyVisualTest.setupTest('/text-expand-repeater');
    element(by.css('.sky-text-expand-repeater-see-more')).click();
    return SkyVisualTest.compareScreenshot({
      checkAccessibility: true,
      screenshotName: 'text-expand-repeater-expanded',
      selector: '#text-expand-repeater'
    });
  });

});
