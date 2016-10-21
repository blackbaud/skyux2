describe('Radio component', function () {
  'use strict';

  it('should match the file drop control', function () {
    return browser
      .setupTest('/radio.html')
      .compareScreenshot({
        screenshotName: 'radio',
        selector: '#screenshot-radio'
      });
  });
});
