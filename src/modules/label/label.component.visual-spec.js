describe('Label', () => {
  'use strict';

  it('should match previous label screenshot', (done) => {
    browser
      .setupTest('/label.html')
      .compareScreenshot({
        screenshotName: 'labels-all',
        selector: '#screenshot-label',
        checkAccessibility: true
      })
      .call(done);
  });
});
