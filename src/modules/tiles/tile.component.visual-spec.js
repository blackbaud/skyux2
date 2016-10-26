describe('Tile', function () {
  'use strict';

  it('should match previous tile screenshot', function () {
    return browser
      .setupTest('/tiles.html')
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'tile',
        selector: '#screenshot-tiles',
        checkAccessibility: true
      });
  });

  it('should match previous tile screenshot on small screens', function () {
    return browser
      .setupTest('/tiles.html', 480)
      .pause(1000)
      .compareScreenshot({
        screenshotName: 'tile_small',
        selector: '#screenshot-tiles',
        checkAccessibility: true
      });
  });
});
