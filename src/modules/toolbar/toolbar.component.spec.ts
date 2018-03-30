import {
  TestBed
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { ToolbarTestComponent } from './fixtures/toolbar.component.fixture';
import { ToolbarSectionedTestComponent } from './fixtures/toolbar-sectioned.component.fixture';

import { SkyToolbarModule } from '.';

describe('toolbar component', () => {
  describe('standard', () => {
     beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ToolbarTestComponent
        ],
        imports: [
          BrowserModule,
          SkyToolbarModule
        ]
      });
    });

    it('should create a toolbar with transcluded items', () => {
      let fixture = TestBed.createComponent(ToolbarTestComponent);
      let el = fixture.nativeElement as HTMLElement;

      fixture.detectChanges();

      let buttonEls = el.querySelectorAll('.sky-toolbar-container .sky-toolbar-item .sky-btn');

      expect(buttonEls.item(0)).toHaveText('Button 1');
      expect(buttonEls.item(1)).toHaveText('Button 2');

    });
  });

  describe('sectioned', () => {
     beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ToolbarSectionedTestComponent
        ],
        imports: [
          BrowserModule,
          SkyToolbarModule
        ]
      });
    });

    it('should create a toolbar with sections with transcluded items', () => {
      let fixture = TestBed.createComponent(ToolbarSectionedTestComponent);
      let el = fixture.nativeElement as HTMLElement;

      fixture.detectChanges();

      let buttonEls =
      el.querySelectorAll('.sky-toolbar-container .sky-toolbar-section .sky-toolbar-item .sky-btn');

      expect(buttonEls.item(0)).toHaveText('Button 1');
      expect(buttonEls.item(1)).toHaveText('Button 2');

      expect(el.querySelector('.sky-toolbar-container')).toHaveCssClass('sky-toolbar-sectioned');

    });
  });
});
