import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

fdescribe('Select field', () => {

  it('should match previous tokens screenshot', () => {
    return SkyVisualTest
      .setupTest('select-field')
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'select-field-multiple',
          selector: '#screenshot-select-field-multiple-mode'
        });
      });
  });
/*
  it('should match previous tokens screenshot on small screens', () => {
    return SkyVisualTest
      .setupTest('tokens', 480)
      .then(() => {
        return SkyVisualTest.compareScreenshot({
          screenshotName: 'tokens-small',
          selector: '#screenshot-tokens'
        });
      });
  });
  */
});
