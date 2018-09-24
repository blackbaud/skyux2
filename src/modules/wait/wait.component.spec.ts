import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync
} from '@angular/core/testing';

import {
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyWaitTestComponent
} from './fixtures/wait.component.fixture';
import {
  SkyWaitFixturesModule
} from './fixtures/wait-fixtures.module';
import {
  SkyWaitComponent
} from './wait.component';

describe('Wait component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyWaitFixturesModule
      ]
    });
  });

  it('should show the wait element when isWaiting is set to true', () => {
    let fixture = TestBed.createComponent(SkyWaitComponent);

    fixture.detectChanges();

    let el = fixture.nativeElement;
    expect(el.querySelector('.sky-wait')).toBeNull();

    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();

    expect(el.querySelector('.sky-wait')).not.toBeNull();

  });

  it('should set relative position on the wait component parent element', () => {
     let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.detectChanges();

    let el = fixture.nativeElement;

    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-test-component').style.position).toBe('relative');
    expect(el.querySelector('.sky-wait-mask-loading-blocking')).not.toBeNull();

    fixture.componentInstance.isWaiting = false;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-test-component').style.position).toBe('');

  });

  it('should set the appropriate class when wait component fullPage is set to true', () => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.detectChanges();

    let el = fixture.nativeElement;

    fixture.componentInstance.isFullPage = true;
    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-mask-loading-fixed')).not.toBeNull();
    expect(el.querySelector('.sky-wait-test-component').style.position).toBe('');

    fixture.componentInstance.isWaiting = false;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-test-component').style.position).toBe('');
    expect(el.querySelector('.sky-wait')).toBeNull();

    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isFullPage = false;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-mask-loading-fixed')).toBeNull();
    expect(el.querySelector('.sky-wait-test-component').style.position).toBe('relative');
  });

  it('should set the appropriate class when nonBlocking is set to true', () => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.detectChanges();

    let el = fixture.nativeElement;

    fixture.componentInstance.isNonBlocking = true;
    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-mask-loading-non-blocking')).not.toBeNull();

    fixture.componentInstance.isNonBlocking = true;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-mask-loading-blocking')).toBeNull();
  });

  it('should propagate tab navigation forward and backward avoiding waited element', fakeAsync(() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);
    fixture.detectChanges();

    fixture.componentInstance.isFullPage = false;
    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();

    let anchor1: any = document.body.querySelector('#anchor-1');
    let anchor2: any = document.body.querySelector('#anchor-2');
    let button: any = document.querySelector('.sky-btn');
    button.focus();
    expect(document.activeElement).toBe(button);

    SkyAppTestUtility.fireDomEvent(window, 'keyup', {
      keyboardEventInit: { key: 'Tab' }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(document.activeElement).toBe(anchor2);

    button.focus();
    SkyAppTestUtility.fireDomEvent(window, 'keyup', {
      keyboardEventInit: { key: 'Tab', shiftKey: true }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(document.activeElement).toBe(anchor1);

    fixture.componentInstance.isWaiting = false;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    button.focus();
    SkyAppTestUtility.fireDomEvent(window, 'keyup', {
      keyboardEventInit: { key: 'Tab' }
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(document.activeElement).toBe(button);
  }));

  it('should set aria-busy on document body when fullPage is true', () => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.detectChanges();

    fixture.componentInstance.isFullPage = true;
    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();
    expect(document.body.getAttribute('aria-busy')).toBe('true');

    fixture.componentInstance.isWaiting = false;
    fixture.detectChanges();
    expect(document.body.getAttribute('aria-busy')).toBeNull();
  });

  it('should set aria-busy on containing div when fullPage is set to false', () => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.detectChanges();

    let el = fixture.nativeElement;
    fixture.componentInstance.isWaiting = true;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-test-component').getAttribute('aria-busy')).toBe('true');

    fixture.componentInstance.isWaiting = false;
    fixture.detectChanges();
    expect(el.querySelector('.sky-wait-test-component').getAttribute('aria-busy')).toBeNull();
  });

  let testlistenerCreated = (fixture: ComponentFixture<SkyWaitTestComponent>) => {
    fixture.detectChanges();

    let waitComponent: any = fixture.componentInstance.waitComponent;
    let adapter: any = waitComponent.adapterService;
    expect(waitComponent.id in adapter.parentListeners).toBeTruthy();
    expect(Object.keys(adapter.parentListeners).length).toBe(1);

    fixture.componentInstance.isWaiting = false;
    fixture.detectChanges();
    expect(waitComponent.id in adapter.parentListeners).toBeFalsy();
    expect(Object.keys(adapter.parentListeners).length).toBe(0);
  };

  it('should create listener on document body when fullPage is true', () => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);
    fixture.detectChanges();

    fixture.componentInstance.isFullPage = true;
    fixture.componentInstance.isWaiting = true;
    testlistenerCreated(fixture);
  });

  it('should create listener on containing div when fullPage is set to false', () => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);
    fixture.detectChanges();

    fixture.componentInstance.isWaiting = true;
    testlistenerCreated(fixture);
  });

});
