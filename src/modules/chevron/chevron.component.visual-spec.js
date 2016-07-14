describe('Chevron', () => {
  'use strict';

  it('should match previous chevron screenshot', (done) => {
    browser
      .setupTest('/chevron.html')
      .compareScreenshot({
        screenshotName: 'checkron',
        selector: '#screenshot-chevron',
        checkAccessibility: true
      })
      .call(done);
  });
});
