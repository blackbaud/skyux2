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

  it('should open a popover above-left the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('above-left'));
  });

  it('should open a popover above-right the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('above-right'));
  });

  it('should open a popover below-left the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('below-left'));
  });

  it('should open a popover below-right the caller', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => testPopoverPlacement('below-right'));
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
      .setupTest('popover', 480)
      .then(() => {
        SkyVisualTest.scrollElementIntoView(`#screenshot-popover-tiny`);
        element(by.id(`btn-popover-tiny`)).click();
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: `popover-placement-tiny`,
            selector: '#screenshot-popover-tiny'
          });
      });
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

  it('should handle left aligned popover in positioned parent', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-popover-positioned-parent');
        element(by.id('btn-popover-position-parent-left')).click();
        element(by.css('#popover-positioned-parent-container-left .sky-dropdown-button')).click();
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'popover-position-parent-left',
            selector: '#screenshot-popover-positioned-parent'
          });
      });
  });

  it('should handle right aligned popover in positioned parent', () => {
    return SkyVisualTest
      .setupTest('popover')
      .then(() => {
        SkyVisualTest.scrollElementIntoView('#screenshot-popover-positioned-parent');
        element(by.id('btn-popover-position-parent-right')).click();
        element(by.css('#popover-positioned-parent-container-right .sky-dropdown-button')).click();
        return SkyVisualTest
          .compareScreenshot({
            screenshotName: 'popover-position-parent-right',
            selector: '#screenshot-popover-positioned-parent'
          });
      });
  });
});
