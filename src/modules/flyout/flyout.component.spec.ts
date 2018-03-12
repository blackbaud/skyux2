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
} from '../testing';

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
    let evt = new MouseEvent(eventType, evtObj);
    document.dispatchEvent(evt);
  }

  function getFlyoutElement(): HTMLElement {
   return document.querySelector('.sky-flyout') as HTMLElement;
  }

  function getFlyoutHandleElement(): HTMLElement {
    return document.querySelector('.sky-flyout-handle') as HTMLElement;
   }

  function getFlyoutHeaderElement(): HTMLElement {
    return document.querySelector('.sky-flyout-header') as HTMLElement;
  }

  function getCloseButtonElement(): HTMLElement {
    return document.querySelector('.sky-flyout-btn-close') as HTMLElement;
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
    const closeSpy = spyOn(flyoutService['host'].instance as any, 'close').and.callThrough();

    expect(flyout.isOpen).toBe(true);

    flyout.close();
    tick();
    fixture.detectChanges();
    tick();

    expect(closeSpy).toHaveBeenCalled();
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
      expect(flyoutElement.offsetWidth)
        .toBe(expectedDefault);
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

  it('should resize when handle is dragged',
    fakeAsync(() => {

      openFlyout({});
      const flyoutElement = getFlyoutElement();
      const handleElement = getFlyoutHandleElement();

      expect(flyoutElement.offsetWidth).toBe(500);
      handleElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000 }));
      makeEvent('mousemove', { clientX: 1100 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(400);
      makeEvent('mousemove', { clientX: 1000 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(500);
      makeEvent('mouseup', undefined);
    })
  );

  it('should respect minimum and maximum when resizing',
    fakeAsync(() => {

      openFlyout({ maxWidth: 1000, minWidth: 200});
      const flyoutElement = getFlyoutElement();
      const handleElement = getFlyoutHandleElement();

      expect(flyoutElement.offsetWidth).toBe(500);
      handleElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 1000 }));
      makeEvent('mousemove', { clientX: 500 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(1000);
      makeEvent('mousemove', { clientX: 200 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(1000);
      makeEvent('mousemove', { clientX: 1300 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(200);
      makeEvent('mousemove', { clientX: 1400 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(200);
      makeEvent('mouseup', undefined);
    })
  );

  it('should not resize when handle is not clicked',
    fakeAsync(() => {

      openFlyout({});
      const flyoutElement = getFlyoutElement();

      expect(flyoutElement.offsetWidth).toBe(500);
      makeEvent('mousemove', { clientX: 1100 });
      fixture.detectChanges();
      expect(flyoutElement.offsetWidth).toBe(500);
    })
  );
});
