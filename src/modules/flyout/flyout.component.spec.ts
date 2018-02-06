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

  function getFlyoutElement(): HTMLElement {
    return document.querySelector('.sky-flyout') as HTMLElement;
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
      flyoutService.dispose();
    }
  ));

  afterEach(fakeAsync(() => {
    flyoutService.dispose();
    applicationRef.tick();
    tick();
    fixture.detectChanges();
  }));

  fit('should close when the close button is clicked', fakeAsync(() => {
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

    expect(flyout.isOpen).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
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

  it('should accept configuration options for aria-labelledBy, aria-describedby and role',
    fakeAsync(() => {
      const expectedLabel = 'customlabelledby';
      const expectedDescribed = 'customdescribedby';
      const expectedRole = 'customrole';

      openFlyout({
        ariaLabelledBy: expectedLabel,
        ariaDescribedBy: expectedDescribed,
        ariaRole: expectedRole
      });

      const flyoutElement = getFlyoutElement();

      expect(flyoutElement.getAttribute('aria-labelledby'))
        .toBe(expectedLabel);
      expect(flyoutElement.getAttribute('aria-describedby'))
        .toBe(expectedDescribed);
      expect(flyoutElement.getAttribute('role'))
        .toBe(expectedRole);
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
});
