import {
  TestBed
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { ToolbarTestComponent } from './fixtures/toolbar.component.fixture';

import { SkyToolbarModule } from '.';

import { expect } from '../testing';

describe('toolbar component', () => {
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
    let cmp = fixture.componentInstance as ToolbarTestComponent;
    let el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();

    let buttonEls = el.querySelectorAll('.sky-toolbar-container .sky-toolbar-item .sky-btn');

    expect(buttonEls.item(0)).toHaveText('Button 1');
    expect(buttonEls.item(1)).toHaveText('Button 2');

  });
});
