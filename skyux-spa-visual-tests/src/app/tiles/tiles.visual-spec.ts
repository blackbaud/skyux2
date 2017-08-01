import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Tile', () => {

  it('should match previous tile screenshot', () => {
    return SkyVisualTest.setupTest('tiles')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'tile',
          selector: '#screenshot-tiles',
          checkAccessibility: true
        });
      });

  });

  it('should match previous tile screenshot on small screens', () => {
    return SkyVisualTest.setupTest('tiles', 480)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'tile-small',
          selector: '#screenshot-tiles',
          checkAccessibility: true
        });
      });

  });
});
