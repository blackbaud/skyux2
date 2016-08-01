describe('Checkbox', () => {
  'use strict';

  it('should match previous checkbox screenshot', (done) => {
    browser
      .setupTest('/checkbox.html')
      .compareScreenshot({
        screenshotName: 'checkbox',
        selector: '#screenshot-checkbox',
        checkAccessibility: true
      })
      .call(done);
  });
});
