import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('grid component', () => {

  it('should display grid', () => {
    SkyVisualTest.setupTest('/grid');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'grid',
      selector: '#screenshot-grid',
      checkAccessibility: true
    });
  });

  it('should display grid with descending sort indication', () => {
    SkyVisualTest.setupTest('/grid');
    element(by.css('th')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'grid-sort-desc',
      selector: '#screenshot-grid',
      checkAccessibility: true
    });
  });

  it('should display grid with ascending sort indication', () => {
    SkyVisualTest.setupTest('/grid');
    element(by.css('th')).click();
    element(by.css('th')).click();
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'grid-sort-asc',
      selector: '#screenshot-grid',
      checkAccessibility: true
    });
  });
});
