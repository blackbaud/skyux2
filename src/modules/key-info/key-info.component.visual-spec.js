describe('KeyInfo', function () {
  'use strict';

  it('should match previous key-info screenshot', function () {
    return browser
      .setupTest('/key-info.html')
      .compareScreenshot({
        screenshotName: 'key-info',
        selector: '#screenshot-key-info'
      });
  });

});
