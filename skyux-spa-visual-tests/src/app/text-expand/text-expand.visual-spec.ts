import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('TextExpand', () => {

  it('should match previous text expands when not expanded', () => {
    return SkyVisualTest.setupTest('text-expand')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'text-expand-not-expanded',
        selector: '#text-expands'
      });
    });

  });

  it('should match the previous normal text expand when expanded', () => {
    return SkyVisualTest.setupTest('text-expand')
    .then(() => {
      element(by.css('#normal-text-expand .sky-text-expand-see-more')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'text-expand-normal-expanded',
        selector: '#normal-text-expand'
      });
    });

  });

  it('should match previous modal text expand when expanded', () => {
    return SkyVisualTest.setupTest('text-expand')
    .then(() => {
      element(by.css('#modal-text-expand .sky-text-expand-see-more')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'text-expand-modal-expanded',
        selector: '.sky-modal'
      }).then(() => {
        element(by.css('.sky-modal .sky-modal-btn-close')).click();
      });
    });

  });

  it('should match previous text expand without truncated newlines', () => {
    return SkyVisualTest
      .setupTest('text-expand')
      .then(() => {
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'text-expand-w-newlines',
            selector: '#screenshot-truncate-text-w-newlines'
          });
      });
  });

});
