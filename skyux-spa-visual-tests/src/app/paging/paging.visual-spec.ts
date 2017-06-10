import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('paging component', () => {

  it('should display first page selected', () => {
    SkyVisualTest.setupTest('/paging');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'paging-first',
      selector: '#screenshot-paging'
    });
  });

  it('should display middle page selected', () => {
    SkyVisualTest.setupTest('/paging');
    element(by.css('a[sky-cmp-id="next"]')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'paging-middle',
      selector: '#screenshot-paging'
    });
  });
});
