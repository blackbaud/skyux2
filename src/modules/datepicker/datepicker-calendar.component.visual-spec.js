describe('Datepicker', function () {
  'use strict';

  it('should match previous daypicker screenshot', function () {
    return browser
      .setupTest('/datepicker.html')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'datepicker_daypicker',
        selector: '#screenshot-datepicker-calendar'
      });
  });

  it('should match previous monthpicker screenshot', function () {
    return browser
      .setupTest('/datepicker.html')
      .pause(1000)
      .click('.sky-datepicker-calendar-title')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'datepicker_monthpicker',
        selector: '#screenshot-datepicker-calendar'
      });
  });

  it('should match previous monthpicker screenshot', function () {
    return browser
      .setupTest('/datepicker.html')
      .pause(1000)
      .click('.sky-datepicker-calendar-title')
      .pause(1000)
      .click('.sky-datepicker-calendar-title')
      .moveCursorOffScreen()
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'datepicker_yearpicker',
        selector: '#screenshot-datepicker-calendar'
      });
  });
});
