describe('Alert', () => {
  'use strict';

  it('should match previous alert screenshot', (done) => {

    const url = '/alert/fixtures/alert.component.visual-fixture.html';
    let result = browser.url(url);

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
