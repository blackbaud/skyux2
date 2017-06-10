import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Tile', () => {

  it('should match previous tile screenshot', () => {
    SkyVisualTest.setupTest('/tiles');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'tile',
      selector: '#screenshot-tiles',
      checkAccessibility: true
    });
  });

  it('should match previous tile screenshot on small screens', () => {
    SkyVisualTest.setupTest('/tiles', 480);
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'tile-small',
      selector: '#screenshot-tiles',
      checkAccessibility: true
    });
  });
});
