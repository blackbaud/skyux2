import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Sort component', () => {

  it('should match the baseline sort screenshot', () => {
    return SkyVisualTest.setupTest('sort')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sort',
        selector: '#screenshot-sort-full'
      });
    });

  });

  it('should match the baseline sort screenshot when dropdown is open', () => {
    return SkyVisualTest.setupTest('sort')
    .then(() => {
      element(by.css('.sky-btn-default')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sort-open',
        selector: '#screenshot-sort-full'
      });
    });

  });

  it('should match the baseline sort screenshot when text is shown', () => {
    return SkyVisualTest.setupTest('sort')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sort-text',
        selector: '#screenshot-sort-text'
      });
    });

  });

  it('should match the baseline sort screenshot when text is on but the screen is small', () => {
    return SkyVisualTest.setupTest('sort', 400)
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'sort-text-small',
        selector: '#screenshot-sort-text'
      });
    });

  });

});
