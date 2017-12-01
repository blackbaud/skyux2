import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('search component', () => {

  it('should match the baseline search screenshot', () => {
    return SkyVisualTest.setupTest('search')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search',
        selector: '#screenshot-search-full'
      });
    });

  });

  it('should match the baseline search screenshot on small screens', () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small',
        selector: '#screenshot-search-full'
      });
    });

  });

  it('should match the baseline search screenshot on small screens when dismissable input is shown',
    () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      element(by.css('.sky-search-btn-open')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small-dismissable',
        selector: '#screenshot-search-full'
      });
    });

  });

  it('should match the baseline search screenshot on small screens when search is applied',
    () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      element(by.css('.sky-search-btn-open')).click();
      element(by.css('.sky-search-input')).sendKeys('Value');
      element(by.css('.sky-search-btn-apply')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small-dismissable-applied',
        selector: '#screenshot-search-full'
      });
    });

  });

  it('should match the baseline screenshot on small screens when search is applied and dismissed',
    () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      element(by.css('.sky-search-btn-open')).click();
      element(by.css('.sky-search-input')).sendKeys('Value');
      element(by.css('.sky-search-btn-apply')).click();
      element(by.css('.sky-search-btn-dismiss')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small-applied',
        selector: '#screenshot-search-full'
      });
    });

  });

});
