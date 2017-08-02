import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Fluid grid', () => {

  it('should display all columns on different rows when on a very small screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 600)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screensmallest-differentrows',
          selector: '#screenshot-fluid-grid',
          checkAccessibility: true
        });
      });
  });

  it('should display all columns evenly split on the same row when on a small screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 800)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screensmall-evenrow',
          selector: '#screenshot-fluid-grid',
          checkAccessibility: true
        });
      });
  });

  it('should display two on the top row and one on the bottom row when on a medium screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 1100)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screenmedium-tworows',
          selector: '#screenshot-fluid-grid',
          checkAccessibility: true
        });
      });
  });

  it('should display all columns distributed unevenly when on a large screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 1400)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screenlarge-unevenrow',
          selector: '#screenshot-fluid-grid',
          checkAccessibility: true
        });
      });
  });

  it('should reverse column order with reverseColumnOrder applied', () => {
    return SkyVisualTest.setupTest('fluid-grid')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-reversecolumnorder',
          selector: '#screenshot-fluid-grid-reverse',
          checkAccessibility: true
        });
      });
  });
});
