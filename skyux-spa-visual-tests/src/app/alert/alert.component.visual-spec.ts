import { SkyHostBrowser } from '@blackbaud/skyux-builder/runtime/testing/e2e';
import { element, by, browser} from 'protractor';

describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', (done) => {
    let PixDiff = require('pix-diff');
    SkyHostBrowser.get('/alert');
    (browser as any).pixDiff.checkRegion(
      element(by.id('screenshot-alert')),
      'alert',
      {
        thresholdType: PixDiff.THRESHOLD_PERCENT,
        threshold: .02
      })
      .then((result: any) => {
        console.log('result', result);
        if (result.code !== PixDiff.RESULT_SIMILAR) {

        }
        expect(result.code).toEqual(PixDiff.RESULT_SIMILAR)

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
