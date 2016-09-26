describe('Navbar', () => {
  'use strict';

  it('should match previous navbar screenshot', (done) => {
    browser
      .setupTest('/navbar.html')
      .compareScreenshot({
        screenshotName: 'navbar',
        selector: '#screenshot-navbar'
      })
      .call(done);
  });

  it('should match previous navbar screenshot when a dropdown is open', (done) => {
    browser
      .setupTest('/navbar.html')
      .moveToObject('#screenshot-navbar .sky-dropdown-button')
      .compareScreenshot({
        screenshotName: 'navbar-dropdown-open',
        selector: '#screenshot-navbar'
      })
      .call(done);
  });

});
