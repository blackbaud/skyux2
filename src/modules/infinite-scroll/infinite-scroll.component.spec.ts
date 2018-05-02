import {
  TestBed, ComponentFixture
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { InfiniteScrollTestComponent } from './fixtures/infinite-scroll.component.fixture';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkyInfiniteScrollModule } from './infinite-scroll.module';

describe('Infinite scroll component', () => {
  let fixture: ComponentFixture<InfiniteScrollTestComponent>;
  let cmp: InfiniteScrollTestComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollTestComponent],
      imports: [SkyInfiniteScrollModule]
    });
  });
  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  describe('Infinite scroll component (BeforeEachGroup)', () => {
    /**
     * This configureTestingModule function imports SkyAppTestModule, which brings in all of
     * the SKY UX modules and components in your application for testing convenience. If this has
     * an adverse effect on your test performance, you can individually bring in each of your app
     * components and the SKY UX modules that those components rely upon.
     */
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [InfiniteScrollTestComponent],
        imports: [SkyInfiniteScrollModule]
      });

      fixture = TestBed.createComponent(InfiniteScrollTestComponent);
      cmp = fixture.componentInstance as InfiniteScrollTestComponent;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should emit an onLoad event on button click', () => {
      debugElement.query(By.css('.sky-infinite-scroll .sky-btn')).triggerEventHandler('click', undefined);
      fixture.detectChanges();
      expect(cmp.items.length).toBe(40);
    });

    it('should emit an onLoad event on scroll when window is the scrollable parent', (done: Function) => {
      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
        expect(cmp.items.length).toBe(40);
        done();
      }, 100);
    });

    it('should not emit an onLoad event on scroll when hasMore is false', (done: Function) => {
      debugElement.componentInstance._hasMore.next(false);
      fixture.detectChanges();
      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
        expect(cmp.items.length).toBe(20);
        done();
      }, 100);
    });

    it('should not emit an onLoad event on scroll when isLoading is true', (done: Function) => {
      debugElement.query(By.css('.sky-infinite-scroll')).componentInstance._isLoading.next(true);
      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
        expect(cmp.items.length).toBe(20);
        done();
      }, 100);
    });
  });

  it('should emit an onLoad event on scroll when an element is the scrollable parent', (done: Function) => {
    let html = `
    <div style='overflow-y: scroll; max-height: 200px; position: relative;'>
    <ul id='test-list' style='overflow-y: none;'>
        <li *ngFor='let item of items'>{{item.name}}</li>
    </ul>
    <sky-infinite-scroll class='sky-infinite-scroll'
        [hasMore]='hasMore | async'
        (onLoad)='loadMore()'>
    </sky-infinite-scroll>
    </div>
    `;

    fixture = TestBed
      .overrideComponent(
        InfiniteScrollTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(InfiniteScrollTestComponent);

    debugElement = fixture.debugElement;
    cmp = fixture.componentInstance as InfiniteScrollTestComponent;
    fixture.detectChanges();

    debugElement.query(By.css('div')).nativeElement.scrollTop = 2000;
    SkyAppTestUtility.fireDomEvent(debugElement.query(By.css('div')).nativeElement, 'scroll');
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      expect(cmp.items.length).toBe(40);
      done();
    }, 100);
  });

  it('should not show wait component or load button when hasMore is false.', () => {
    let html = `
<div style='overflow-y: none;'>
    <ul id='test-list' style='overflow-y: none;'>
        <li *ngFor='let item of items'>{{item.name}}</li>
    </ul>
    <sky-infinite-scroll class='sky-infinite-scroll'
        [hasMore]='false'
        (onLoad)='loadMore()'>
    </sky-infinite-scroll>
</div>
    `;

    fixture = TestBed
      .overrideComponent(
        InfiniteScrollTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(InfiniteScrollTestComponent);

    let el = fixture.nativeElement;
    fixture.detectChanges();
    expect(el.querySelector('.sky-btn')).toBeNull();
    expect(el.querySelector('.sky-wait')).toBeNull();
  });

  it('should not emit an onLoad event on scroll when hasMore is false and an element is the scrollable parent', (done: Function) => {
    let html = `
    <div style='overflow-y: scroll; max-height: 200px; position: relative;'>
    <ul id='test-list' style='overflow-y: none;'>
        <li *ngFor='let item of items'>{{item.name}}</li>
    </ul>
    <sky-infinite-scroll class='sky-infinite-scroll'
        [hasMore]='false'
        (onLoad)='loadMore()'>
    </sky-infinite-scroll>
    </div>
    `;

    fixture = TestBed
      .overrideComponent(
        InfiniteScrollTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(InfiniteScrollTestComponent);

    debugElement = fixture.debugElement;
    cmp = fixture.componentInstance as InfiniteScrollTestComponent;
    fixture.detectChanges();

    debugElement.query(By.css('div')).nativeElement.scrollTop = 2000;
    SkyAppTestUtility.fireDomEvent(debugElement.query(By.css('div')).nativeElement, 'scroll');
    fixture.detectChanges();

    setTimeout(() => {
      expect(cmp.items.length).toBe(20);
      done();
    }, 100);
  });

  it('should not emit an onLoad event on scroll when hasMore is false and the window is the scrollable parent', (done: Function) => {
    let html = `
    <div>
    <ul id='test-list' style='overflow-y: none;'>
        <li *ngFor='let item of items'>{{item.name}}</li>
    </ul>
    <sky-infinite-scroll class='sky-infinite-scroll'
        [hasMore]='false'
        (onLoad)='loadMore()'>
    </sky-infinite-scroll>
    </div>
    `;

    fixture = TestBed
      .overrideComponent(
        InfiniteScrollTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(InfiniteScrollTestComponent);

    debugElement = fixture.debugElement;
    cmp = fixture.componentInstance as InfiniteScrollTestComponent;
    fixture.detectChanges();

    SkyAppTestUtility.fireDomEvent(window, 'scroll');
    fixture.detectChanges();

    setTimeout(() => {
      expect(cmp.items.length).toBe(20);
      done();
    }, 100);
  });
});
