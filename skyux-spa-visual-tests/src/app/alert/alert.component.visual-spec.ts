import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';
import { element, by, browser} from 'protractor';

describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', (done) => {
    let PixDiff = require('pix-diff');
    SkyHostBrowser.get('/alert');
    browser.sleep(1000);
    (browser as any).pixDiff.checkRegion(
      element(by.id('screenshot-alert')),
      'alert',
      {
        thresholdType: PixDiff.THRESHOLD_PERCENT,
        threshold: .02
      })
      .then((result: any) => {
        console.log('result', result);
        if (result.code !== PixDiff.RESULT_SIMILAR && result.code !== PixDiff.RESULT_IDENTICAL) {
          let createdPixDiff = new PixDiff({
            basePath: 'screenshots-created-local/',
            diffPath: 'screenshot-created-diff-local/',
            baseline: true,
            width: 1000,
            height: 600
          });
          createdPixDiff.saveRegion(
            element(by.id('screenshot-alert')),
            'alert');
        }
        expect(result.code === PixDiff.RESULT_SIMILAR ||
          result.code === PixDiff.RESULT_IDENTICAL).toBe(true)

        done();
      })
      .catch((error: any) => {
        console.log('in catch');
        if (error.message.indexOf('saving current image') === -1) {
          throw error;
        } else {
          done();
        }
      });
  });
});
