import {
  SkyA11y,
  SkyHostBrowser,
  SkyVisualTest,
  SkyCompareScreenshotConfig
} from '@blackbaud/skyux-builder/runtime/testing/e2e';

export function visualTest(config: SkyCompareScreenshotConfig) {
  SkyHostBrowser.get('action-button');
  Promise.all([
    SkyA11y.run(),
    SkyVisualTest.compareScreenshot(config)
  ]).then(res => {
    const numA11yViolations = res[0];
    expect(numA11yViolations).toEqual(0);
  });
}
