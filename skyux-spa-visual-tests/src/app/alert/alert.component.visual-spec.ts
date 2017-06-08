import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';
import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by, browser} from 'protractor';

describe('Alert', () => {

  it('should match previous alert screenshot', () => {
    SkyVisualTest.setupTest('/alert');
    return SkyVisualTest.compareScreenshot({
      screenshotName: 'alert',
      elementId: 'screenshot-alert',
      checkAccessibility: true
    });
  });
});
