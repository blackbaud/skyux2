import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { SkyTextHighlightTestComponent } from './fixtures/text-highlight.component.fixture';
import { SkyCheckboxModule } from '../checkbox/checkbox.module';
import { SkyTextHighlightModule } from './text-highlight.module';

function updateInputText(fixture: ComponentFixture<SkyTextHighlightTestComponent>, text: string) {
  const inputEl = fixture.nativeElement.querySelector('.sky-input-search-term') as HTMLInputElement;
  inputEl.value = text;
  inputEl.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

describe('Highlight', () => {

  let fixture: ComponentFixture<SkyTextHighlightTestComponent>;
  let component: SkyTextHighlightTestComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkyTextHighlightTestComponent
      ],
      imports: [
        SkyCheckboxModule,
        SkyTextHighlightModule,
        FormsModule
      ]
    });

    fixture = TestBed.createComponent(SkyTextHighlightTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not highlight any text when search term is blank', () => {
      const containerEl = nativeElement.querySelector('.sky-test-div-container');
      const expectedHtml = `Here is some test text.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight search term', () => {
      updateInputText(fixture, 'text');

      const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtml = `Here is some test <mark>text</mark>.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight case insensitive search term', () => {
      updateInputText(fixture, 'here');

      const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtml = `<mark>Here</mark> is some test text.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight search term in nested component', () => {
      component.showAdditionalContent = true;
      fixture.detectChanges();

      updateInputText(fixture, 'here');

      const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtml = `<mark>Here</mark> is some test text.
    <!--bindings={
  "ng-reflect-ng-if": "true"
}--><div>
        <mark>Here</mark> is additional text that was previously hidden.
    </div>`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('changed search term should highlight new term and old term should not highlight', () => {
      updateInputText(fixture, 'some');

      const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtml = `Here is <mark>some</mark> test text.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);

      updateInputText(fixture, 'Here');

      const containerElChanged =
        nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtmlChanged = `<mark>Here</mark> is some test text.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerElChanged.innerHTML.trim()).toBe(expectedHtmlChanged);
  });

  it('highlight search term of html that was previously hidden', () => {
      console.warn('1');
      component.showAdditionalContent = false;
      fixture.detectChanges();
      console.warn('2');

      updateInputText(fixture, 'is');
      console.warn('3');

      const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtml = `Here <mark>is</mark> some test text.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);

      // check box to show extra content
      const checkboxEl =
        fixture.nativeElement.querySelector('.sky-test-checkbox') as HTMLInputElement;

      checkboxEl.click();

      console.warn(component.showAdditionalContent);
      console.warn('4');
      updateInputText(fixture, 'is1');

      const containerElUpdated =
        nativeElement.querySelector('.sky-test-div-container') as HTMLElement;

      const expectedHtmlUpdated = `Here <mark>is</mark> some test text.
    <!--bindings={
  "ng-reflect-ng-if": "true"
}--><div>
        Here <mark>is</mark> additional text that was previously hidden.
    </div>`;

      expect(containerElUpdated.innerHTML.trim()).toBe(expectedHtmlUpdated);
  });
});
