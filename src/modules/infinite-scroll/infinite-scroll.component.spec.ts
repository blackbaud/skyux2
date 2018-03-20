import {
  TestBed
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestModule
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  InfiniteScrollComponent
} from './infinite-scroll.component';

describe('Infinite scroll component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
  });

  it('should do something', () => {
    const fixture = TestBed.createComponent(InfiniteScrollComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
