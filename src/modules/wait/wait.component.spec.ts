import {
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

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

  it('should use inputted aria-label', async() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.componentInstance.ariaLabel = 'test label';
    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isNonBlocking = false;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(document.body.querySelector('sky-wait').getAttribute('aria-label')).toBe('test label');
  });

  it('should set aria-label on document body when fullPage is true and is blocking', async() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.componentInstance.isFullPage = true;
    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isNonBlocking = false;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(document.body.querySelector('sky-wait').getAttribute('aria-label')).toBe('Page loading. Please wait.');
  });

  it('should set aria-label on document body when fullPage is true and is not blocking', async() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    fixture.componentInstance.isFullPage = true;
    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isNonBlocking = true;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(document.body.querySelector('sky-wait').getAttribute('aria-label')).toBe('Page loading.');
  });

  it('should set aria-label on containing div when fullPage is set to false and is blocking', async() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    let el = fixture.nativeElement;
    fixture.componentInstance.isFullPage = false;
    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isNonBlocking = false;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(el.querySelector('sky-wait').getAttribute('aria-label')).toBe('Loading. Please wait.');
  });

  it('should set aria-label on containing div when fullPage is set to false and is not blocking', async() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    let el = fixture.nativeElement;
    fixture.componentInstance.isFullPage = false;
    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isNonBlocking = false;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(el.querySelector('sky-wait').getAttribute('aria-label')).toBe('Loading.');
  });

  it('should not use default aria-label when one is provided', async() => {
    let fixture = TestBed.createComponent(SkyWaitTestComponent);

    let el = fixture.nativeElement;
    fixture.componentInstance.isFullPage = false;
    fixture.componentInstance.isWaiting = true;
    fixture.componentInstance.isNonBlocking = false;
    fixture.componentInstance.ariaLabel = 'Waiting on the page to load.';

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(el.querySelector('sky-wait').getAttribute('aria-label')).toBe('Waiting on the page to load.');
  });
});
