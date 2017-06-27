import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

describe('Repeater', () => {

  it('should match previous repeater screenshot', () => {
    return SkyVisualTest
      .setupTest('repeater')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'repeater',
          selector: '#screenshot-repeater',
          checkAccessibility: true
        });
      });

  });

  it('should match previous repeater screenshot when all are collapsed', () => {
    return SkyVisualTest.setupTest('repeater')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'repeater-collapsed',
        selector: '#screenshot-repeater-collapsed',
        checkAccessibility: true
      });
    });

  });

  it('should match previous repeater screenshot in single mode', () => {
    return SkyVisualTest.setupTest('repeater')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'repeater-single',
        selector: '#screenshot-repeater-single',
        checkAccessibility: true
      });
    });

  });

  it('should match previous repeater screenshot in multiple mode', () => {
    return SkyVisualTest.setupTest('repeater')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'repeater-multiple',
        selector: '#screenshot-repeater-multiple',
        checkAccessibility: true
      });
    });

  });

});
