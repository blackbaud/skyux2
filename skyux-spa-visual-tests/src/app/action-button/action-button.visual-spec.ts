import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';
import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import { element, by, browser} from 'protractor';

describe('Action button', () => {
  it('should match previous action button screenshot', (done) => {
    SkyHostBrowser.get('/action-button');
    SkyVisualTest.compareScreenshot({
      screenshotName: 'action-button',
      elementId: 'screenshot-action-button',
      done: done
    });
  });

  it('should match previous action button screenshot on small screens', (done) => {
    SkyHostBrowser.get('/action-button');
    SkyVisualTest.compareScreenshot({
      screenshotName: 'action-button-small',
      elementId: 'screenshot-action-button',
      screenWidth: 480,
      done: done
    });
  });
});
