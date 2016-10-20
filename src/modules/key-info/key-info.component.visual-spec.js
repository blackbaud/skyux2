describe('KeyInfo', () => {
  'use strict';

  it('should match previous key-info screenshot', () => {
    return browser
      .setupTest('/key-info.html')
      .compareScreenshot({
        screenshotName: 'key-info',
        selector: '#screenshot-key-info'
      });
  });

});
