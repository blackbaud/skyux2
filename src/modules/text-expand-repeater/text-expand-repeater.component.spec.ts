import {
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { TextExpandRepeaterTestComponent } from './fixtures/text-expand-repeater.component.fixture';
import { SkyTextExpandRepeaterModule } from './text-expand-repeater.module';
import { SkyResources } from '../resources/resources';

describe('Text expand repeater component', () => {

  function clickTextExpandButton(buttonElem: HTMLElement, fixture: ComponentFixture<TextExpandRepeaterTestComponent>) {
    buttonElem.click();
    fixture.detectChanges();
    tick(20);
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  let fixture: ComponentFixture<TextExpandRepeaterTestComponent>;
  let cmp: TextExpandRepeaterTestComponent;
  let el: HTMLElement;

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

    fixture = TestBed.createComponent(TextExpandRepeaterTestComponent);
    cmp = fixture.componentInstance as TextExpandRepeaterTestComponent;
    el = fixture.nativeElement as HTMLElement;
  });

  describe('basic behaviors', () => {
    it('should have necessary aria properties', fakeAsync(() => {
      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      const buttonElem = <HTMLElement>el.querySelector('.sky-text-expand-repeater-see-more');

      expect(buttonElem.getAttribute('aria-expanded')).toBe('false');
      expect(buttonElem.getAttribute('aria-controls')).toBe(cmp.textExpand.contentSectionId);

      clickTextExpandButton(buttonElem, fixture);

      expect(buttonElem.getAttribute('aria-expanded')).toBe('true');
      expect(buttonElem.getAttribute('aria-controls')).toBe(cmp.textExpand.contentSectionId);
    }));

    it('should not have see more button if data is less than or equal to max items', () => {
      cmp.data = ['john', 'bob'];
      cmp.numItems = 2;

      fixture.detectChanges();

      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(seeMoreButton).toBeNull();
    });

    it('should have see more button if data is more than max items', () => {
      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
    });

    it('should not have see more button or data if long data is changed to undefined', () => {
      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      let displayedItems: NodeListOf<Element>
        = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(3);
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));

      cmp.data = undefined;

      fixture.detectChanges();
      displayedItems = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(0);
      seeMoreButton = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(seeMoreButton).toBeNull();
    });

    it('should have see more button or data if long data is changed to undefined and back', () => {
      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      let displayedItems: NodeListOf<Element>
        = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(3);
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));

      cmp.data = undefined;

      fixture.detectChanges();
      displayedItems = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(0);
      seeMoreButton = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(seeMoreButton).toBeNull();

      cmp.data = ['john', 'bob', 'hank'];

      fixture.detectChanges();
      seeMoreButton = el.querySelector('.sky-text-expand-repeater-see-more');
      displayedItems = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(3);
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
    });

    it('should not have see more button or data if long data is changed to shorter data', () => {
      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      let displayedItems: NodeListOf<Element>
        = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(3);
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));

      cmp.data = ['john', 'bob'];

      fixture.detectChanges();
      displayedItems = el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(displayedItems.length).toBe(2);
      seeMoreButton = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(seeMoreButton).toBeNull();
    });

    it('should expand and collapse correctly', fakeAsync(() => {
      let container: HTMLElement
        = <HTMLElement>document.querySelector('.sky-text-expand-repeater-container');

      cmp.data = ['john', 'bob', 'hank'];
      cmp.numItems = 2;

      let shownItemsSelector = '.sky-text-expand-repeater-item:not([style*="display: none"])';
      let hiddenItemsSelector = '.sky-text-expand-repeater-item[style*="display: none"]';

      fixture.detectChanges();
      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      let shownItems: any =
        el.querySelectorAll(shownItemsSelector);
      let hiddenItems: any =
        el.querySelectorAll(hiddenItemsSelector);
      expect(seeMoreButton).not.toBeNull();
      expect(seeMoreButton.innerText.trim()).toBe(SkyResources.getString('text_expand_see_more'));
      expect(shownItems.length).toBe(2);
      expect(hiddenItems.length).toBe(1);

      clickTextExpandButton(seeMoreButton, fixture);

      shownItems =
        el.querySelectorAll(shownItemsSelector);
      hiddenItems =
        el.querySelectorAll(hiddenItemsSelector);
      seeMoreButton = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(container.style.maxHeight).toBe('');
      expect(seeMoreButton.innerText.trim())
        .toBe(SkyResources.getString('text_expand_see_less'));
      expect(shownItems.length).toBe(3);
      expect(hiddenItems.length).toBe(0);

      clickTextExpandButton(seeMoreButton, fixture);

      shownItems =
        el.querySelectorAll(shownItemsSelector);
      hiddenItems = el.querySelectorAll(hiddenItemsSelector);
      seeMoreButton = el.querySelector('.sky-text-expand-repeater-see-more');
      expect(container.style.minHeight).toBe('');
      expect(seeMoreButton.innerText.trim())
        .toBe(SkyResources.getString('text_expand_see_more'));
      expect(shownItems.length).toBe(2);
      expect(hiddenItems.length).toBe(1);
    }));

    it('should not display anything if no value is given for the text', () => {
      cmp.data = undefined;
      cmp.numItems = 2;

      fixture.detectChanges();

      let seeMoreButton: any = el.querySelector('.sky-text-expand-repeater-see-more');
      let items: any =
        el.querySelectorAll('.sky-text-expand-repeater-item');
      expect(seeMoreButton).toBeNull();
      expect(items.length).toBe(0);
    });
  });
});
