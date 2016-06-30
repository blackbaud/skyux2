describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', (done) => {

    let result = browser.url('/alert.html');

    browser.options.compare({
      browser: browser,
      browserResult: result,
      screenshotSuite: 'alert',
      screenshotName: 'default',
      selector: '#screenshot-alert',
      screenWidth: [480, 1280],
      checkAccessibility: false,
      done: done
    });
  });
});
