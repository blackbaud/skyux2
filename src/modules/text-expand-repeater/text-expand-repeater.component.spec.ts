import {
  TestBed
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { TextExpandRepeaterTestComponent } from './fixtures/text-expand-repeater.component.fixture';
import { SkyTextExpandRepeaterModule } from './text-expand-repeater.module';
import { SkyResources } from '../resources/resources';

describe('Text expand repeater component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextExpandRepeaterTestComponent
      ],
      imports: [
        BrowserModule,
        SkyTextExpandRepeaterModule
      ]
    });
  });

  describe('basic behaviors', () => {
    it('should not have see more button if data is less than or equal to max items', () => {
      let fixture = TestBed.createComponent(TextExpandRepeaterTestComponent);
      let cmp = fixture.componentInstance as TextExpandRepeaterTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      cmp.data = ['john', 'bob'];
      cmp.numItems = 2;

      fixture.detectChanges();

      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      expect(seeMoreButton).toBeNull();
    });

    it('should not have see more button if data is less than or equal to max items', () => {
      let fixture = TestBed.createComponent(TextExpandRepeaterTestComponent);
      let cmp = fixture.componentInstance as TextExpandRepeaterTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
    });

    it('should expand and collapse correctly', () => {
      let fixture = TestBed.createComponent(TextExpandRepeaterTestComponent);
      let cmp = fixture.componentInstance as TextExpandRepeaterTestComponent;
      let el = fixture.nativeElement as HTMLElement;
      let container: HTMLElement
        = <HTMLElement> document.querySelector('.sky-text-expand-repeater-container');

      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      let shownItems: any =
        el.querySelectorAll('.sky-text-expand-repeater-item:not([style*="display: none"])');
      let hiddenItems: any =
        el.querySelectorAll('.sky-text-expand-repeater-item[style*="display: none"]');
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
      expect(shownItems.length).toBe(2);
      expect(hiddenItems.length).toBe(1);

      seeMoreButton.click();
      container.dispatchEvent(new Event('transitionend'));
      fixture.detectChanges();

      shownItems =
        el.querySelectorAll('.sky-text-expand-repeater-item:not([style*="display: none"])');
      hiddenItems = el.querySelectorAll('.sky-text-expand-repeater-item[style*="display: none"]');
      seeMoreButton = el.querySelector('.sky-text-expand-see-more');
      expect(container.style.height).toBe('auto');
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_less'));
      expect(shownItems.length).toBe(3);
      expect(hiddenItems.length).toBe(0);

      seeMoreButton.click();
      container.dispatchEvent(new Event('transitionend'));
      fixture.detectChanges();

      shownItems =
        el.querySelectorAll('.sky-text-expand-repeater-item:not([style*="display: none"])');
      hiddenItems = el.querySelectorAll('.sky-text-expand-repeater-item[style*="display: none"]');
      seeMoreButton = el.querySelector('.sky-text-expand-see-more');
      expect(container.style.height).toBe('auto');
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
      expect(shownItems.length).toBe(2);
      expect(hiddenItems.length).toBe(1);
    });
    it('should not display anything if no value is given for the text', () => {
      let fixture = TestBed.createComponent(TextExpandRepeaterTestComponent);
      let cmp = fixture.componentInstance as TextExpandRepeaterTestComponent;
      let el = fixture.nativeElement as HTMLElement;

      cmp.data = undefined;
      cmp.numItems = 2;

      fixture.detectChanges();

      let seeMoreButton: any = el.querySelector('.sky-text-expand-see-more');
      let items: any =
        el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(seeMoreButton).toBeNull();
      expect(items.length).toBe(0);
    });
  });
});
