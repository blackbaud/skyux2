import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Filter', () => {

  it('should match previous screenshot for filter button', () => {
    return SkyVisualTest.setupTest('filter')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'filter-button',
        selector: '#screenshot-filter-button',
        checkAccessibility: true
      });
    });

  });

  it('should match previous screenshot for active filter button', () => {
    return SkyVisualTest.setupTest('filter')
    .then(() => {
       element(by.css('.sky-btn-default')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'filter-button-active',
        selector: '#screenshot-filter-button',
        checkAccessibility: true
      });
    });

  });

  it('should match previous screenshot for filter summary', () => {
    return SkyVisualTest.setupTest('filter')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'filter-summary',
        selector: '#screenshot-filter-summary',
        checkAccessibility: true
      });
    });

  });

  it('should match previous screenshot for filter inline', () => {
    return SkyVisualTest.setupTest('filter')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'filter-inline',
        selector: '#screenshot-filter-inline',
        checkAccessibility: true
      });
    });

  });
});
