import { SkyVisualTest } from '../../../config/utils/visual-test-commands';
import { element, by } from 'protractor';

describe('grid component', () => {

  it('should display grid', () => {
    return SkyVisualTest.setupTest('grid')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'grid',
        selector: '#screenshot-grid'
      });
    });
  });

  it('should display grid with descending sort indication', () => {
    return SkyVisualTest.setupTest('grid')
    .then(() => {
      element(by.css('th')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'grid-sort-desc',
        selector: '#screenshot-grid'
      });
    });
  });

  it('should display grid with ascending sort indication', () => {
    return SkyVisualTest.setupTest('grid')
    .then(() => {
      element(by.css('th')).click();
      element(by.css('th')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'grid-sort-asc',
        selector: '#screenshot-grid'
      });
    });
  });

  it('should highlight cells correctly', () => {
    return SkyVisualTest.setupTest('grid')
    .then(() => {
      element(by.css('#highlight-button')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'grid-highlight',
        selector: '#screenshot-grid'
      });
    });
  });

  it('should display grid with multiselect', () => {
    return SkyVisualTest.setupTest('grid')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'grid-multiselect',
        selector: '#screenshot-grid-multiselect'
      });
    });
  });

  it('should select all', () => {
    return SkyVisualTest.setupTest('grid')
    .then(() => {
      element(by.css('th.sky-grid-multiselect-cell input')).click();
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'grid-multiselect-select-all',
        selector: '#screenshot-grid-multiselect'
      });
    });
  });
});
