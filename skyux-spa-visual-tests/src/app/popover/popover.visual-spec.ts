import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import {
  element,
  by
} from 'protractor';

describe('Popover', () => {
  const testPopoverPlacement = (placement: string): Promise<any> => {
    SkyVisualTest.scrollElementIntoView(`#screenshot-popover-placements`);
    element(by.id(`btn-popover-placement-${placement}`)).click();
    return SkyVisualTest
      .compareScreenshot({
        screenshotName: `popover-placement-${placement}`,
        selector: '#screenshot-popover-placements'
      });
  };

  it('should match previous screenshot', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => {
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'popover-all',
            selector: '#screenshot-all-popovers'
          });
      });
  });

  it('should open a popover above the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('above'));
  });

  it('should open a popover below the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('below'));
  });

  it('should open a popover to the right of the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('right'));
  });

  it('should open a popover to the left of the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('left'));
  });

  it('should handle tiny screens', () => {
    return SkyVisualTest
      .setupTest('popover', 767)
      .then(() => testPopoverPlacement('above'));
  });

  it('should handle absolutely positioned items inside the popover', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-popover-with-dropdown');
        element(by.id('btn-popover-with-dropdown')).click();
        element(by.css('#screenshot-popover-with-dropdown .sky-dropdown-button')).click();
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'popover-with-dropdown',
            selector: '#screenshot-popover-with-dropdown'
          });
      });
  });
});
