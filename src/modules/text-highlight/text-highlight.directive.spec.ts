import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { SkyTextHighlightTestComponent } from './fixtures/text-highlight.component.fixture';
import { SkyCheckboxModule } from '../checkbox/checkbox.module';
import { SkyTextHighlightModule } from './text-highlight.module';
import { async } from "@angular/core/testing";

function updateInputText(fixture: ComponentFixture<SkyTextHighlightTestComponent>, text: string) {
  const inputEl = fixture.nativeElement.querySelector('.sky-input-search-term') as HTMLInputElement;
  inputEl.value = text;
  inputEl.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

const additionalTextHidden = `
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

const additionalTextVisible = `
    <!--bindings={
  "ng-reflect-ng-if": "true"
}-->`;

function getHtmlOutput(text: string) {
  return `${text}${additionalTextHidden}`;
}

function getHtmlOutputAdditionalText(text: string, additionalText: string) {
  return `${text}${additionalTextVisible}<div>
        ${additionalText}
    </div>`;
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
    const expectedHtml = getHtmlOutput('Here is some test text.');

    expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight search term', () => {
    updateInputText(fixture, 'text');

    const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
    const expectedHtml =
      getHtmlOutput('Here is some test <mark class="sky-highlight-mark">text</mark>.');

    expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight case insensitive search term', () => {
    updateInputText(fixture, 'here');

    const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
    const expectedHtml =
      getHtmlOutput('<mark class="sky-highlight-mark">Here</mark> is some test text.');

    expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight search term in nested component', () => {
    component.showAdditionalContent = true;
    fixture.detectChanges();

    updateInputText(fixture, 'here');

    const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
    const text = '<mark class="sky-highlight-mark">Here</mark> is some test text.';
    // tslint:disable-next-line:max-line-length
    const additional = '<mark class="sky-highlight-mark">Here</mark> is additional text that was previously hidden.';
    const expectedHtml = getHtmlOutputAdditionalText(text, additional);

    expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('changed search term should highlight new term and old term should not highlight', () => {
    updateInputText(fixture, 'some');

    const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
    const expectedHtml =
      getHtmlOutput('Here is <mark class="sky-highlight-mark">some</mark> test text.');

    expect(containerEl.innerHTML.trim()).toBe(expectedHtml);

    updateInputText(fixture, 'Here');

    const containerElChanged =
      nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
    const expectedHtmlChanged =
      getHtmlOutput('<mark class="sky-highlight-mark">Here</mark> is some test text.');

    expect(containerElChanged.innerHTML.trim()).toBe(expectedHtmlChanged);
  });

  it('highlight search term of html that was previously hidden', async(() => {
    component.showAdditionalContent = false;
    fixture.detectChanges();

    updateInputText(fixture, 'is');

    const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
    const expectedHtml =
      getHtmlOutput('Here <mark class="sky-highlight-mark">is</mark> some test text.');

    expect(containerEl.innerHTML.trim()).toBe(expectedHtml);

    // check box to show extra content
    const checkboxEl =
      fixture.nativeElement.querySelector('.sky-test-checkbox') as HTMLInputElement;

    checkboxEl.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const containerElUpdated =
        nativeElement.querySelector('.sky-test-div-container') as HTMLElement;

      const text = 'Here <mark class="sky-highlight-mark">is</mark> some test text.';
      // tslint:disable-next-line:max-line-length
      const additional = 'Here <mark class="sky-highlight-mark">is</mark> additional text that was previously hidden.';
      const expectedHtmlChanged = getHtmlOutputAdditionalText(text, additional);

      expect(containerElUpdated.innerHTML.trim()).toBe(expectedHtmlChanged);
    });
  }));

});
