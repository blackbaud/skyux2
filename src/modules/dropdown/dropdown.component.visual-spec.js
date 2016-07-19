describe('Dropdown', () => {
  'use strict';

  it('should match dropdown button screenshot when closed', (done) => {
    browser
      .setupTest('/dropdown.html')
      .compareScreenshot({
        screenshotName: 'dropdown-button-closed',
        selector: '#screenshot-dropdown-button'
      })
      .call(done);
  });

  it('should match dropdown button screenshot when open', (done) => {
    browser
      .setupTest('/dropdown.html')
      .click('#screenshot-contextmenu button.sky-dropdown-btn')
      .compareScreenshot({
        screenshotName: 'dropdown-button-open',
        selector: '#screenshot-dropdown-button'
      })
      .call(done);
  });

  it('should match dropdown context menu screenshot when closed', (done) => {
    browser
      .setupTest('/dropdown.html')
      .compareScreenshot({
        screenshotName: 'dropdown-context-menu-closed',
        selector: '#screenshot-dropdown-context-menu'
      })
      .call(done);
  });

  it('should match dropdown context menu screenshot when open', (done) => {
    browser
      .setupTest('/dropdown.html')
      .click('#screenshot-contextmenu button.sky-dropdown-btn')
      .compareScreenshot({
        screenshotName: 'dropdown-context-menu-open',
        selector: '#screenshot-dropdown-context-menu'
      })
      .call(done);
  });

});
