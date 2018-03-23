import {
  TestBed, ComponentFixture
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestModule
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { SkyInfiniteScrollComponent } from './infinite-scroll.component';
import { InfiniteScrollTestComponent } from './fixtures/infinite-scroll.component.fixture';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkyInfiniteScrollModule } from './infinite-scroll.module';

fdescribe('Infinite scroll component', () => {
    let fixture: ComponentFixture<InfiniteScrollTestComponent>;
    let cmp: InfiniteScrollTestComponent;
    let el: HTMLElement;
    let debugElement: DebugElement;

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
      el = fixture.nativeElement as HTMLElement;
      debugElement = fixture.debugElement;
    });

    it('should emit an onLoad event on button click', () => {
        debugElement.query(By.css('.sky-infinite-scroll .sky-btn')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(cmp.items.length).toBe(10);
    });

    it('should emit an onLoad event on scroll', () => {
        debugElement.triggerEventHandler('scroll', undefined);
        fixture.detectChanges();
        expect(cmp.items.length).toBe(10);
    });

    it('should not emit an onLoad event on scroll when hasMore is false', () => {
      debugElement.triggerEventHandler('scroll', undefined);
      fixture.detectChanges();
      expect(cmp.items.length).toBe(5);
    });
    
    it('should not emit an onLoad event on scroll when isLoading is true', () => {
      debugElement.query(By.css('.sky-infinite-scroll')).componentInstance.isLoading.next(true);
      debugElement.triggerEventHandler('scroll', undefined);
      fixture.detectChanges();
      expect(cmp.items.length).toBe(5);
    });
  });

  it('should not show wait component or load button when hasMore is false.', () => {
    let html = `
      <ul id='test-list'>
          <li *ngRepeat='let item of items'>{{item.name}}</li>
      </ul>
      <sky-infinite-scroll (onLoad)="loadMore()" [hasMore]="false">
      </sky-infinite-scroll>
    `;

    let fixture = TestBed
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
});
