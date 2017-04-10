describe('Radio component', function () {
  'use strict';

  it('should match the radio input', function () {
    return browser
      .setupTest('/radio.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'radio',
        selector: '#screenshot-radio'
      });
  });
});
