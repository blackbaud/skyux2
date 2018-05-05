import {
  TestBed
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { AlertTestComponent } from './fixtures/alert.component.fixture';
import { SkyAlertModule } from '../alert/alert.module';
import { SkyResources } from '../resources/resources';

describe('Alert component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertTestComponent
      ],
      imports: [
        BrowserModule,
        SkyAlertModule
      ]
    });
  });

  it('should hide the close button if it is not cloesable', () => {
    const fixture = TestBed.createComponent(AlertTestComponent);
    const cmp = fixture.componentInstance as AlertTestComponent;
    const el = fixture.nativeElement as HTMLElement;

    cmp.closeable = true;

    fixture.detectChanges();

    const closeAttrs: any = el.querySelector('.sky-alert-close').attributes;

    expect(closeAttrs['hidden']).toBe(undefined);

    cmp.closeable = false;
    fixture.detectChanges();

    expect(closeAttrs['hidden']).not.toBeNull();
  });

  it('should be hidden when the close button is clicked', () => {
    const fixture = TestBed.createComponent(AlertTestComponent);
    const cmp = fixture.componentInstance as AlertTestComponent;
    const el = fixture.nativeElement;

    cmp.closeable = true;

    fixture.detectChanges();

    el.querySelector('.sky-alert-close').click();

    expect(el.querySelector('.sky-alert').attributes.hidden).not.toBeNull();
    expect(cmp.closed).toBe(true);
  });

  it('should allow the screen reader text for the close button to be localizable', () => {
    const fixture = TestBed.createComponent(AlertTestComponent);
    const cmp = fixture.componentInstance as AlertTestComponent;
    const el = fixture.nativeElement as HTMLElement;
    let closeEl: any;

    cmp.closeable = true;

    fixture.detectChanges();

    closeEl = el.querySelector('.sky-alert-close');

    expect(closeEl.getAttribute('aria-label')).toBe(SkyResources.getString('alert_close'));
  });

  it('should add the appropriate styling when an alert type is specified', () => {
    const fixture = TestBed.createComponent(AlertTestComponent);
    const cmp = fixture.componentInstance as AlertTestComponent;
    const el = fixture.nativeElement as HTMLElement;

    cmp.alertType = 'success';

    fixture.detectChanges();

    const alertEl = el.querySelector('.sky-alert');

    expect(alertEl.classList.contains('sky-alert-success')).toBe(true);
  });

  it('should default to "warning" when no alert type is specified', () => {
    const fixture = TestBed.createComponent(AlertTestComponent);
    const cmp = fixture.componentInstance as AlertTestComponent;
    const el = fixture.nativeElement as HTMLElement;

    cmp.alertType = undefined;

    fixture.detectChanges();

    const alertEl = el.querySelector('.sky-alert');

    expect(alertEl.classList.contains('sky-alert-warning')).toBe(true);
  });

  it('should have a role of "alert"', () => {
    const fixture = TestBed.createComponent(AlertTestComponent);
    const cmp = fixture.componentInstance as AlertTestComponent;
    const el = fixture.nativeElement as HTMLElement;

    cmp.alertType = undefined;

    fixture.detectChanges();

    const alertEl = el.querySelector('.sky-alert');

    expect(alertEl.getAttribute('role')).toBe('alert');
  });
});
