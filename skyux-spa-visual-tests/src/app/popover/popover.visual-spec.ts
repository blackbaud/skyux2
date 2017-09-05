import { SkyVisualTest } from '../../../config/utils/visual-test-commands';

import {
  // browser,
  element,
  by
} from 'protractor';

describe('Popover', () => {
  const testPlacement = (placement: string): Promise<any> => {
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
      .then(() => testPlacement('above'));
  });

  it('should open a popover below the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPlacement('below'));
  });

  it('should open a popover to the right of the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPlacement('right'));
  });

  it('should open a popover to the left of the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPlacement('left'));
  });

  it('should handle tiny screens', () => {});

  it('should handle absolutely positioned items inside the popover', () => {});
});
