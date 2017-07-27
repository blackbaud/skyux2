import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by } from 'protractor';

describe('Forms', () => {

  it('should match previous screenshot for required label', () => {
    return SkyVisualTest.setupTest('forms')
    .then(() => {
      return SkyVisualTest.compareScreenshot({
        screenshotName: 'label-required',
        selector: '#screenshot-required-label',
        checkAccessibility: true
      });
    });

  });
});
