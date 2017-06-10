import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('TextExpand', () => {

  it('should match previous text expands when not expanded', () => {
    SkyVisualTest.setupTest('/text-expand');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'text-expand-not-expanded',
      selector: '#text-expands'
    });
  });

  it('should match the previous normal text expand when expanded', () => {
    SkyVisualTest.setupTest('/text-expand');
    element(by.css('#normal-text-expand .sky-text-expand-see-more')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'text-expand-normal-expanded',
      selector: '#normal-text-expand'
    });
  });

  it('should match previous modal text expand when expanded', () => {
    SkyVisualTest.setupTest('/text-expand');
    element(by.css('#modal-text-expand .sky-text-expand-see-more')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'text-expand-modal-expanded',
      selector: '.sky-modal'
    });
  });

});
