describe('Navbar', () => {
  'use strict';

  it('should match previous navbar screenshot', () => {
    return browser
      .setupTest('/navbar.html')
      .compareScreenshot({
        screenshotName: 'navbar',
        selector: '#screenshot-navbar'
      });
  });

  it('should match previous navbar screenshot when the user mouses over an item', () => {
    return browser
      .setupTest('/navbar.html')
      .moveToObject('#screenshot-navbar .first-item')
      .compareScreenshot({
        screenshotName: 'navbar-item-over',
        selector: '#screenshot-navbar'
      });
  });

  it('should match previous navbar screenshot when a dropdown is open', () => {
    return browser
      .setupTest('/navbar.html')
      .moveToObject('#screenshot-navbar .sky-dropdown-button')
      .compareScreenshot({
        screenshotName: 'navbar-dropdown-open',
        selector: '#screenshot-navbar'
      });
  });

  it('should match previous navbar screenshot when the user is over a dropdown item', () => {
    return browser
      .setupTest('/navbar.html')
      .moveToObject('#screenshot-navbar .sky-dropdown-button')
      .moveToObject('#screenshot-navbar .sky-dropdown-item:first-child')
      .compareScreenshot({
        screenshotName: 'navbar-dropdown-item-over',
        selector: '#screenshot-navbar'
      });
  });

  it(
    'should match previous navbar screenshot when an item is active via the item CSS class',
    () => {
      return browser
        .setupTest('/navbar.html')
        .compareScreenshot({
          screenshotName: 'navbar-item-active',
          selector: '#screenshot-navbar-active-item'
        });
    }
  );

  it(
    'should match previous navbar screenshot when an item is active via a child CSS class',
    () => {
      return browser
        .setupTest('/navbar.html')
        .compareScreenshot({
          screenshotName: 'navbar-item-active-child',
          selector: '#screenshot-navbar-active-child'
        });
    }
  );

  it(
    'should match previous navbar screenshot when a dropdown is active',
    () => {
      return browser
        .setupTest('/navbar.html')
        .compareScreenshot({
          screenshotName: 'navbar-item-active-child',
          selector: '#screenshot-navbar-active-child'
        });
    }
  );

});
