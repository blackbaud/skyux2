import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Fluid grid', () => {

  it('should handle very small screens', () => {
    return SkyVisualTest.setupTest('fluid-grid', 600)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screenxsmall',
          selector: '#screenshot-fluid-grid-xsmall'
        });
      });
  });

  it('should display all columns evenly split on the same row when on a small screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 800)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screensmall-evenrow',
          selector: '#screenshot-fluid-grid'
        });
      });
  });

  it('should display two on the top row and one on the bottom row when on a medium screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 1100)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screenmedium-tworows',
          selector: '#screenshot-fluid-grid'
        });
      });
  });

  it('should display all columns distributed unevenly when on a large screen', () => {
    return SkyVisualTest.setupTest('fluid-grid', 1400)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-screenlarge-unevenrow',
          selector: '#screenshot-fluid-grid'
        });
      });
  });

  it('should reverse column order with reverseColumnOrder applied', () => {
    return SkyVisualTest.setupTest('fluid-grid')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'fluid-grid-reversecolumnorder',
          selector: '#screenshot-fluid-grid-reverse'
        });
      });
  });
});
