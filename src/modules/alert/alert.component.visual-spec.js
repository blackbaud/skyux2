describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', (done) => {
    browser
      .setupTest('/alert.html')
      .compareScreenshot({
        screenshotName: 'alert',
        selector: '#screenshot-alert',
        checkAccessibility: true
      })
      .call(done);
  });
});
