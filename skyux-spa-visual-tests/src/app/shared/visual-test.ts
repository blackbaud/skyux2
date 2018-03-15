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
  ]).then(res => expect(res[0]).toEqual(0));
}
