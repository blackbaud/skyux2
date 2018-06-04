import {
  SkyA11y,
  SkyHostBrowser
} from '@blackbaud/skyux-builder/runtime/testing/e2e';

import {
  SkyVisual,
  SkyVisualCompareScreenshotConfig
} from '@blackbaud/skyux-visual';

export function visualTest(config: SkyVisualCompareScreenshotConfig) {
  SkyHostBrowser.get('action-button');

  Promise.all([
    SkyA11y.run(),
    SkyVisual.compareScreenshot(config)
  ]).then(res => {
    const numA11yViolations = res[0];
    expect(numA11yViolations).toEqual(0);
  });
}
