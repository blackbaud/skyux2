describe('KeyInfo', () => {
  'use strict';

  it('should match previous key-info screenshot', (done) => {
    browser
      .setupTest('/key-info.html')
      .compareScreenshot({
        screenshotName: 'key-info',
        selector: '#screenshot-key-info'
      })
      .call(done);
  });

});
