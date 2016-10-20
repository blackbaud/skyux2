describe('Dropdown', () => {
  'use strict';

  it('should match dropdown button screenshot when closed', () => {
    return browser
      .setupTest('/dropdown.html')
      .compareScreenshot({
        screenshotName: 'dropdown-button-closed',
        selector: '#screenshot-dropdown-button'
      });
  });

  it('should match dropdown button screenshot when open', () => {
    return browser
      .setupTest('/dropdown.html')
      .click('#screenshot-dropdown-button .sky-dropdown-button')
      .compareScreenshot({
        screenshotName: 'dropdown-button-open',
        selector: '#screenshot-dropdown-button'
      });
  });

  it('should match dropdown context menu screenshot when closed', () => {
    return browser
      .setupTest('/dropdown.html')
      .compareScreenshot({
        screenshotName: 'dropdown-context-menu-closed',
        selector: '#screenshot-dropdown-context-menu'
      });
  });

  it('should match dropdown context menu screenshot when open', () => {
    return browser
      .setupTest('/dropdown.html')
      .click('#screenshot-dropdown-context-menu .sky-dropdown-button')
      .compareScreenshot({
        screenshotName: 'dropdown-context-menu-open',
        selector: '#screenshot-dropdown-context-menu'
      });
  });

});
