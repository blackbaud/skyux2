import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { SkyTextHighlightTestComponent } from './fixtures/text-highlight.component.fixture';
import { SkyCheckboxModule } from '../checkbox/checkbox.module';
import { SkyTextHighlightModule } from './text-highlight.module';

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
      const expectedHtml =
`Here is some test text.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

  it('should highlight search term', () => {
      component.searchTerm = 'text';
      fixture.detectChanges();

      const containerEl = nativeElement.querySelector('.sky-test-div-container') as HTMLElement;
      const expectedHtml =
`Here is some test <mark>text</mark>.
    <!--bindings={
  "ng-reflect-ng-if": "false"
}-->`;

      expect(containerEl.innerHTML.trim()).toBe(expectedHtml);
  });

//   it('should highlight case insensitive search term', () => {
//   });

//   it('should highlight search term in nested component', () => {
//   });

//   it('changed search term should highlight new term and old term should not highlight', () => {
//   });

//   it('highlight search term of html that was previously hidden', () => {
//   });
});
