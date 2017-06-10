import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Sort component', () => {

  it('should match the baseline sort screenshot', () => {
    SkyVisualTest.setupTest('/sort');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'sort',
      selector: '#screenshot-sort-full',
      checkAccessibility: true
    });
  });

  it('should match the baseline sort screenshot when dropdown is open', () => {
    SkyVisualTest.setupTest('/sort');
    element(by.css('.sky-btn-default')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'sort-open',
      selector: '#screenshot-sort-full',
      checkAccessibility: true
    });
  });

});
