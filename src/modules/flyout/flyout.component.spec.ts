import {
  ApplicationRef
} from '@angular/core';

import {
  ComponentFixture,
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyResources
} from '../resources';

import { SkyFlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';
import { SkyFlyoutTestSampleContext } from './fixtures/flyout-sample-context.fixture';
import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutService } from './flyout.service';

import {
  SkyFlyoutConfig
} from './types';

describe('Flyout component', () => {
  let applicationRef: ApplicationRef;
  let fixture: ComponentFixture<SkyFlyoutTestComponent>;
  let flyoutService: SkyFlyoutService;

  function openFlyout(config: SkyFlyoutConfig = {}): SkyFlyoutInstance<any> {
    config = Object.assign({
      providers: [{
        provide: SkyFlyoutTestSampleContext,
        useValue: { name: 'Sam' }
      }]
    }, config);

    const flyoutInstance = fixture.componentInstance.openFlyout(config);

    applicationRef.tick();
    tick();
    fixture.detectChanges();

    return flyoutInstance;
  }

  function closeFlyout() {
    const closeButton = getCloseButtonElement();
    closeButton.click();
    tick();
    fixture.detectChanges();
    tick();
  }

  function makeEvent(eventType: string, evtObj: any) {
    let evt = document.createEvent('MouseEvents');
      evt.initMouseEvent(eventType, false, false, window, 0, 0, 0, evtObj.clientX,
        0, false, false, false, false, 0, undefined);
    document.dispatchEvent(evt);
  }

  function getFlyoutElement(): HTMLElement {
   return document.querySelector('.sky-flyout') as HTMLElement;
  }

  function getFlyoutHandleElement(): HTMLElement {
    return document.querySelector('.sky-flyout-resize-handle') as HTMLElement;
  }

  function getFlyoutHeaderElement(): HTMLElement {
    return document.querySelector('.sky-flyout-header') as HTMLElement;
  }

  function getCloseButtonElement(): HTMLElement {
    return document.querySelector('.sky-flyout-btn-close') as HTMLElement;
  }

  function getPermalinkButtonElement(): HTMLElement {
    return document.querySelector('.sky-flyout-btn-permalink') as HTMLElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyFlyoutFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyFlyoutTestComponent);
    fixture.detectChanges();
  });

  beforeEach(inject([ApplicationRef, SkyFlyoutService],
    (
      _applicationRef: ApplicationRef,
      _flyoutService: SkyFlyoutService
    ) => {
      applicationRef = _applicationRef;
      flyoutService = _flyoutService;
      flyoutService.close();
    }
  ));

  afterEach(fakeAsync(() => {
    flyoutService.close();
    applicationRef.tick();
    tick();
    fixture.detectChanges();
    fixture.destroy();
  }));

  it('should close when the close button is clicked', fakeAsync(() => {
    const flyout = openFlyout();
    expect(flyout.isOpen).toBe(true);

    closeFlyout();
    expect(flyout.isOpen).toBe(false);

    // Closing the flyout again should have no effect:
    closeFlyout();
    expect(flyout.isOpen).toBe(false);
  }));

  it('should close when the Close message type is received', fakeAsync(() => {
    const flyout = openFlyout();
    expect(flyout.isOpen).toBe(true);

    flyout.close();
    tick();
    fixture.detectChanges();
    tick();

    expect(flyout.isOpen).toBe(false);
  }));

  it('should emit closed event of previously opened flyouts when a new one is opened',
    fakeAsync(() => {
      const flyout = openFlyout();

      let closedCalled = false;
      flyout.closed.subscribe(() => {
        closedCalled = true;
      });

      // Open a new flyout before closing the last one:
      openFlyout();

      expect(closedCalled).toEqual(true);
    })
  );

  it('should pass providers to the flyout', fakeAsync(() => {
    openFlyout({
      providers: [{
        provide: SkyFlyoutTestSampleContext,
        useValue: {
          name: 'Sally'
        }
      }]
    });

    const flyoutContentElement = getFlyoutElement()
      .querySelector('.sky-flyout-content') as HTMLElement;

    expect(flyoutContentElement).toHaveText('Sally');
  }));

  it('should accept configuration options for aria-labelledBy, aria-describedby, role, and width',
    fakeAsync(() => {
      const expectedLabel = 'customlabelledby';
      const expectedDescribed = 'customdescribedby';
      const expectedRole = 'customrole';
      const expectedDefault = 500;

      openFlyout({
        ariaLabelledBy: expectedLabel,
        ariaDescribedBy: expectedDescribed,
        ariaRole: expectedRole,
        defaultWidth: expectedDefault
      });

      const flyoutElement = getFlyoutElement();

      expect(flyoutElement.getAttribute('aria-labelledby'))
        .toBe(expectedLabel);
      expect(flyoutElement.getAttribute('aria-describedby'))
        .toBe(expectedDescribed);
      expect(flyoutElement.getAttribute('role'))
        .toBe(expectedRole);
      expect(flyoutElement.style.width)
        .toBe(expectedDefault + 'px');
    })
  );

  it('should not have the sky-flyout-help-shim class if the help widget is not present',
    fakeAsync(() => {
      openFlyout();
      const headerElement = getFlyoutHeaderElement();
      expect(headerElement.classList.contains('sky-flyout-help-shim')).toBeFalsy();
    })
  );

  it('should have the sky-flyout-help-shim class if the help widget is present',
    fakeAsync(() => {
      spyOn(window.document, 'getElementById').and.returnValue({});
      openFlyout();
      const headerElement = getFlyoutHeaderElement();
      expect(headerElement.classList.contains('sky-flyout-help-shim')).toBeTruthy();
    })
  );

  it('should resize when handle is dragged', fakeAsync(() => {
      openFlyout({});
      const flyoutElement = getFlyoutElement();
      const handleElement = getFlyoutHandleElement();

      expect(flyoutElement.style.width).toBe('500px');

      let evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('mousedown', false, false, window, 0, 0, 0, 1000,
        0, false, false, false, false, 0, undefined);

      handleElement.dispatchEvent(evt);
      makeEvent('mousemove', { clientX: 1100 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('400px');
      makeEvent('mousemove', { clientX: 1000 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('500px');
      makeEvent('mouseup', {});
    })
  );

  it('should respect minimum and maximum when resizing', fakeAsync(() => {
      openFlyout({ maxWidth: 1000, minWidth: 200});
      const flyoutElement = getFlyoutElement();
      const handleElement = getFlyoutHandleElement();

      expect(flyoutElement.style.width).toBe('500px');
      let evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('mousedown', false, false, window, 0, 0, 0, 1000,
        0, false, false, false, false, 0, undefined);
      handleElement.dispatchEvent(evt);
      makeEvent('mousemove', { clientX: 500 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('1000px');
      makeEvent('mousemove', { clientX: 200 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('1000px');
      makeEvent('mousemove', { clientX: 1300 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('200px');
      makeEvent('mousemove', { clientX: 1400 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('200px');
      makeEvent('mouseup', {});
    })
  );

  it('should not resize when handle is not clicked',
    fakeAsync(() => {

      openFlyout({});
      const flyoutElement = getFlyoutElement();

      expect(flyoutElement.style.width).toBe('500px');
      makeEvent('mousemove', { clientX: 1100 });
      fixture.detectChanges();
      expect(flyoutElement.style.width).toBe('500px');
    })
  );

  describe('permalink', () => {
    it('should not show the permalink button if no permalink config peroperties are defined',
      fakeAsync(() => {
        openFlyout();
        const permaLinkButton = getPermalinkButtonElement();
        expect(permaLinkButton).toBeFalsy();
      })
    );

    it('should use the default permalink label if none is defined',
      fakeAsync(() => {
        const expectedPermalink = 'http://bb.com';
        const expectedLabel = SkyResources.getString('flyout_permalink_button');

        openFlyout({
          permalink: {
            url: expectedPermalink
          }
        });

        const permaLinkButton = getPermalinkButtonElement();
        expect(permaLinkButton).toBeTruthy();
        expect(permaLinkButton.innerHTML.trim()).toEqual(expectedLabel);
      })
    );

    it('should use the custom defined label for permalink',
      fakeAsync(() => {
        const expectedPermalink = 'http://bb.com';
        const expectedLabel = 'Foo Bar';

        openFlyout({
          permalink: {
            label: expectedLabel,
            url: expectedPermalink
          }
        });

        const permaLinkButton = getPermalinkButtonElement();
        expect(permaLinkButton).toBeTruthy();
        expect(permaLinkButton.innerHTML.trim()).toEqual(expectedLabel);
      })
    );

    it('should open the defined permalink URL when clicking on the permalink button',
      fakeAsync(() => {
        const expectedPermalink = 'http://bb.com';
        openFlyout({
          permalink: {
            url: expectedPermalink
          }
        });
        const permaLinkButton = getPermalinkButtonElement();
        expect(permaLinkButton.getAttribute('href')).toEqual(expectedPermalink);
      })
    );

    it('should navigate to a route when clicking on the permalink button',
      fakeAsync(() => {
        openFlyout({
          permalink: {
            route: {
              commands: ['/'],
              extras: {
                fragment: 'fooFragment',
                queryParams: {
                  envid: 'fooId'
                }
              }
            }
          }
        });
        const permalinkButton = getPermalinkButtonElement();
        expect(permalinkButton.getAttribute('href')).toEqual('/?envid=fooId#fooFragment');
      })
    );

    it('should navigate to a URL when clicking on the permalink button',
      fakeAsync(() => {
        openFlyout({
          permalink: {
            url: 'http://foo.com'
          }
        });
        const permalinkButton = getPermalinkButtonElement();
        expect(permalinkButton.getAttribute('href')).toEqual('http://foo.com');
      })
    );
  });
});
