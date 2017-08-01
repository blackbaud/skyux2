import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { browser, element, by } from 'protractor';

describe('search component', () => {

  it('should match the baseline search screenshot', () => {
    return SkyVisualTest.setupTest('search')
    .then(() => {
      browser.sleep(2000);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
    });

  });

  it('should match the baseline search screenshot on small screens', () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      browser.sleep(1000);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
    });

  });

  it('should match the baseline search screenshot on small screens when dismissable input is shown',
    () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      browser.sleep(1000);
      element(by.css('.sky-search-btn-open')).click();
      browser.sleep(1000);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small-dismissable',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
    });

  });

  it('should match the baseline search screenshot on small screens when search is applied',
    () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      browser.sleep(1000);
      element(by.css('.sky-search-btn-open')).click();
      browser.sleep(1000);
      element(by.css('.sky-search-input')).sendKeys('Value');
      element(by.css('.sky-search-btn-apply')).click();
      browser.sleep(1000);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small-dismissable-applied',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
    });

  });

  it('should match the baseline screenshot on small screens when search is applied and dismissed',
    () => {
    return SkyVisualTest.setupTest('search', 480)
    .then(() => {
      browser.sleep(1000);
      element(by.css('.sky-search-btn-open')).click();
      browser.sleep(1000);
      element(by.css('.sky-search-input')).sendKeys('Value');
      element(by.css('.sky-search-btn-apply')).click();
      browser.sleep(1000);
      element(by.css('.sky-search-btn-dismiss')).click();
      browser.sleep(1000);
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'search-small-applied',
        selector: '#screenshot-search-full',
        checkAccessibility: true
      });
    });

  });

});
